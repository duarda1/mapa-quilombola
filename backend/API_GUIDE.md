# API Guide

API Flask simples para o Portal de Memórias e Mapa Quilombola. Ela usa o banco real `database/mapa_quilombola.db`.

## Instalar e executar

Na raiz do projeto:

```bash
python -m pip install -r backend/requirements.txt
python database/seed/validate_seed.py
python backend/app.py
```

Servidor: `http://127.0.0.1:5000`

## Operações

### NOME: Verificar saúde do servidor

**ENDEREÇO:** `/health`

**TIPO:** `GET`

**O QUE RECEBE:** Nada.

**O QUE DEVOLVE:** Status da API e confirmação de que o banco SQLite existe.

**EXEMPLO:**

```bash
curl http://127.0.0.1:5000/health
```

```json
{"status": "ok"}
```

### NOME: Listar comunidades

**ENDEREÇO:** `/comunidades`

**TIPO:** `GET`

**O QUE RECEBE:** Filtros opcionais `nome`, `municipio_id` e `certificado_fcp`.

**O QUE DEVOLVE:** Lista de comunidades com município, coordenadas, famílias e certificação.

**EXEMPLO:**

```bash
curl "http://127.0.0.1:5000/comunidades?municipio_id=1&certificado_fcp=true"
```

### NOME: Cadastrar comunidade

**ENDEREÇO:** `/comunidades`

**TIPO:** `POST`

**O QUE RECEBE:** JSON com `nome`, `municipio_id`, `latitude`, `longitude` e `certificado_fcp`. Também aceita `qtd_familias`, `populacao_estimada` e `data_certificacao`.

**O QUE DEVOLVE:** ID criado e mensagem de sucesso. Retorna `400` para dados inválidos e `409` para duplicidade.

**EXEMPLO:**

```bash
curl -X POST http://127.0.0.1:5000/comunidades ^
  -H "Content-Type: application/json" ^
  -d "{\"nome\":\"Quilombo Exemplo\",\"municipio_id\":3,\"latitude\":-3.9,\"longitude\":-44.7,\"qtd_familias\":12,\"certificado_fcp\":false}"
```

```json
{"id": 6, "mensagem": "Comunidade cadastrada com sucesso"}
```

### NOME: Consultar detalhes de uma comunidade

**ENDEREÇO:** `/comunidades/<id>`

**TIPO:** `GET`

**O QUE RECEBE:** O ID da comunidade no endereço.

**O QUE DEVOLVE:** Dados da comunidade, município e lista de territórios relacionados.

**EXEMPLO:**

```bash
curl http://127.0.0.1:5000/comunidades/1
```

### NOME: Listar municípios

**ENDEREÇO:** `/municipios`

**TIPO:** `GET`

**O QUE RECEBE:** Nada.

**O QUE DEVOLVE:** Lista de municípios com nome, UF e código IBGE sintético.

**EXEMPLO:**

```bash
curl http://127.0.0.1:5000/municipios
```

### NOME: Listar documentos

**ENDEREÇO:** `/documentos`

**TIPO:** `GET`

**O QUE RECEBE:** Nada.

**O QUE DEVOLVE:** Lista de documentos com atividade e comunidade relacionadas.

**EXEMPLO:**

```bash
curl http://127.0.0.1:5000/documentos
```

## Regras de validação

- `municipio_id`, latitude e longitude são obrigatórios no cadastro.
- Latitude deve estar entre `-90` e `90`.
- Longitude deve estar entre `-180` e `180`.
- `municipio_id` deve ser um número inteiro existente.
- `certificado_fcp` deve ser booleano.
- `nome` deve ser um texto não vazio.
- `qtd_familias` e `populacao_estimada`, quando informados, devem ser inteiros não negativos.
- `data_certificacao`, quando informada, deve usar o formato `AAAA-MM-DD`.
- Comunidade certificada precisa de `data_certificacao`.
- Não pode haver o mesmo nome no mesmo município.
