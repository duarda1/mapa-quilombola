# 🧭 Aluno 1 — Organização e combinados do sistema

## 🎯 Sua missão

Você vai ajudar a equipe a responder quatro perguntas:

1. Qual problema o sistema resolve?
2. O que PRECISA funcionar hoje?
3. Quais informações principais existem?
4. Como as partes criadas pelos colegas precisam combinar?

Você **não é responsável por programar frontend, backend ou banco**.

---

# 🌿 Sua branch

```bash
git switch main
git pull
git switch -c feat/organizacao
```

---

# 📥 O que enviar ao Gemini no começo

Envie:

- o ZIP do projeto original/atual;
- o prompt abaixo.

Não espere Banco, Frontend ou Backend terminarem.

Todos estão trabalhando ao mesmo tempo.

---

# 🤖 Prompt pronto para o Gemini

Copie exatamente:

```text
<INSTRUCOES>

Você é o responsável por ORGANIZAR um projeto de sistema Web que será desenvolvido
por estudantes em apenas 180 minutos.

Analise os arquivos enviados e NÃO reescreva o projeto inteiro.

Sua tarefa é transformar o contexto existente em orientações curtas e objetivas
para que Banco, Dados, Backend e Frontend consigam trabalhar em paralelo.

Não implemente frontend.
Não implemente backend.
Não gere banco completo.
Não invente funcionalidades que não estejam justificadas pelo projeto.

Se o projeto já possuir requisitos, casos de uso ou documentação,
preserve o conteúdo e apenas organize/resuma o necessário para o MVP.

Use linguagem simples, adequada a estudantes que ainda estão aprendendo
arquitetura de sistemas.

</INSTRUCOES>

<CONTEXTO>

Temos somente 180 minutos.

Outros alunos já estão trabalhando simultaneamente em:
- banco;
- dados sintéticos;
- backend;
- frontend;
- integração.

Eles NÃO estão esperando sua resposta.

Quando seus arquivos ficarem prontos, eles serão usados para conferir
e ajustar o que já foi produzido.

</CONTEXTO>

<DADOS>

Analise o ZIP enviado.

Identifique:
- objetivo do projeto;
- público;
- informações principais;
- funcionalidades já previstas;
- tecnologias já presentes;
- documentos existentes;
- 3 a 5 fluxos essenciais para uma demonstração.

</DADOS>

<SAIDA>

Produza somente estes arquivos:

1. docs/01_context/project.md

Deve conter:
- nome do projeto;
- problema;
- público;
- objetivo;
- tecnologias já existentes;
- resumo em até 20 linhas.

2. docs/02_requirements/requirements.md

Crie duas listas:
- PRECISA FUNCIONAR HOJE;
- PODE FICAR PARA DEPOIS.

Mantenha o MVP pequeno.

3. docs/03_use_cases/use_cases.md

Descreva de 3 a 5 fluxos simples.

Formato:

FLUXO:
Quem usa:
O que faz:
O que informa:
O que espera ver no final:

4. docs/04_architecture/combinados.md

Não use jargão desnecessário.

Crie uma tabela:

Funcionalidade
| Tela necessária
| Informações usadas
| O servidor precisa fazer
| O banco precisa guardar

Depois crie uma seção:

NOMES QUE TODOS DEVEM USAR

Liste os principais nomes de campos e entidades que devem ser iguais entre
Banco, Backend e Frontend.

5. docs/04_architecture/ORGANIZACAO_STATUS.md

Informe:
- o que foi encontrado;
- decisões adotadas;
- dúvidas;
- pontos que precisam ser conferidos com o que os colegas já produziram.

Não altere arquivos fora de docs/.

</SAIDA>
```

---

# 📦 O que você deve entregar

```text
docs/
├── 01_context/project.md
├── 02_requirements/requirements.md
├── 03_use_cases/use_cases.md
└── 04_architecture/
    ├── combinados.md
    └── ORGANIZACAO_STATUS.md
```

---

# ✅ Sua primeira versão está pronta quando

- o projeto está explicado em poucas linhas;
- existem no máximo 5 fluxos principais;
- está claro o que entra no MVP;
- existe uma lista de nomes que os colegas podem conferir.

Marque em `EQUIPE_STATUS.md`:

```text
✅ PRONTO PARA JUNTAR
```

---

# 🔗 Terminou? Não espere.

## Se Banco já estiver pronto

Envie ao Gemini:

```text
combinados.md
schema.dbml
```

Peça:

> Compare os nomes e informações. Liste apenas incompatibilidades e a menor correção necessária.

## Se Frontend já estiver pronto

Envie:

```text
combinados.md
FRONTEND_STATUS.md
telas/formulários principais
```

Confira se as telas cobrem os fluxos essenciais.

## Se Backend já estiver pronto

Envie:

```text
combinados.md
API_GUIDE.md
```

Confira se o servidor permite realizar os fluxos essenciais.

---

# 💾 Salve sua parte

```bash
git add docs/
git commit -m "docs: organiza MVP e combinados do sistema"
git push -u origin feat/organizacao
```

---

# 🆘 Chame o professor se

- o contexto tiver dois objetivos muito diferentes;
- não estiver claro qual é o MVP;
- a documentação contradizer o sistema existente;
- uma decisão puder mudar muito o trabalho dos outros alunos.
