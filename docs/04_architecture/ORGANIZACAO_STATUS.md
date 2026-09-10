# Status da organização

## O que foi encontrado

- O projeto é o Portal de Memórias e Mapa Quilombola (PMMQ).
- A documentação existente em `docs/README.md` descreve problema, público, escopo e requisitos amplos.
- `docs/miniatividade.md` detalha o cadastro e a consulta de comunidades.
- `database/schema.dbml` já define `municipios`, `comunidades`, `territorios`, `atividades` e `documentos`.
- Não foram encontrados frontend, backend, scripts de migração, seeds ou testes neste repositório.
- A documentação antiga foi preservada; os documentos deste diretório organizam o MVP para o trabalho paralelo.

## Decisões adotadas

- O MVP prioriza consulta e cadastro de comunidades.
- Os nomes do `database/schema.dbml` são a referência para o contrato entre as partes.
- O schema exige município e coordenadas no cadastro, evita duplicidade por nome e município e separa certificação FCP de titulação territorial.
- A consulta deve funcionar por mapa ou lista, permitindo demonstrar o fluxo mesmo que a integração cartográfica ainda não esteja pronta.
- Relatos, mídias, autenticação, moderação, exportação e painel administrativo completo ficam para depois.
- `nome`, `municipio_id` e `certificado_fcp` serão usados no lugar de `nome_comunidade`, `municipio` e `certificada` na implementação.

## Dúvidas

- A equipe usará Leaflet com OpenStreetMap ou outra biblioteca de mapas?
- O cadastro será público ou exigirá autenticação?
- O escopo inicial ficará restrito a Itapecuru-Mirim ou abrangerá outros municípios do Maranhão?
- A tabela `territorios` terá um registro por comunidade ou poderá ter vários?
- Os documentos e atividades fazem parte da demonstração atual ou ficam apenas como apoio acadêmico?

## Pontos para conferir com os colegas

- Banco: conferir se o schema implementado mantém os nomes e relações descritos em `combinados.md`.
- Dados: conferir se os exemplos possuem municípios válidos, coordenadas plausíveis e valores compatíveis com o schema.
- Backend: conferir se existe rota para listar, filtrar, detalhar e cadastrar comunidades.
- Frontend: conferir se as telas cobrem consulta, detalhes e cadastro, com mensagens para erros de validação.
- Integração: executar ao menos um fluxo completo de frontend para backend, banco e retorno visual.

## Situação

✅ PRONTO PARA JUNTAR
