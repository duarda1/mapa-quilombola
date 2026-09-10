# ⚙️ Aluno 4 — Backend / Parte do Servidor

## 🎯 Sua missão

Você vai construir a parte que:

- recebe pedidos das telas;
- valida informações;
- conversa com o banco;
- devolve resultados.

Você pode começar antes do banco estar pronto.

Se necessário, faça uma primeira versão usando dados temporários bem isolados.
Depois substitua pelo banco real.

---

# 🌿 Sua branch

```bash
git switch main
git pull
git switch -c feat/backend
```

---

# 📥 O que enviar ao Gemini no começo

Envie:

1. ZIP do projeto original/atual;
2. prompt abaixo.

Se já existirem, envie também:

```text
docs/01_context/project.md
docs/02_requirements/requirements.md
```

Não espere Banco ou Frontend.

---

# 🤖 Prompt pronto para o Gemini

```text
<INSTRUCOES>

Você é responsável SOMENTE pelo BACKEND deste projeto.

Backend é a parte do servidor responsável por:
- receber solicitações;
- validar dados;
- aplicar regras simples;
- consultar/salvar informações;
- devolver respostas ao frontend.

Preserve a tecnologia já existente no projeto.

Se já existe backend, continue a estrutura existente.
Se não existe backend, escolha a solução MAIS SIMPLES compatível com o projeto
e explique a escolha em até 3 linhas.

Não crie frontend.
Não altere arquivos de frontend.
Não altere documentação de outros alunos.
Não invente funcionalidades fora do MVP.

Trabalhe somente em backend/ e, quando necessário, em arquivos de configuração
diretamente relacionados ao backend.

</INSTRUCOES>

<CONTEXTO>

Banco e Frontend estão sendo desenvolvidos ao mesmo tempo.

Não espere por eles.

Se o banco ainda não estiver disponível:
- crie a estrutura do servidor;
- crie as operações principais;
- use dados temporários isolados apenas quando necessário;
- deixe claro onde eles deverão ser substituídos.

Quando schema.dbml chegar, adapte somente a camada de acesso aos dados.

</CONTEXTO>

<DADOS>

Analise o projeto e identifique as 3 a 5 operações mais importantes para a demo.

Exemplos:
- listar;
- consultar detalhe;
- cadastrar;
- editar;
- remover, somente se realmente necessário.

Use nomes simples e consistentes.

</DADOS>

<SAIDA>

Produza:

1. backend/ com código executável;
2. backend/.env.example, se o backend precisar de variáveis;
3. backend/API_GUIDE.md;
4. backend/BACKEND_STATUS.md.

API_GUIDE.md deve ser escrito para estudantes.

Para cada operação informe:

NOME:
ENDEREÇO:
TIPO: GET/POST/PUT/PATCH/DELETE
O QUE RECEBE:
O QUE DEVOLVE:
EXEMPLO:

BACKEND_STATUS.md deve usar:
DONE
PARTIAL
BLOCKED

Informe também:
- se usa banco real;
- se ainda usa dado temporário;
- o que precisa ser integrado.

Inclua comandos exatos para instalar e executar.

</SAIDA>
```

---

# ✅ Primeira versão pronta

Sua primeira versão está pronta quando:

- servidor inicia;
- pelo menos uma operação responde;
- existe `API_GUIDE.md`.

Marque:

```text
✅ PRONTO PARA JUNTAR
```

Mesmo que o banco ainda seja temporário.

---

# 🔗 Terminou? Junte com quem estiver pronto.

## 🗄️ Banco pronto?

Pegue:

```text
schema.dbml
database/
```

Envie ao Gemini com seu backend.

Peça:

> Substitua somente a camada temporária de dados pelo banco real. Não reescreva o backend inteiro.

Teste:

1. salvar;
2. consultar.

---

## 🎨 Frontend pronto?

Comecem por uma única tela.

Entregue:

```text
backend/API_GUIDE.md
```

ao Aluno 5.

Escolham 1 operação, por exemplo:

```text
GET /...
```

e façam funcionar.

Depois avancem.

---

## 🧠 Dados prontos?

Execute seed e teste se a API consegue devolver esses registros.

---

## 🧭 Organização pronta?

Compare:

```text
API_GUIDE.md
↕
docs/04_architecture/combinados.md
```

Corrija apenas diferenças importantes.

---

# 🧪 Thunder Client

Use o Thunder Client para testar o backend **sem esperar o frontend**.

Teste pelo menos:

- [ ] uma consulta;
- [ ] um cadastro, se fizer parte do MVP;
- [ ] erro simples de dado inválido.

---

# 💾 Salve

```bash
git add backend/
git commit -m "feat(backend): cria API inicial"
git push -u origin feat/backend
```

---

# 🆘 Chame o professor se

- o Gemini quiser trocar toda a stack;
- o servidor não iniciar após 10 minutos de correções;
- banco e backend exigirem mudanças grandes;
- aparecer autenticação complexa não essencial ao MVP.
