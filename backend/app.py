from __future__ import annotations

import sqlite3
from pathlib import Path

from flask import Flask, jsonify, request, send_from_directory


ROOT = Path(__file__).resolve().parents[1]
DATABASE_PATH = ROOT / "database" / "mapa_quilombola.db"


def create_app(database_path: Path = DATABASE_PATH) -> Flask:
    app = Flask(
        __name__,
        static_folder=str(ROOT / "frontend"),
        static_url_path="/assets",
    )
    app.config["DATABASE_PATH"] = database_path

    @app.get("/")
    def index():
        return send_from_directory(ROOT / "frontend", "index.html")

    def query_database(query: str, parameters: tuple = ()) -> list[dict]:
        with sqlite3.connect(app.config["DATABASE_PATH"]) as connection:
            connection.row_factory = sqlite3.Row
            rows = connection.execute(query, parameters).fetchall()
            return [dict(row) for row in rows]

    @app.get("/health")
    def health() -> tuple:
        if not app.config["DATABASE_PATH"].exists():
            return jsonify({"status": "error", "message": "Banco SQLite nao encontrado"}), 503
        return jsonify({"status": "ok"})

    @app.get("/comunidades")
    def list_communities() -> tuple:
        filters = []
        parameters: list[object] = []

        name = request.args.get("nome", "").strip()
        if name:
            filters.append("c.nome LIKE ?")
            parameters.append(f"%{name}%")

        municipality_id = request.args.get("municipio_id")
        if municipality_id:
            try:
                parameters.append(int(municipality_id))
            except ValueError:
                return jsonify({"erro": "municipio_id deve ser inteiro"}), 400
            filters.append("c.municipio_id = ?")

        certified = request.args.get("certificado_fcp")
        if certified is not None:
            normalized = certified.lower()
            if normalized not in {"true", "false", "1", "0"}:
                return jsonify({"erro": "certificado_fcp deve ser true ou false"}), 400
            filters.append("c.certificado_fcp = ?")
            parameters.append(1 if normalized in {"true", "1"} else 0)

        where_clause = f"WHERE {' AND '.join(filters)}" if filters else ""
        rows = query_database(
            f"""
            SELECT
                c.id, c.nome, c.municipio_id, m.nome AS municipio,
                m.uf, c.populacao_estimada, c.qtd_familias,
                c.certificado_fcp, c.data_certificacao,
                c.latitude, c.longitude, c.criado_em
            FROM comunidades c
            INNER JOIN municipios m ON m.id = c.municipio_id
            {where_clause}
            ORDER BY c.nome
            """,
            tuple(parameters),
        )
        for row in rows:
            row["certificado_fcp"] = bool(row["certificado_fcp"])
        return jsonify(rows)

    @app.post("/comunidades")
    def create_community() -> tuple:
        data = request.get_json(silent=True) or {}
        required_fields = (
            "nome", "municipio_id", "latitude", "longitude", "certificado_fcp"
        )
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({"erro": "Campos obrigatorios ausentes", "campos": missing_fields}), 400

        try:
            municipality_id = int(data["municipio_id"])
            latitude = float(data["latitude"])
            longitude = float(data["longitude"])
        except (TypeError, ValueError):
            return jsonify({"erro": "municipio_id, latitude e longitude devem ser numericos"}), 400

        if not -90 <= latitude <= 90 or not -180 <= longitude <= 180:
            return jsonify({"erro": "Coordenadas fora dos limites validos"}), 400

        certified = data["certificado_fcp"]
        if not isinstance(certified, bool):
            return jsonify({"erro": "certificado_fcp deve ser booleano"}), 400

        certification_date = data.get("data_certificacao")
        if certified and not certification_date:
            return jsonify({"erro": "data_certificacao e obrigatoria para comunidades certificadas"}), 400
        if not certified and certification_date:
            return jsonify({"erro": "data_certificacao so pode ser informada para comunidades certificadas"}), 400

        try:
            with sqlite3.connect(app.config["DATABASE_PATH"]) as connection:
                connection.execute("PRAGMA foreign_keys = ON")
                cursor = connection.execute(
                    """INSERT INTO comunidades (
                        nome, municipio_id, populacao_estimada, qtd_familias,
                        certificado_fcp, data_certificacao, latitude, longitude
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
                    (
                        data["nome"].strip(), municipality_id,
                        data.get("populacao_estimada"), data.get("qtd_familias"),
                        int(certified), certification_date, latitude, longitude,
                    ),
                )
                community_id = cursor.lastrowid
        except sqlite3.IntegrityError as error:
            message = "Nao foi possivel cadastrar a comunidade"
            if "UNIQUE" in str(error).upper():
                message = "Ja existe uma comunidade com esse nome neste municipio"
            return jsonify({"erro": message}), 409

        return jsonify({"id": community_id, "mensagem": "Comunidade cadastrada com sucesso"}), 201

    @app.get("/municipios")
    def list_municipalities() -> tuple:
        rows = query_database(
            """
            SELECT id, nome, uf, codigo_ibge
            FROM municipios
            ORDER BY nome
            """
        )
        return jsonify(rows)

    @app.get("/documentos")
    def list_documents() -> tuple:
        rows = query_database(
            """
            SELECT
                d.id, d.atividade_id, a.titulo AS atividade,
                d.comunidade_id, c.nome AS comunidade,
                d.nome_arquivo, d.formato, d.caminho_storage, d.criado_em
            FROM documentos d
            LEFT JOIN atividades a ON a.id = d.atividade_id
            LEFT JOIN comunidades c ON c.id = d.comunidade_id
            ORDER BY d.id
            """
        )
        return jsonify(rows)

    return app


app = create_app()


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
