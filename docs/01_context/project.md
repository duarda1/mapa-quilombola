# Projeto: Portal de Memórias e Mapa Quilombola (PMMQ)

## Problema

Informações sobre comunidades quilombolas estão dispersas, o que dificulta a consulta de localização, história, cultura e situação de certificação.

## Público

Moradores e lideranças comunitárias, pesquisadores, estudantes, órgãos públicos, organizações sociais e visitantes interessados no tema.

## Objetivo

Centralizar comunidades quilombolas em um mapa consultável, com dados básicos de localização, município, população, famílias e certificação. Em versões futuras, o portal poderá receber memórias e conteúdos submetidos para validação comunitária.

## Tecnologias e arquivos existentes

- Modelo de dados em `database/schema.dbml` e visualização em `diagrams/database/db.dbdiagram`.
- Documentação em Markdown dentro de `docs/`.
- Integração com um mapa web ainda precisa ser definida; Leaflet com OpenStreetMap é uma opção já registrada.
- Não foram encontrados frontend, backend, scripts de banco ou dados sintéticos neste repositório.

## Resumo

O PMMQ é um sistema web para dar visibilidade a comunidades quilombolas.
O MVP deve permitir consultar comunidades em um mapa ou lista, pesquisar por nome e município,
filtrar por certificação e abrir os detalhes de uma comunidade.
O cadastro de uma nova comunidade é o principal fluxo de escrita previsto.
O schema atual separa municípios, comunidades e territórios.
A tabela de documentos relaciona arquivos a atividades ou comunidades.
A tabela de atividades registra as etapas do projeto acadêmico.
Conteúdos sensíveis ou relatos ainda precisam de validação e regras de publicação.
