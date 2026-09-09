# Documento Inicial do Projeto — D0  
## Documento de Visão e Documento de Requisitos

**Instituição:** Instituto Federal do Maranhão — Campus Itapecuru-Mirim  
**Disciplina:** Modelagem de Sistemas com IA Generativa  
**Professor:** Prof. Dr. Thales Levi Azevedo Valente  
**Turma:** 3  
**Grupo:** Maria Eduarda, Elizana, Fernando, Juliana Pires, Beatriz Campelo  
**Trilha:** Mapa Temporal Participativo de Memória Quilombola  
**Nome do projeto:** Portal de Memórias e Mapa Quilombola (PMMQ)  
**Data:** 08/07/2026  
**Versão:** D0  

---
---

## Controle do Documento

| Versão | Data | Responsáveis | Descrição da alteração / Commits Relacionados |
|---|---|---|---|
| D0 | 08/07/2026 | Maria Eduarda, Elizana, Fernando, Juliana Pires, Beatriz Campelo | `501d1d0` docs: adiciona documento de visão e requisitos versão D0 |
| D0 | 08/07/2026 | Elizana | `cdf9bee` atividade-06 |
| D0 | 07/07/2026 | Juliana Pires | `7ef0092` atividade-04 |
| D0 | 06/07/2026 | Maria Eduarda | `3a717d7` atividade-03 |
| D0 | 04/07/2026 | Beatriz Campelo | `e9da132` atividade-01 |
| D0 | 04/07/2026 | Maria Eduarda, Elizana, Fernando, Juliana Pires, Beatriz Campelo | `7336705` fix: recupera texto completo da atividade 01 (Desenvolvimento em Grupo) |

---

# Sumário

1. [Introdução](#1-introdução)  
2. [Documento de Visão](#2-documento-de-visão)  
3. [Documento de Requisitos](#3-documento-de-requisitos)  
4. [Registro de Uso da IA](#4-registro-de-uso-da-ia)  
5. [Espaço Reservado para Próximas Etapas](#5-espaço-reservado-para-próximas-etapas)  
6. [Pendências Gerais](#6-pendências-gerais)  

---

# 1. Introdução

## 1.1 Finalidade do documento

Este documento apresenta a versão inicial da visão e dos requisitos do projeto **Portal de Memórias e Mapa Quilombola (PMMQ)**.  
Ele registra o problema real investigado, o objetivo do sistema, os stakeholders, o escopo inicial, os requisitos levantados até o momento e as pendências que ainda precisam de validação com a comunidade e o corpo docente.

## 1.2 Fontes usadas para elaborar esta versão

| Fonte ou atividade | O que foi aproveitado no documento |
|---|---|
| Aula 1 — Problema real e trilha | Definição da trilha de Mapa Quilombola focando na falta de visibilidade destas comunidades. |
| Aula 2 — Entrada, processamento e saída | Levantamento do fluxo de dados: localização, mídias e aprovação de registros. |
| Aula 4 — Uso de IA e log | Estruturação e refinamento dos primeiros rascunhos em formato Markdown. |
| Aula 5 — Stakeholders, objetivo, escopo e 5W1H | Identificação de pesquisadores, moradores e órgãos públicos como público-alvo. |
| Aula 6 — Plano de coleta e ética | Inclusão de regras voltadas ao consentimento e validação de dados pela liderança. |
| Aula 8 — Primeira lista rastreável | Mapeamento inicial das necessidades de busca e categorização por mapas. |
| Aula 9 — Documento de Visão e Requisitos | Junção e refinamento de todas as etapas no presente artefato D0. |

---

# 2. Documento de Visão

## 2.1 Identificação do projeto

| Campo | Preenchimento |
|---|---|
| Nome do projeto | Portal de Memórias e Mapa Quilombola (PMMQ) |
| Trilha escolhida | Mapa Temporal Participativo de Memória Quilombola |
| Problema central | Muitas comunidades quilombolas possuem pouca visibilidade e informações dispersas. |
| Público principal | Moradores locais, pesquisadores, órgãos públicos e organizações sociais. |
| Produto esperado | Sistema de mapa interativo com relatos, dados históricos, fotos e validação comunitária. |

## 2.2 Problema real

**Problema real identificado:** Muitas comunidades quilombolas possuem pouca visibilidade e informações dispersas, dificultando o acesso centralizado a dados sobre sua localização, cultura, história e necessidades. 

**Quem é afetado pelo problema:** Moradores das comunidades quilombolas, pesquisadores, estudantes, órgãos públicos e organizações sociais interessadas em preservação cultural.

**Por que o problema importa:** A dispersão de dados prejudica a preservação da memória local, apaga a valorização da cultura quilombola e dificulta diretamente a implementação de políticas públicas, pesquisas acadêmicas e ações de apoio social.

## 2.3 Justificativa

O projeto se justifica por centralizar informações fundamentais que hoje estão isoladas ou em vias de esquecimento oral. Ao transformar relatos e localizações físicas em conhecimento digital estruturado, a solução empodera as comunidades tradicionais, fomenta a pesquisa científica no IFMA e subsidia decisões governamentais com dados precisos e validados.

## 2.4 Objetivo do sistema

**Objetivo geral:** Apoiar **moradores, pesquisadores e órgãos públicos** a **registrar, geolocalizar e consultar memórias territoriais e históricas** para **valorizar e preservar a cultura quilombola com validação comunitária**.

## 2.5 Stakeholders

| Tipo | Stakeholder | Interesse ou necessidade | Relação com o sistema |
|---|---|---|---|
| Usuário direto | Pesquisador / Estudante | Consultar e catalogar memórias e dados geográficos | Utiliza o mapa e as fichas históricas para pesquisa. |
| Fornecedor de dados | Integrante da Comunidade | Registrar relatos e ceder mídias sobre sua história | Insere propostas de conteúdos, fotos e histórias no portal. |
| Validador | Liderança Comunitária | Garantir a veracidade e respeito com os dados sensíveis | Valida e autoriza publicações antes de irem a público. |
| Gestor / Responsável | Administrador do Sistema (IFMA) | Manter a plataforma segura, ativa e moderada | Monitora o uso, gerencia usuários e cuida da infraestrutura. |
| Impactado | População Geral / Órgãos Públicos | Identificar comunidades e entender suas demandas | Utiliza as informações extraídas para fins informativos ou de políticas públicas. |

## 2.6 Sistema como transformação

| Elemento | Descrição |
|---|---|
| Entradas | Relatos orais, textos históricos, coordenadas geográficas, imagens, documentos em PDF e dados de certificação. |
| Processamento | Limpeza e estruturação de mídias, georreferenciamento de pontos no mapa, filtragem por categorias e fluxo de moderação/aprovação de conteúdos. |
| Saídas | Mapa georreferenciado e interativo, fichas consolidadas de memória por comunidade e relatórios de busca gerados. |
| Usuários das saídas | Pesquisadores, comunidade externa, professores do IFMA e formuladores de políticas públicas. |

## 2.7 Escopo inicial

| ID | Dentro do escopo | Justificativa |
|---|---|---|
| E01 | Cadastro e plotagem de comunidades em mapa interativo | Função essencial da trilha escolhida para acabar com a dispersão geográfica. |
| E02 | Repositório de memórias (textos, dados históricos e fotos) | Permite o registro direto do patrimônio imaterial e cultural da comunidade. |
| E03 | Painel de moderação e aprovação para lideranças/administradores | Protege os dados e assegura que somente conteúdos validados fiquem públicos. |
| E04 | Filtros de busca por nome, município e status de certificação | Garante que os pesquisadores consigam achar os dados com agilidade. |

## 2.8 Fora do escopo

| ID | Fora do escopo | Motivo |
|---|---|---|
| FE01 | Comercialização de artesanatos ou turismo (E-commerce) | Desvia do foco acadêmico e de modelagem de sistemas de memória proposto na disciplina. |
| FE02 | Módulo de denúncias de conflitos agrários ou suporte jurídico | Exige aparatos legais complexos e validações judiciais fora do alcance da aplicação. |
| FE03 | Monitoramento via satélite em tempo real do território | Inviabilidade técnica de custo e infraestrutura de hardware para o projeto acadêmico. |

## 2.9 Fronteira do sistema

| Elemento externo | O que envia ao sistema | O que recebe do sistema |
|---|---|---|
| Provedor de Mapas (Ex: OpenStreetMap/Leaflet) | Camadas de mapas e dados cartográficos básicos | Requisições de coordenadas e renderização de pins. |
| Comunidade / Liderança | Relatos, imagens históricos e validação de requisições | Fichas organizadas de memória e autonomia na exibição de sua história. |

## 2.10 Limites e compromissos do projeto

| Compromisso | Como será respeitado |
|---|---|
| Respeito à LGPD e Ética | Nomes e contatos de moradores não serão expostos sem anuência explícita documentada no sistema. |
| Validação Comunitária Obrigatória | Nenhum ponto ou história será publicado no mapa geral sem que o status passe pela validação de um responsável. |

---

# 3. Documento de Requisitos

## 3.1 Requisitos funcionais iniciais

| ID | Requisito funcional | Ator principal | Prioridade | Fonte ou evidência |
|---|---|---|---|---|
| RF001 | O sistema deve exibir um mapa interativo com marcadores (pins) indicando a localização de cada comunidade quilombola. | Visitante | Alta | Discussão Final do Grupo (Guia de Perguntas Q4) |
| RF002 | O sistema deve permitir visualizar a ficha detalhada (história, cultura, fotos) ao clicar em um marcador no mapa. | Visitante | Alta | Discussão Final do Grupo (Guia de Perguntas Q4) |
| RF003 | O sistema deve disponibilizar barra de busca para encontrar comunidades por nome, município ou manifestação cultural. | Visitante | Alta | Discussão Final do Grupo (Guia de Perguntas Q4) |
| RF004 | O sistema deve permitir o cadastro de novos usuários com níveis de acesso diferenciados (Visitante, Editor, Administrador). | Administrador | Alta | Aula 8 - Lista Rastreável |
| RF005 | O sistema deve permitir que usuários do tipo "Editor" submetam propostas de cadastro, edição e exclusão de pontos. | Editor | Média | Aula 5 - 5W1H / Stakeholders |
| RF006 | O sistema deve viabilizar o upload de imagens e documentos textuais atrelados à história da comunidade. | Editor | Média | Discussão Final do Grupo (Guia de Perguntas Q4) |
| RF007 | O sistema deve oferecer um formulário público para sugestão de correções cadastrais enviado por visitantes anônimos. | Visitante | Baixa | Aula 2 - Fluxo de Entradas |
| RF008 | O sistema deve permitir filtrar as comunidades por status de certificação (ex: Certificada pela Fundação Cultural Palmares). | Visitante | Média | Aula 8 - Lista Rastreável |
| RF009 | O sistema deve permitir a exportação de dados públicos das comunidades em formato textual estruturado (CSV ou PDF). | Pesquisador | Baixa | Aula 2 - Fluxo de Saídas |
| RF010 | O sistema deve disponibilizar um painel de pendências para o Administrador aprovar ou rejeitar novos conteúdos sugeridos. | Administrador | Alta | Aula 9 - Discussão de Visão |

## 3.2 Requisitos não funcionais iniciais

| ID | Categoria | Requisito não funcional | Como verificar | Prioridade |
|---|---|---|---|---|
| RNF001 | Usabilidade | O sistema deve ser responsivo, adaptando sua interface para smartphones, tablets e computadores de mesa. | Testar a visualização e uso do mapa em dispositivos com diferentes tamanhos de tela. | Alta |
| RNF002 | Desempenho | O mapa e seus marcadores iniciais devem carregar completamente em um tempo máximo de 4 segundos sob conexões de rede móvel padrão. | Medir o tempo de resposta da renderização do mapa usando ferramentas de inspeção do navegador. | Média |
| RNF003 | Segurança | Todas as senhas de usuários armazenadas no sistema devem ser criptografadas antes de serem salvas no banco de dados. | Verificar a tabela de usuários no banco de dados para garantir que não haja senhas em texto limpo. | Alta |
| RNF004 | Disponibilidade | O portal do mapa interativo deve se manter operacional e acessível por pelo menos 99% do tempo anual (Uptime). | Monitorar os logs de atividade do servidor através de ferramentas de monitoramento externo. | Média |
| RNF005 | Privacidade | Informações de identificação pessoal (PII) de lideranças de comunidades não devem ser expostas publicamente sem autorização ativa. | Validar que campos privados não constam nas rotas e telas públicas de exibição do mapa. | Alta |
| RNF006 | Confiabilidade | O sistema deve realizar rotinas semanais automáticas de cópias de segurança (backup) de todos os dados textuais e fotos anexadas. | Verificar a geração periódica e integridade dos arquivos de backup no servidor de armazenamento. | Média |
| RNF007 | Acessibilidade | O sistema deve seguir padrões de design com alto contraste e marcações HTML adequadas a leitores de tela. | Executar ferramentas automatizadas de validação de acessibilidade web (como o Lighthouse) nas páginas principais. | Média |

## 3.3 Regras de negócio iniciais

| ID | Regra de negócio | Justificativa | Fonte ou validação |
|---|---|---|---|
| RN001 | Moderação Obrigatória: Qualquer conteúdo inserido ou alterado por um usuário comum só se tornará público após aprovação expressa da liderança/administrador. | Impede a propagação de dados incorretos ou ofensivos sobre o território. | Aula 6 - Plano Ético e Comunitário |
| RN002 | Restrição de Edição Direta: Usuários com o perfil de "Visitante" não têm permissão para editar qualquer conteúdo diretamente na base de dados. | Garante a integridade e evita a sabotagem ou perda acidental de dados históricos. | Aula 9 - Regras do Sistema |
| RN003 | Obrigatoriedade de Fonte: Toda inserção de fato histórico ou relato cultural deve listar a fonte da informação (seja oral, documental ou bibliográfica). | Assegura a rastreabilidade científica e a confiabilidade acadêmica das pesquisas ligadas ao IFMA. | Aula 8 - Lista Rastreável |
| RN004 | Veto de Comercialização: A plataforma não pode realizar transações financeiras, monetização de visualizações ou cobranças pelo acesso aos mapas. | O projeto visa ao cunho puramente científico, social e educacional gratuito. | Discussão Final do Grupo (Guia) |
| RN005 | Registro de Auditoria: Toda alteração realizada em uma comunidade cadastrada deve salvar automaticamente o ID do usuário responsável e a data/hora exata do evento. | Permite identificar responsáveis no caso de inserção de dados indevidos. | Aula 2 - Processamento |

## 3.4 Critérios de aceitação

| Requisito relacionado | Dado que | Quando | Então |
|---|---|---|---|
| RF001 / RF002 | O visitante está visualizando a tela principal com o mapa interativo carregado; | Ele clica com o cursor ou pressiona o dedo sobre o marcador (pin) de uma comunidade quilombola específica; | Uma janela pop-up ou gaveta lateral deve abrir em tela exibindo o nome, foto de destaque e resumo histórico da comunidade clicada. |
| RF010 / RN001 | Um usuário do tipo Editor finaliza o preenchimento e envia a proposta de cadastro de uma nova comunidade; | O Administrador acede ao Painel de Pendências; | O sistema deve exibir a proposta com a opção de "Aprovar" ou "Rejeitar", mantendo o registro invisível para o público externo enquanto a decisão não for tomada. |
| RNF001 | O usuário acede ao mapa através de um smartphone com largura de tela reduzida (ex: 360px); | A página renderiza os componentes visuais; | A barra de busca e os menus laterais devem contrair-se de forma automática num botão de menu retrátil ("hambúrguer") para não obstruir a visão da área cartográfica. |

## 3.5 Matriz de rastreabilidade inicial

| Evidência ou achado | Necessidade identificada | Requisito relacionado | Status |
|---|---|---|---|
| Relato de informações dispersas e de difícil acesso pelas pessoas | Prover um canal centralizado e de fácil manuseio público | RF001, RF002, RF003 | Validado pelo grupo |
| Risco de exposição indevida ou inserção de dados falsos históricos | Proteger a identidade da comunidade e blindar o sistema contra vandalismo de dados | RN001, RN002, RN005, RF010 | Validado pelo grupo |
| Necessidade de utilização do sistema em campo (áreas rurais/comunidades) | Garantir que o sistema opere bem em telemóveis e internet instável | RNF001, RNF002 | Hipótese a ser testada |

---

# 4. Registro de Uso da IA

| Data | Ferramenta | Prompt usado | O que foi aproveitado | O que foi corrigido ou descartado | Responsável pela revisão |
|---|---|---|---|---|---|
| 08/07/2026 | Gemini | "Ajuste os dados do nosso guia de discussão e expanda os requisitos para encaixar perfeitamente no arquivo de template .md do Professor Thales (Trilha Mapa Quilombola)..." | Estruturação das tabelas de escopo, stakeholders, expansão dos 10 RFs, 7 RNFs, 5 RNs e os critérios de aceitação estruturados in Dado/Quando/Então. | Corrigidos termos genéricos para ficarem alinhados ao contexto do campus de Itapecuru-Mirim e eliminados exemplos do modelo anterior. | Grupo completo |

---

# 5. Espaço Reservado para Próximas Etapas

As seções abaixo serão preenchidas nas próximas aulas. Por enquanto, ficam apenas os títulos.

## 5.1 Atores do sistema
[preencher nas próximas aulas]

## 5.2 Casos de uso
[preencher nas próximas aulas]

## 5.3 Descrição detalhada dos casos de uso
[preencher nas próximas aulas]

## 5.4 Diagramas

| Diagrama | Status | Arquivo previsto |
|---|---|---|
| Diagrama de casos de uso | Pendente | `diagramas/casos_de_uso.puml` |
| Diagrama de atividades | Pendente | `diagramas/atividades.puml` |
| Diagrama de classes | Pendente | `diagramas/classes.puml` |
| Diagrama de sequência | Pendente | `diagramas/sequencia.puml` |

---

# 6. Pendências Gerais

| ID | Pendência ou dúvida | Quem deve validar | Prazo previsto |
|---|---|---|---|
| P001 | Definir se a aplicação consumirá a biblioteca Leaflet com OpenStreetMap (gratuito) ou API do Google Maps. | Integrantes do Grupo / Professor Thales | Próxima aula prática |
| P002 | Validar se o escopo geográfico coletado ficará restrito à região de Itapecuru-Mirim ou expandirá para todo o Maranhão nesta primeira entrega. | Grupo / Comunidades locais parceiras | Próxima aula prática |

---

## Declaração do grupo

Declaramos que esta versão D0 foi elaborada com base nas atividades realizadas em sala, nas discussões do grupo e no uso responsável de IA generativa. O grupo revisou o conteúdo, corrigiu sugestões inadequadas e assume responsabilidade pelas informações registradas.

**Integrantes:** - Maria Eduarda  
- Elizana  
- Fernando  
- Juliana Pires  
- Beatriz Campelo  

**Data:** 08/07/2026