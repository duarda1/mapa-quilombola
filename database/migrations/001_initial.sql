-- Migracao inicial do PMMQ.
-- O script database/seed/validate_seed.py tambem cria este schema
-- automaticamente para a demonstracao local.

PRAGMA foreign_keys = ON;

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
