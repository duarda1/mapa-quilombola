# Status dos dados sintéticos

## Situação

✅ PRONTO PARA JUNTAR

## O que foi criado

- 3 municípios fictícios do estado do Maranhão.
- 5 comunidades fictícias, com variação de certificação e dados opcionais ausentes.
- 4 registros territoriais, incluindo uma situação territorial ainda sem área e fase informadas.
- 2 atividades do projeto.
- 2 documentos relacionados a atividades e comunidades.

O arquivo `mock_data.json` é exclusivamente sintético e demonstrativo. Não representa comunidades, pessoas ou documentos reais.

## Fluxos que podem ser demonstrados

- Listagem de comunidades no mapa ou em uma tabela.
- Busca por nome.
- Filtro por município.
- Filtro por `certificado_fcp`.
- Visualização dos detalhes de uma comunidade com e sem dados territoriais completos.
- Cadastro usando os campos obrigatórios do schema.
- Consulta das relações entre municípios, comunidades, territórios, atividades e documentos.

## Validações realizadas

- Todos os `municipio_id` usados por comunidades existem em `municipios`.
- Todos os `comunidade_id` usados por territórios e documentos existem em `comunidades`.
- Todos os `atividade_id` usados por documentos existem em `atividades`.
- As coordenadas estão dentro dos limites de latitude e longitude.
- Não há duas comunidades com o mesmo nome no mesmo município.
- Os valores de `fase_titulacao` correspondem ao enum atual do schema.

## Execução e dependência do banco

A consistência dos dados pode ser verificada sem banco com:

```bash
python database/seed/validate_seed.py
```

O projeto ainda não define uma tecnologia de banco executável para carregar o seed. Por isso, `seed.json` está pronto como fonte de carga, mas a inserção real depende da escolha do banco e do backend.
