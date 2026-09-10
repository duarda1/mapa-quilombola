# 🧠 Aluno 3 — Dados Sintéticos / Dados de Exemplo

## 🎯 Sua missão

Você vai criar **dados fictícios para o sistema parecer vivo e poder ser testado**.

Você pode começar antes do banco ficar pronto.

Primeiro faça os dados em JSON.

Quando o `schema.dbml` aparecer, adapte os dados e gere o seed.

---

# 🌿 Sua branch

```bash
git switch main
git pull
git switch -c feat/dados
```

---

# 📥 O que enviar ao Gemini no começo

Envie:

- ZIP do projeto original/atual;
- prompt abaixo.

Se o Aluno 1 já tiver terminado, envie também:

```text
docs/01_context/project.md
docs/02_requirements/requirements.md
```

Não espere.

---

# 🤖 Prompt pronto para o Gemini

```text
<INSTRUCOES>

Você é responsável SOMENTE pelos DADOS SINTÉTICOS deste projeto.

Dados sintéticos são dados inventados exclusivamente para:
- desenvolvimento;
- teste;
- demonstração.

Eles nunca devem ser apresentados como dados reais.

Não crie frontend.
Não crie backend.
Não mude o objetivo do projeto.
Não altere o banco.

Trabalhe somente em:
- data/synthetic/
- database/seed/

</INSTRUCOES>

<CONTEXTO>

O banco pode ainda não estar pronto.

Por isso trabalhe em duas etapas:

ETAPA A:
criar dados de exemplo em JSON a partir do contexto do projeto.

ETAPA B:
quando schema.dbml estiver disponível, adaptar os dados ao banco real
e gerar um seed compatível com a tecnologia do projeto.

</CONTEXTO>

<DADOS>

Analise o projeto e descubra quais dados são necessários para demonstrar
os principais fluxos.

Crie variedade suficiente para:
- listagem;
- busca/filtro, se existir;
- detalhes;
- cadastro;
- situações com campo opcional vazio;
- pelo menos um caso de borda válido.

Não gere milhares de registros.

Prefira poucos dados bons.

REGRAS IMPORTANTES:

Se for MAPA DE MEMÓRIAS QUILOMBOLAS:
- não invente relatos sobre pessoas reais como se fossem verdadeiros;
- não atribua fatos históricos fictícios a comunidades reais;
- marque claramente conteúdo fictício como SINTÉTICO ou DEMONSTRATIVO;
- evite dados pessoais desnecessários.

Se for EDA:
- não faça dados sintéticos parecerem registros acadêmicos reais de estudantes;
- não use CPF, matrícula real, nome completo real ou dados sensíveis;
- identifique o conjunto como SINTÉTICO.

</DADOS>

<SAIDA>

ETAPA A:

1. data/synthetic/mock_data.json
2. data/synthetic/DADOS_STATUS.md

DADOS_STATUS deve explicar:
- que tipos de dados foram criados;
- quantos;
- quais fluxos eles permitem demonstrar;
- o que ainda depende do banco.

Quando schema.dbml estiver disponível:

ETAPA B:

3. adapte mock_data.json ao schema;
4. gere database/seed/seed.* no formato adequado ao projeto;
5. gere database/seed/README.md explicando como executar;
6. valide IDs, relacionamentos e campos obrigatórios.

Não invente comandos que não funcionem com a stack existente.

</SAIDA>
```

---

# ✅ Primeira versão pronta

Assim que `mock_data.json` existir e estiver coerente:

```text
✅ PRONTO PARA JUNTAR
```

Você não precisa esperar o seed final.

---

# 🔗 Terminou? Veja o que já está pronto.

## 🗄️ Banco pronto?

Pegue:

```text
database/schema.dbml
```

Envie ao seu Gemini junto com:

```text
data/synthetic/mock_data.json
```

Peça:

> Adapte os dados ao schema sem alterar o schema. Valide campos obrigatórios, IDs e relacionamentos. Depois gere o seed.

---

## 🎨 Frontend pronto?

Entregue:

```text
mock_data.json
```

ao Aluno 5.

Ele pode usar esses dados enquanto o backend ainda não estiver conectado.

---

## ⚙️ Backend pronto?

Entregue:

```text
mock_data.json
database/seed/
```

para testar respostas reais da API.

---

# 💾 Salve sua parte

```bash
git add data/synthetic/ database/seed/
git commit -m "feat(dados): adiciona dados sinteticos para demonstracao"
git push -u origin feat/dados
```

---

# 🆘 Chame o professor se

- não souber se um dado pode parecer informação real;
- o projeto envolver dados sensíveis;
- o seed quebrar relacionamentos;
- o Gemini sugerir copiar dados pessoais reais apenas para preencher o banco.
