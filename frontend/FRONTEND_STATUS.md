# Frontend Status

## Estado geral

DONE

## Telas

| Tela/fluxo | Status | Dados | API usada |
| --- | --- | --- | --- |
| Explorar mapa e lista | API | Comunidades sintéticas persistidas no SQLite | `GET /comunidades` |
| Mapa geográfico e seleção de ponto | API | Latitude e longitude dos registros | Leaflet + OpenStreetMap |
| Busca por nome | API | Campo `nome` | `GET /comunidades?nome=...` |
| Filtros | API | `municipio_id`, `certificado_fcp` | `GET /comunidades?...` |
| Detalhes territoriais | API | Comunidade e `territorios` | `GET /comunidades/<id>` |
| Cadastro de comunidade | API | `nome`, `municipio_id`, coordenadas, famílias e certificação | `POST /comunidades` |
| Documentos | API | Atividades e documentos relacionados | `GET /documentos` |

## Estados implementados

- Carregamento inicial.
- API indisponível.
- Lista vazia após filtros.
- Erro de validação no cadastro.
- Sucesso após cadastro.
- Layout responsivo para telas menores.
- Marcadores geográficos reais e preenchimento de coordenadas por clique no mapa.
- Painel persistente de detalhes, inclusive para comunidades com campos territoriais ausentes.
- Aviso visual quando os tiles externos do mapa não estão disponíveis.

## Campos do formulário

- Obrigatórios: `nome`, `municipio_id`, `latitude`, `longitude`, `certificado_fcp`.
- Opcionais: `qtd_familias`, `populacao_estimada`, `data_certificacao`.
- `data_certificacao` aparece somente quando a comunidade é marcada como certificada.

## Integração

DONE. O frontend usa a API Flask real e não acessa o banco diretamente.
