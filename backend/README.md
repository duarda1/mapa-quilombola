# API do PMMQ

API Flask para consultar o banco SQLite local.

## Instalação

Na raiz do projeto:

```bash
python -m pip install -r backend/requirements.txt
```

O banco deve existir em `database/mapa_quilombola.db`. Para criá-lo e carregar os dados sintéticos:

```bash
python database/seed/validate_seed.py
```

## Execução

```bash
python backend/app.py
```

A API ficará disponível em `http://127.0.0.1:5000`.

## Rotas

- `GET /health`
- `GET /comunidades`
- `GET /comunidades?nome=Aurora`
- `GET /comunidades?municipio_id=1&certificado_fcp=true`
- `GET /municipios`
- `GET /documentos`
