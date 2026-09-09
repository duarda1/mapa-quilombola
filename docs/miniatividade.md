# Miniatividade: Casos de Uso Detalhados
## Disciplina: Modelagem de Sistemas
### Instituto Federal do Maranhão (IFMA) - Campus Itapecuru-Mirim

---

## 👥 Identificação do Grupo
* **Componentes:**
  * Beatriz Campelo
  * Julyana Pires
  * Fernando Brandão
  * Maria Eduarda
  * Elizana de Sousa
* **Tema do Sistema:** Mapa Quilombola - Sistema de Mapeamento, Geolocalização e Gestão de Comunidades Quilombolas

---

## 1. Requisito Funcional (RF) Selecionado
* **Código:** RF-001
* **Nome:** Cadastrar Comunidade Quilombola
* **Descrição:** O sistema deve permitir o cadastramento de comunidades quilombolas, coletando dados demográficos, históricos e coordenadas geográficas (latitude e longitude) para exibição no mapa.

---

## 2 & 3. Dicionário de Dados (v1)
Tabela contendo o mapeamento dos dados identificados e utilizados pelo requisito funcional selecionado.

| Nome do Campo | Tipo de Dado | Tamanho / Formato | Descrição | Obrigatoriedade |
| :--- | :--- | :--- | :--- | :--- |
| `id_comunidade` | Inteiro | Auto-incremento | Identificador único da comunidade no banco de dados. | Obrigatório |
| `nome_comunidade`| Texto | 120 caracteres | Nome oficial ou pelo qual a comunidade é reconhecida. | Obrigatório |
| `municipio` | Texto | 80 caracteres | Município maranhense onde a comunidade está localizada. | Obrigatório |
| `latitude` | Decimal | `99.999999` | Coordenada geográfica de latitude para o mapa. | Obrigatório |
| `longitude` | Decimal | `99.999999` | Coordenada geográfica de longitude para o mapa. | Obrigatório |
| `qtd_familias` | Inteiro | Numérico | Quantidade estimada de famílias residentes. | Opcional |
| `certificada` | Booleano | `Sim / Não` | Indica se possui certificação da Fundação Cultural Palmares. | Obrigatório |
| `data_registro` | Data/Hora | `DD/MM/AAAA HH:MM`| Registro automático do momento do cadastro no sistema. | Obrigatório |

---

## 4. Lista de Casos de Uso Candidatos
Com base no escopo do projeto *Mapa Quilombola*, foram mapeados 3 casos de uso candidatos:
1. **UC-001:** Cadastrar Comunidade Quilombola *(Selecionado para detalhamento)*
2. **UC-002:** Consultar Comunidades no Mapa (Filtros por Município/Certificação)
3. **UC-003:** Atualizar Dados Socioeconômicos da Comunidade

---

## 5. Detalhamento do Caso de Uso (UC-001)

| Campo | Detalhamento Técnico |
| :--- | :--- |
| **Caso de Uso** | UC-001: Cadastrar Comunidade Quilombola |
| **Ator Principal** | Administrador / Pesquisador |
| **Objetivo** | Incluir uma nova comunidade quilombola na base de dados georreferenciada para visualização pública no mapa. |
| **RF Relacionado** | RF-001 |
| **Pré-condição** | O usuário deve estar autenticado no sistema com perfil de pesquisador ou administrador. |
| **Pós-condição** | A comunidade é registrada na base de dados e passa a ficar disponível para plotagem no mapa do sistema. |
| **Dados Usados** | `nome_comunidade`, `municipio`, `latitude`, `longitude`, `qtd_familias`, `certificada`, `data_registro`. |

### 🔄 Fluxo de Eventos

#### A. Fluxo Básico (Caminho Feliz)
1. O actor acessa o painel administrativo, entra no menu "Comunidades" e clica em "Adicionar Nova".
2. O sistema exibe o formulário de cadastro de comunidade.
3. O ator preenche o nome da comunidade, município, seleciona o status da certificação e digita as coordenadas (`latitude` e `longitude`).
4. O ator clica no botão "Salvar Cadastro".
5. O sistema valida se todos os campos obrigatórios foram preenchidos.
6. O sistema valida se as coordenadas geográficas informadas estão dentro de um intervalo matemático válido.
7. O sistema consulta o banco de dados e verifica que não existe nenhuma comunidade cadastrada com o mesmo nome no mesmo município.
8. O sistema persiste os dados no banco de dados, gerando o `id_comunidade` e carimbando a `data_registro`.
9. O sistema exibe a mensagem de sucesso: *"Comunidade cadastrada e mapeada com sucesso!"*.
10. O sistema redireciona o ator para a listagem de comunidades.

#### B. Fluxos Alternativos e de Exceção

##### FA01 - Dados Obrigatórios Ausentes (No passo 5)
1. O sistema identifica a ausência de um ou mais dados obrigatórios (ex: sem coordenadas ou sem nome).
2. O sistema impede o salvamento e realça os campos vazios.
3. O sistema exibe o alerta: *"Erro: Os campos Nome, Município, Latitude e Longitude são obrigatórios."*
4. O sistema retorna ao passo 3 do Fluxo Básico.

##### FA02 - Coordenadas Inválidas (No passo 6)
1. O sistema identifica que os valores de latitude ou longitude digitados estão fora dos limites geográficos padrão (ex: valores impossíveis para a região).
2. O sistema exibe o erro: *"Coordenadas inválidas. Por favor, insira valores corretos de Latitude/Longitude."*
3. O sistema retorna ao passo 3 do Fluxo Básico mantendo os dados para correção.

##### FA03 - Comunidade Já Cadastrada (No passo 7)
1. O sistema detecta que já existe uma comunidade com exatamente o mesmo nome registrada para aquele município.
2. O sistema exibe a mensagem de aviso: *"Conflito: Uma comunidade com este nome já está cadastrada neste município."*
3. O sistema bloqueia a duplicação e retorna ao passo 3 do Fluxo Básico.

### ⚠️ Regras de Negócio (RN)
* **RN01 - Bloqueio de Duplicidade:** Não será permitido o cadastro de duas comunidades com o mesmo nome vinculadas ao mesmo município.
* **RN02 - Geolocalização Obrigatória:** Nenhuma comunidade pode ser salva no sistema sem um par válido de coordenadas GPS (`latitude` e `longitude`).

### ✅ Critérios de Aceitação (CA)
* **CA01:** O sistema deve plotar o pin da comunidade no mapa imediatamente após a confirmação do cadastro bem-sucedido.
* **CA02:** O campo de preenchimento da quantidade de famílias deve aceitar apenas caracteres numéricos inteiros e positivos.

---

## 💡 Exemplo Prático de Preenchimento (Dados de Teste)
Abaixo apresenta-se um exemplo de dados simulados (fictícios) mapeados na região de Itapecuru-Mirim para validar as regras do formulário:

| Campo do Dicionário | Dado de Exemplo para Teste |
| :--- | :--- |
| **Nome da Comunidade** | Quilombo Santa Rosa dos Pretos |
| **Município** | Itapecuru-Mirim |
| **Latitude** | `-3.418723` |
| **Longitude** | `-44.359145` |
| **Qtd. de Famílias** | `150` |
| **Certificada (Palmares)**| Sim |

---

## 🤖 Log de Uso da IA
* **Ferramenta Utilizada:** Gemini (Google)
* **Prompts Enviados pelo Grupo:**
  1. *"Ajude-nos a estruturar a miniatividade de Casos de Uso Detalhados com base na imagem do slide da aula de Modelagem de Sistemas do IFMA."*
  2. *"Gere o template completo em Markdown contendo a estrutura da entrega adaptando-o totalmente para o nosso tema real que é o projeto Mapa Quilombola."*
  3. *"Inclua um exemplo prático de preenchimento com dados simulados no final do markdown."*
* **Análise de Contribuição:** A IA auxiliou o grupo a converter o modelo conceitual abstrato da aula em um cenário prático voltado ao projeto real da equipe (Mapeamento Quilombola). Ela estruturou com precisão o dicionário de dados geográficos, os fluxos de exceção para validação de coordenadas e forneceu massa de dados de teste coerente com a região, acelerando a entrega do documento técnico formatado.