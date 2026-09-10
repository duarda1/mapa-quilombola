# Frontend do PMMQ

Interface web do Portal de Memórias e Mapa Quilombola. O frontend é servido pelo Flask e consome a API real conectada ao SQLite.

## Executar

Na raiz do projeto:

```bash
python -m pip install -r backend/requirements.txt
python database/seed/validate_seed.py
python backend/app.py
```

Abra no navegador:

```text
http://127.0.0.1:5000
```

## Telas e fluxos

- **Explorar mapa:** mapa Leaflet com OpenStreetMap, marcadores das comunidades, busca por nome e filtros por município/certificação.
- **Seleção no mapa:** clicar em qualquer ponto preenche latitude e longitude no formulário de cadastro.
- **Detalhes:** ao selecionar uma comunidade, consulta `/comunidades/<id>` e exibe seus dados territoriais em uma mensagem de confirmação.
- **Cadastro:** abre o formulário, valida campos no navegador e envia `POST /comunidades`.
- **Documentos:** lista os arquivos retornados por `GET /documentos`.

## Integração

As chamadas são feitas em `app.js` usando a mesma origem do Flask. Não há conexão direta do frontend com o SQLite.

O mapa usa Leaflet e OpenStreetMap. A disponibilidade dos blocos cartográficos depende da conexão com a internet; os dados das comunidades continuam vindo da API local.

Estados implementados:

- carregamento inicial enquanto a API responde;
- erro quando a API não está disponível;
- lista vazia quando os filtros não encontram registros;
- retorno de sucesso ou erro no cadastro.
