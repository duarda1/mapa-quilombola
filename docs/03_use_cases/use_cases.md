# Fluxos essenciais

## FLUXO: Consultar comunidades no mapa

**Quem usa:** Visitante, pesquisador ou estudante.

**O que faz:** Abre o sistema e visualiza as comunidades cadastradas como marcadores ou itens de uma lista.

**O que informa:** Opcionalmente, nome, município ou filtro de certificação.

**O que espera ver no final:** A lista ou o mapa atualizado com as comunidades que correspondem à busca.

## FLUXO: Ver detalhes de uma comunidade

**Quem usa:** Visitante, pesquisador ou estudante.

**O que faz:** Seleciona uma comunidade no mapa ou na lista.

**O que informa:** A comunidade que deseja consultar.

**O que espera ver no final:** Nome, município, coordenadas, quantidade de famílias, situação de certificação e dados territoriais disponíveis.

## FLUXO: Cadastrar comunidade

**Quem usa:** Administrador ou pesquisador autorizado.

**O que faz:** Preenche o formulário e envia uma nova comunidade para o sistema.

**O que informa:** `nome`, `municipio_id`, `latitude`, `longitude`, `qtd_familias`, `certificado_fcp` e, quando disponível, `data_certificacao`.

**O que espera ver no final:** Mensagem de sucesso, registro salvo e comunidade disponível para consulta.

## FLUXO: Corrigir cadastro inválido

**Quem usa:** Administrador ou pesquisador autorizado.

**O que faz:** Tenta salvar um cadastro com campo obrigatório ausente, coordenada inválida ou duplicidade aparente.

**O que informa:** Os valores do formulário corrigidos.

**O que espera ver no final:** Mensagem indicando o problema, formulário preservado e nenhum registro inválido ou duplicado salvo.

## FLUXO: Consultar situação territorial

**Quem usa:** Pesquisador, estudante ou órgão público.

**O que faz:** Abre os dados territoriais associados a uma comunidade.

**O que informa:** A comunidade selecionada.

**O que espera ver no final:** Área em hectares, fase de titulação e órgão responsável, quando houver registro em `territorios`.
