"""Create, seed, and validate the project's SQLite database."""

from __future__ import annotations

import json
import sqlite3
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
MOCK_PATH = ROOT / "data" / "synthetic" / "mock_data.json"
SEED_PATH = ROOT / "database" / "seed" / "seed.json"
DATABASE_PATH = ROOT / "database" / "mapa_quilombola.db"
VALID_PHASES = {"rtid_publicado", "decretada", "titulada"}
VALID_FORMATS = {"pdf", "pkt", "md", "outros"}
TABLES = ("municipios", "comunidades", "territorios", "atividades", "documentos")


def load_json(path: Path) -> dict:
    with path.open(encoding="utf-8") as file:
        return json.load(file)


def validate_dataset(dataset: dict, label: str) -> list[str]:
    errors: list[str] = []
    municipalities = dataset.get("municipios", [])
    communities = dataset.get("comunidades", [])
    territories = dataset.get("territorios", [])
    activities = dataset.get("atividades", [])
    documents = dataset.get("documentos", [])

    municipality_ids = {item["id"] for item in municipalities}
    community_ids = {item["id"] for item in communities}
    activity_ids = {item["id"] for item in activities}

    for community in communities:
        if community["municipio_id"] not in municipality_ids:
            errors.append(f"{label}: comunidade {community['id']} referencia municipio inexistente")
        if not -90 <= community["latitude"] <= 90:
            errors.append(f"{label}: latitude invalida na comunidade {community['id']}")
        if not -180 <= community["longitude"] <= 180:
            errors.append(f"{label}: longitude invalida na comunidade {community['id']}")
        if community["certificado_fcp"] and not community.get("data_certificacao"):
            errors.append(f"{label}: certificacao sem data na comunidade {community['id']}")
        if not community["certificado_fcp"] and community.get("data_certificacao"):
            errors.append(f"{label}: data de certificacao em comunidade nao certificada {community['id']}")

    keys = [(item["nome"].casefold(), item["municipio_id"]) for item in communities]
    if len(keys) != len(set(keys)):
        errors.append(f"{label}: comunidades duplicadas por nome e municipio")

    for territory in territories:
        if territory["comunidade_id"] not in community_ids:
            errors.append(f"{label}: territorio {territory['id']} referencia comunidade inexistente")
        if territory.get("fase_titulacao") not in VALID_PHASES | {None}:
            errors.append(f"{label}: fase de titulacao invalida no territorio {territory['id']}")

    for document in documents:
        if document.get("atividade_id") not in activity_ids:
            errors.append(f"{label}: documento {document['id']} referencia atividade inexistente")
        if document.get("comunidade_id") is not None and document["comunidade_id"] not in community_ids:
            errors.append(f"{label}: documento {document['id']} referencia comunidade inexistente")
        if document["formato"] not in VALID_FORMATS:
            errors.append(f"{label}: formato invalido no documento {document['id']}")

    return errors


def create_schema(connection: sqlite3.Connection) -> None:
    connection.executescript(
        """
        PRAGMA foreign_keys = ON;

        DROP TABLE IF EXISTS documentos;
        DROP TABLE IF EXISTS territorios;
        DROP TABLE IF EXISTS comunidades;
        DROP TABLE IF EXISTS atividades;
        DROP TABLE IF EXISTS municipios;

        CREATE TABLE municipios (
            id INTEGER PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            uf CHAR(2) NOT NULL,
            codigo_ibge INTEGER UNIQUE
        );

        CREATE TABLE comunidades (
            id INTEGER PRIMARY KEY,
            nome VARCHAR(150) NOT NULL,
            municipio_id INTEGER NOT NULL,
            populacao_estimada INTEGER,
            qtd_familias INTEGER,
            certificado_fcp INTEGER NOT NULL DEFAULT 0 CHECK (certificado_fcp IN (0, 1)),
            data_certificacao DATE,
            latitude DECIMAL(10, 8) NOT NULL CHECK (latitude BETWEEN -90 AND 90),
            longitude DECIMAL(11, 8) NOT NULL CHECK (longitude BETWEEN -180 AND 180),
            criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE (nome, municipio_id),
            CHECK (
                (certificado_fcp = 1 AND data_certificacao IS NOT NULL)
                OR (certificado_fcp = 0 AND data_certificacao IS NULL)
            ),
            FOREIGN KEY (municipio_id) REFERENCES municipios (id)
        );

        CREATE TABLE territorios (
            id INTEGER PRIMARY KEY,
            comunidade_id INTEGER NOT NULL,
            area_hectares DECIMAL(12, 2),
            fase_titulacao VARCHAR(30) CHECK (
                fase_titulacao IN ('rtid_publicado', 'decretada', 'titulada')
                OR fase_titulacao IS NULL
            ),
            orgao_responsavel VARCHAR(100) DEFAULT 'INCRA',
            FOREIGN KEY (comunidade_id) REFERENCES comunidades (id)
        );

        CREATE TABLE atividades (
            id INTEGER PRIMARY KEY,
            codigo_atividade VARCHAR(20) NOT NULL,
            titulo VARCHAR(150) NOT NULL,
            descricao TEXT,
            status VARCHAR(30) DEFAULT 'Em Andamento',
            data_entrega DATE
        );

        CREATE TABLE documentos (
            id INTEGER PRIMARY KEY,
            atividade_id INTEGER,
            comunidade_id INTEGER,
            nome_arquivo VARCHAR(255) NOT NULL,
            formato VARCHAR(10) NOT NULL CHECK (formato IN ('pdf', 'pkt', 'md', 'outros')),
            caminho_storage TEXT NOT NULL,
            criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (atividade_id) REFERENCES atividades (id),
            FOREIGN KEY (comunidade_id) REFERENCES comunidades (id)
        );
        """
    )


def seed_database(connection: sqlite3.Connection, dataset: dict) -> None:
    connection.executemany(
        "INSERT INTO municipios (id, nome, uf, codigo_ibge) VALUES (?, ?, ?, ?)",
        [
            (item["id"], item["nome"], item["uf"], item.get("codigo_ibge"))
            for item in dataset["municipios"]
        ],
    )
    connection.executemany(
        """INSERT INTO comunidades (
            id, nome, municipio_id, populacao_estimada, qtd_familias,
            certificado_fcp, data_certificacao, latitude, longitude, criado_em
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
        [
            (
                item["id"], item["nome"], item["municipio_id"],
                item.get("populacao_estimada"), item.get("qtd_familias"),
                int(item["certificado_fcp"]), item.get("data_certificacao"),
                item["latitude"], item["longitude"], item.get("criado_em"),
            )
            for item in dataset["comunidades"]
        ],
    )
    connection.executemany(
        """INSERT INTO territorios (
            id, comunidade_id, area_hectares, fase_titulacao, orgao_responsavel
        ) VALUES (?, ?, ?, ?, ?)""",
        [
            (
                item["id"], item["comunidade_id"], item.get("area_hectares"),
                item.get("fase_titulacao"), item.get("orgao_responsavel"),
            )
            for item in dataset["territorios"]
        ],
    )
    connection.executemany(
        """INSERT INTO atividades (
            id, codigo_atividade, titulo, descricao, status, data_entrega
        ) VALUES (?, ?, ?, ?, ?, ?)""",
        [
            (
                item["id"], item["codigo_atividade"], item["titulo"],
                item.get("descricao"), item.get("status"), item.get("data_entrega"),
            )
            for item in dataset["atividades"]
        ],
    )
    connection.executemany(
        """INSERT INTO documentos (
            id, atividade_id, comunidade_id, nome_arquivo, formato,
            caminho_storage, criado_em
        ) VALUES (?, ?, ?, ?, ?, ?, ?)""",
        [
            (
                item["id"], item.get("atividade_id"), item.get("comunidade_id"),
                item["nome_arquivo"], item["formato"], item["caminho_storage"],
                item.get("criado_em"),
            )
            for item in dataset["documentos"]
        ],
    )


def validate_database(connection: sqlite3.Connection, dataset: dict) -> list[str]:
    errors: list[str] = []
    foreign_keys = connection.execute("PRAGMA foreign_key_check").fetchall()
    if foreign_keys:
        errors.append(f"SQLite encontrou {len(foreign_keys)} violacao(oes) de chave estrangeira")

    for table in TABLES:
        expected = len(dataset[table])
        actual = connection.execute(f"SELECT COUNT(*) FROM {table}").fetchone()[0]
        if actual != expected:
            errors.append(f"{table}: esperado {expected}, encontrado {actual}")
    return errors


def main() -> int:
    errors: list[str] = []
    mock_data = load_json(MOCK_PATH)
    seed_data = load_json(SEED_PATH)
    errors.extend(validate_dataset(mock_data, "mock_data.json"))
    errors.extend(validate_dataset(seed_data, "seed.json"))

    if errors:
        print("VALIDACAO FALHOU")
        for error in errors:
            print(f"- {error}")
        return 1

    with sqlite3.connect(DATABASE_PATH) as connection:
        connection.execute("PRAGMA foreign_keys = ON")
        try:
            with connection:
                create_schema(connection)
                seed_database(connection, seed_data)
        except sqlite3.Error as error:
            print(f"CARGA FALHOU: {error}")
            return 1

        database_errors = validate_database(connection, seed_data)
        if database_errors:
            print("VALIDACAO DO BANCO FALHOU")
            for error in database_errors:
                print(f"- {error}")
            return 1

        print("BANCO SQLITE CRIADO E SEED EXECUTADO")
        print(f"- arquivo: {DATABASE_PATH.relative_to(ROOT)}")
        for table in TABLES:
            count = connection.execute(f"SELECT COUNT(*) FROM {table}").fetchone()[0]
            print(f"- {table}: {count} registro(s)")
        print("VALIDACAO COMPLETA OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
