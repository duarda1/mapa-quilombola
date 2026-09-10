# Backend Status

## Estado

DONE

## Implementado

- API Flask executável.
- Conexão com o banco real SQLite em `database/mapa_quilombola.db`.
- `GET /health`.
- `GET /comunidades` com filtros por nome, município e certificação.
- `POST /comunidades` com validação e persistência.
- `GET /municipios`.
- `GET /documentos` com os vínculos de atividade e comunidade.
- Tratamento de dados inválidos e duplicidade.
- Testes de integração em `tests/integration/test_api.py`.

## Dados temporários

Não usa dados temporários na API. Os registros vêm do SQLite carregado pelo seed em `database/seed/seed.json`.

## Integração necessária

- Frontend deve consumir as rotas descritas em `API_GUIDE.md`.
- A equipe deve iniciar a API com `python backend/app.py` antes de abrir a interface.
- O Aluno 6 deve testar o fluxo completo frontend → API → SQLite → resposta.

## Comandos

```bash
python -m pip install -r backend/requirements.txt
python database/seed/validate_seed.py
python -m unittest tests/integration/test_api.py
python backend/app.py
```

Status da equipe: `✅ PRONTO PARA JUNTAR`
