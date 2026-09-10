# 🎨 Aluno 5 — Frontend / Telas

## 🎯 Sua missão

Você vai construir a parte que o usuário vê:

- páginas;
- botões;
- formulários;
- listas;
- mensagens.

Você **não precisa esperar o backend**.

Use dados de exemplo no começo.

Quando o backend ficar pronto, troque os exemplos pela API real **uma tela por vez**.

---

# 🌿 Sua branch

```bash
git switch main
git pull
git switch -c feat/frontend
```

---

# 📥 O que enviar ao Gemini no começo

Envie:

1. ZIP do projeto original/atual;
2. prompt abaixo.

Se já houver documentação do Aluno 1, pode enviar junto.

Não espere.

---

# 🤖 Prompt pronto para o Gemini

```text
<INSTRUCOES>

Você é responsável SOMENTE pelo FRONTEND deste projeto.

Frontend é a parte visual utilizada pelo usuário.

Preserve a tecnologia existente.

Se já há frontend, continue a estrutura existente.
Se não há frontend, use a opção mais simples compatível com o projeto
e explique a escolha em até 3 linhas.

Não crie backend.
Não crie banco.
Não altere arquivos de outros alunos.
Não invente funcionalidades extras.

Crie somente as telas necessárias para demonstrar o MVP.

</INSTRUCOES>

<CONTEXTO>

Backend, banco e dados sintéticos estão sendo feitos em paralelo.

Não espere por eles.

Enquanto a API real não estiver pronta:
- use dados de exemplo;
- mantenha esses dados fáceis de substituir.

Centralize as chamadas ao servidor em:
frontend/src/services/
ou pasta equivalente da tecnologia existente.

Não espalhe chamadas HTTP por todas as páginas.

</CONTEXTO>

<DADOS>

Analise o projeto e escolha as telas mínimas.

Prioridade:
1. tela inicial/listagem;
2. detalhes, se necessário;
3. cadastro;
4. edição somente se essencial;
5. recursos extras ficam para depois.

Implemente também:
- carregando;
- erro;
- lista vazia;
quando for simples.

</DADOS>

<SAIDA>

Produza:

1. frontend/ com código executável;
2. frontend/FRONTEND_STATUS.md;
3. frontend/README.md com comandos para executar.

FRONTEND_STATUS.md deve listar cada tela:

DONE
MOCK
API
BLOCKED

Informe:
- quais telas usam dados de exemplo;
- quais já usam servidor;
- quais campos cada formulário usa.

Não altere arquivos fora de frontend/.

</SAIDA>
```

---

# ✅ Primeira versão pronta

Quando as telas principais abrirem e usarem dados de exemplo:

```text
✅ PRONTO PARA JUNTAR
```

Você NÃO precisa esperar a API real para marcar isso.

---

# 🔗 Terminou? Integre.

## 🗄️ Banco pronto?

Compare formulários com:

```text
schema.dbml
```

Verifique se:

- campos existem;
- nomes fazem sentido;
- informações obrigatórias podem ser preenchidas.

Não conecte frontend diretamente ao banco.

---

## 🧠 Dados sintéticos prontos?

Troque os dados improvisados por:

```text
data/synthetic/mock_data.json
```

ou adapte seu mock ao mesmo formato.

---

## ⚙️ Backend pronto?

Pegue:

```text
backend/API_GUIDE.md
```

Integre **uma tela por vez**.

### Ordem

```text
listagem
↓
detalhes
↓
cadastro
↓
edição
```

Depois de cada tela:

1. execute;
2. clique;
3. veja a resposta;
4. só então passe para a próxima.

---

## 🧭 Organização pronta?

Compare suas telas com:

```text
docs/02_requirements/requirements.md
docs/03_use_cases/use_cases.md
```

Não crie novas telas só porque apareceu uma ideia.

Apenas confirme se o MVP principal está coberto.

---

# 💾 Salve

```bash
git add frontend/
git commit -m "feat(frontend): cria telas principais"
git push -u origin feat/frontend
```

---

# 🆘 Chame o professor se

- houver muitas telas e não souber quais cortar;
- o Gemini quiser refazer todo o design;
- frontend e backend usam formatos muito diferentes;
- perder mais de 10 minutos em detalhe visual que não impede a demo.
