# Portal de Memórias e Mapa Quilombola

O PMMQ organiza informações de comunidades quilombolas em um sistema web consultável. O MVP prioriza mapa ou lista de comunidades, busca, filtros, detalhes e cadastro.

## Estrutura

- `docs/`: visão, requisitos, fluxos, arquitetura e registros de IA.
- `diagrams/`: diagramas e exportações, incluindo o modelo visual do banco.
- `frontend/`: telas da aplicação.
- `backend/`: servidor e API.
- `database/`: schema, migrações e seeds.
- `data/`: dados sintéticos e dados brutos autorizados.
- `tests/`: testes de integração.
- `outputs/`: resultados gerados.
- `equipe/`: guias de trabalho por papel.

## Documentação principal

- [Contexto do projeto](docs/01_context/project.md)
- [Requisitos do MVP](docs/02_requirements/requirements.md)
- [Fluxos essenciais](docs/03_use_cases/use_cases.md)
- [Combinados entre as partes](docs/04_architecture/combinados.md)
- [Status da organização](docs/04_architecture/ORGANIZACAO_STATUS.md)
- [Status da equipe](EQUIPE_STATUS.md)

## Estado atual

O MVP está integrado e demonstrável: frontend servido pelo Flask, API conectada ao SQLite, dados sintéticos carregados, mapa Leaflet, filtros, detalhes, documentos e cadastro de comunidades.

Validação atual:

- 12 testes de integração passando;
- rotas principais respondendo;
- banco SQLite com seed sintético;
- frontend consumindo a API sem acesso direto ao banco.

Antes de criar uma nova funcionalidade, confira os nomes definidos em `docs/04_architecture/combinados.md` e atualize `EQUIPE_STATUS.md`.
