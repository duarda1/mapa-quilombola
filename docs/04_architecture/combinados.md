# Combinados entre as partes

A tabela abaixo define o contrato mínimo para o MVP. Banco, backend e frontend devem usar os nomes exatamente como estão escritos.

| Funcionalidade | Tela necessária | Informações usadas | O servidor precisa fazer | O banco precisa guardar |
| --- | --- | --- | --- | --- |
| Consultar comunidades | Mapa ou lista inicial | `nome`, `municipio_id`, `latitude`, `longitude`, `certificado_fcp` | Consultar comunidades e devolver dados para os marcadores ou itens | `municipios` e `comunidades` |
| Pesquisar e filtrar | Busca e filtros | `nome`, `municipio_id`, `certificado_fcp` | Aplicar filtros e devolver somente os registros correspondentes | `comunidades` relacionada a `municipios` |
| Ver detalhes | Detalhes da comunidade | Todos os campos públicos de `comunidades` e `territorios` | Buscar uma comunidade e seus dados territoriais | `comunidades` e `territorios` |
| Cadastrar comunidade | Formulário de cadastro | `nome`, `municipio_id`, `qtd_familias`, `certificado_fcp`, `data_certificacao`, `latitude`, `longitude` | Validar obrigatórios, coordenadas e duplicidade; salvar o registro | Novo registro em `comunidades` |
| Consultar documentos do projeto | Lista de documentos, se implementada | `atividade_id`, `comunidade_id`, `nome_arquivo`, `formato`, `caminho_storage` | Listar documentos relacionados | `atividades` e `documentos` |

## NOMES QUE TODOS DEVEM USAR

### Entidades

- `municipios`
- `comunidades`
- `territorios`
- `atividades`
- `documentos`

### Campos principais

- Identificador: `id`
- Comunidade: `nome`
- Relação com município: `municipio_id`
- Famílias: `qtd_familias`
- Certificação: `certificado_fcp`
- Data da certificação: `data_certificacao`
- Latitude: `latitude`
- Longitude: `longitude`
- Criação do registro: `criado_em`
- Território: `area_hectares`, `fase_titulacao`, `orgao_responsavel`

### Relações

- `comunidades.municipio_id` referencia `municipios.id`.
- `territorios.comunidade_id` referencia `comunidades.id`.
- `documentos.atividade_id` referencia `atividades.id`.
- `documentos.comunidade_id` referencia `comunidades.id`.

### Rotas de consulta do backend

- `GET /comunidades` lista comunidades e aceita `nome`, `municipio_id` e `certificado_fcp` como filtros opcionais.
- `GET /municipios` lista os municípios cadastrados.
- `GET /documentos` lista documentos com os nomes da atividade e da comunidade relacionadas.

### Regras de integridade

- `comunidades.municipio_id`, `latitude` e `longitude` são obrigatórios.
- Não pode existir mais de uma comunidade com o mesmo `nome` no mesmo `municipio_id`.
- `comunidades.latitude` deve estar entre -90 e 90; `longitude` deve estar entre -180 e 180. A validação deve ser feita pelo backend até que exista uma restrição equivalente no banco.
- `territorios.comunidade_id` é obrigatório.
- `certificado_fcp` representa a certificação pela Fundação Cultural Palmares; `fase_titulacao` representa a regularização territorial e não deve ser usado como sinônimo.

> O dicionário da miniatividade usa nomes como `nome_comunidade`, `id_comunidade` e `certificada`. Para a implementação compartilhada, estes nomes devem ser traduzidos para os nomes do schema acima, sem criar campos duplicados.
