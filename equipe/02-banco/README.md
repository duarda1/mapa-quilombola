# 🗄️ Aluno 2 — Banco de Dados

## 🎯 Sua missão

Você vai definir **como o sistema guarda as informações**.

Sua primeira entrega é um modelo em **DBML**, visualizado pelo dbdiagram.

Você NÃO precisa esperar o Aluno 1 terminar.

Comece pelo projeto original e depois confira sua solução quando os
"combinados" do Aluno 1 ficarem prontos.

---

# 🌿 Sua branch

```bash
git switch main
git pull
git switch -c feat/banco
```

---

# 📥 O que enviar ao Gemini no começo

Envie:

1. ZIP do projeto original/atual;
2. prompt abaixo.

Se já estiver disponível, envie também:

```text
docs/01_context/project.md
docs/02_requirements/requirements.md
```

Mas **não espere por esses arquivos**.

---

# 🤖 Prompt pronto para o Gemini

```text
<INSTRUCOES>

Você é responsável SOMENTE pelo BANCO DE DADOS deste projeto.

Analise os arquivos enviados e descubra quais informações precisam ser guardadas.

Preserve o objetivo e a tecnologia já existentes.

Não crie frontend.
Não crie backend.
Não invente funcionalidades extras.
Não altere arquivos fora de:
- diagrams/database/
- database/

Use nomes claros, curtos e consistentes.

Explique as decisões em linguagem simples.

</INSTRUCOES>

<CONTEXTO>

Outros estudantes estão criando frontend, backend, dados e documentação
ao mesmo tempo.

Sua primeira versão não precisa esperar por eles.

Quando outras partes ficarem prontas, seu modelo será comparado e ajustado
somente se necessário.

</CONTEXTO>

<DADOS>

Analise:
- README;
- requisitos;
- documentos;
- código já existente;
- dados presentes no ZIP.

Identifique:
1. principais tipos de informação;
2. campos de cada tipo;
3. identificadores;
4. quais informações se relacionam;
5. campos obrigatórios;
6. campos opcionais.

</DADOS>

<SAIDA>

Produza:

1. diagrams/database/schema.dbml

O DBML deve:
- abrir no dbdiagram;
- possuir tabelas;
- chaves primárias;
- chaves estrangeiras;
- relacionamentos;
- tipos adequados;
- campos obrigatórios quando fizer sentido.

2. database/README.md

Explique:
- o que cada tabela representa;
- principais relacionamentos;
- decisões importantes;
- dúvidas.

3. Se a tecnologia do projeto permitir e for seguro gerar:
database/schema.sql OU migrations iniciais.

Não invente uma tecnologia nova se o projeto já tiver uma definida.

4. database/BANCO_STATUS.md

Use:

DONE
PARTIAL
BLOCKED

e liste o que ainda precisa ser conferido com Frontend, Backend ou organização.

</SAIDA>
```

---

# 🧪 Passo obrigatório

Abra:

```text
diagrams/database/schema.dbml
```

no preview do dbdiagram.

Confirme:

- [ ] o diagrama abre;
- [ ] não há erro de sintaxe;
- [ ] relacionamentos aparecem.

---

# ✅ Sua primeira versão terminou

Marque:

```text
✅ PRONTO PARA JUNTAR
```

---

# 🔗 Terminou? Procure quem também terminou.

## 🎨 Frontend pronto?

Compare:

```text
campos dos formulários
       ↕
campos das tabelas
```

Não conectem frontend diretamente ao banco.

A ideia aqui é apenas verificar se as informações combinam.

### Contexto para o Gemini

Envie:

```text
schema.dbml
+
tela/formulário relevante do frontend
```

Peça:

> Compare somente os campos. Não reescreva frontend nem banco. Liste incompatibilidades e proponha a menor correção.

---

## 🧠 Dados prontos?

Entregue:

```text
schema.dbml
```

ao Aluno 3.

Testem se os dados respeitam os campos e relacionamentos.

---

## ⚙️ Backend pronto?

Entregue:

```text
schema.dbml
database/
```

Tentem:

1. criar o banco;
2. conectar backend;
3. salvar 1 registro;
4. consultar 1 registro.

---

## 🧭 Organização ficou pronta depois?

Envie ao Gemini:

```text
schema.dbml
docs/04_architecture/combinados.md
```

Peça:

> Compare sem recomeçar. Ajuste apenas incompatibilidades necessárias.

---

# 💾 Salve sua parte

```bash
git add diagrams/database/ database/
git commit -m "feat(banco): cria modelo de dados"
git push -u origin feat/banco
```

---

# 🆘 Chame o professor se

- não souber se algo é uma tabela ou apenas um campo;
- o Gemini criar dezenas de tabelas para um MVP pequeno;
- o frontend e o banco precisarem de mudanças grandes para combinar;
- houver dúvida sobre dados pessoais/sensíveis.
