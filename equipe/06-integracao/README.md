# 🔗 Aluno 6 — Integração e Testes

## 🎯 Sua missão

Você é a pessoa que ajuda as partes a **funcionarem juntas**.

Você não deve esperar todos terminarem.

Seu trabalho começa no primeiro minuto.

Você acompanha:

```text
Banco
Dados
Backend
Frontend
Documentação
```

e ajuda a encontrar diferenças.

Você **não deve reescrever o sistema inteiro**.

---

# 🌿 Sua branch

Crie a branch que receberá as integrações:

```bash
git switch main
git pull
git switch -c integracao
git push -u origin integracao
```

---

# 📥 O que enviar ao Gemini no começo

Envie:

- ZIP do projeto original;
- este prompt.

---

# 🤖 Prompt inicial — preparar a integração

```text
<INSTRUCOES>

Você é responsável pela INTEGRAÇÃO E TESTES de um sistema Web construído
por vários estudantes em paralelo.

Não implemente um novo sistema.

Sua tarefa é:
- entender o projeto;
- preparar testes simples;
- comparar partes conforme elas ficarem prontas;
- encontrar incompatibilidades;
- apontar quem deve corrigir.

Não altere silenciosamente o trabalho de outros alunos.

</INSTRUCOES>

<CONTEXTO>

Temos somente 180 minutos.

As partes ficarão prontas em momentos diferentes.

Sempre que duas partes puderem ser conferidas ou conectadas,
faça uma integração imediatamente.

Não espere a integração final.

</CONTEXTO>

<DADOS>

Analise o ZIP original.

Identifique os 3 a 5 fluxos mais importantes.

</DADOS>

<SAIDA>

Produza:

tests/integration/checklist.md

Para cada fluxo:

FLUXO:
PASSOS:
RESULTADO ESPERADO:
STATUS: PENDENTE

Também produza uma lista inicial de riscos em:

tests/integration/INTEGRATION_STATUS.md

Não crie frontend, backend ou banco novo.

</SAIDA>
```

---

# 📋 Durante toda a manhã

Acompanhe:

```text
EQUIPE_STATUS.md
```

Quando alguém marcar:

```text
✅ PRONTO PARA JUNTAR
```

veja imediatamente se existe outra parte compatível.

---

# 🔀 Como juntar branches

Antes de integrar uma branch:

```bash
git switch integracao
git pull
git fetch origin
```

Exemplo Banco:

```bash
git merge origin/feat/banco
```

Depois:

```bash
git push origin integracao
```

Faça isso uma branch por vez.

Se houver conflito:

> 🛑 Não escolha arquivos aleatoriamente.

Descubra quem é o dono da parte e resolvam juntos.

---

# 🤖 Prompt para CADA pequena integração

Sempre que duas ou mais partes estiverem prontas, use:

```text
<INSTRUCOES>

Você é o integrador.

Analise SOMENTE os arquivos enviados nesta rodada.

Não reescreva o sistema.
Não adicione funcionalidades.
Não mude a tecnologia.

Primeiro encontre incompatibilidades.

Para cada problema informe:

GRAVIDADE:
- BLOQUEIA
- ALTO
- MEDIO
- BAIXO

PARTE:
PROBLEMA:
ESPERADO:
ENCONTRADO:
QUEM DEVE CORRIGIR:
MENOR CORRECAO POSSIVEL:

Depois proponha a menor sequência de testes para confirmar a correção.

</INSTRUCOES>

<CONTEXTO>

As demais partes do projeto continuam sendo desenvolvidas em paralelo.

Esta é uma integração incremental, não a integração final.

</CONTEXTO>

<DADOS>

Os arquivos enviados representam somente as partes atualmente prontas.

</DADOS>

<SAIDA>

Não gere um novo projeto.

Produza somente:
1. lista de incompatibilidades;
2. responsável por cada uma;
3. correção mínima;
4. testes a executar;
5. resultado esperado.

</SAIDA>
```

---

# 📦 O que enviar ao Gemini em cada integração

## Banco + Frontend

```text
schema.dbml
frontend/FRONTEND_STATUS.md
tela/formulário relevante
```

## Banco + Dados

```text
schema.dbml
mock_data.json
seed.*
```

## Banco + Backend

```text
schema.dbml
backend/API_GUIDE.md
arquivos do backend que acessam o banco
```

## Backend + Frontend

```text
backend/API_GUIDE.md
frontend/src/services/
tela sendo integrada
```

## Tudo

Use o ZIP do projeto integrado, seguindo `GUIA_GEMINI.md`.

---

# 🧊 Aos 145 minutos — Feature Freeze

Avise a equipe:

> "A partir de agora, nada novo. Somente corrigir e demonstrar."

---

# 🤖 Prompt de integração final

Quando todas as partes possíveis estiverem na branch `integracao`, crie um ZIP
sem `.git`, `node_modules`, `.env`, builds e dados brutos grandes.

Envie ao Gemini:

```text
<INSTRUCOES>

Você é o INTEGRADOR FINAL.

O sistema foi desenvolvido em paralelo por vários estudantes.

NÃO crie funcionalidades novas.
NÃO troque a stack.
NÃO faça refatoração estética.
NÃO reescreva arquivos que já funcionam sem necessidade.

Sua prioridade absoluta é deixar o MVP DEMONSTRÁVEL.

</INSTRUCOES>

<CONTEXTO>

Estamos no final de uma atividade de 180 minutos.

Só podem ser corrigidos problemas que impeçam ou prejudiquem a demonstração.

</CONTEXTO>

<DADOS>

Analise o ZIP integrado.

Valide nesta ordem:

1. dependências instalam;
2. banco/schema funciona;
3. seed executa, quando existir;
4. backend inicia;
5. frontend inicia;
6. frontend consegue acessar backend;
7. pelo menos uma consulta real funciona;
8. pelo menos um cadastro real funciona, se fizer parte do MVP;
9. fluxo principal chega até o banco;
10. resultado volta para a tela.

Procure também:
- URLs erradas;
- portas diferentes;
- nomes de campos diferentes;
- CORS;
- variáveis ausentes;
- importações quebradas;
- mocks ainda usados no fluxo principal.

</DADOS>

<SAIDA>

Produza:

1. lista de BLOQUEIOS;
2. para cada bloqueio, a menor correção;
3. arquivo/camada responsável;
4. ordem exata das correções;
5. comandos para testar;
6. checklist final PASS/FAIL.

Não proponha melhorias que não sejam necessárias para a demonstração.

</SAIDA>
```

---

# 🏁 Checklist final

Antes da apresentação:

- [ ] banco inicia;
- [ ] backend inicia;
- [ ] frontend inicia;
- [ ] dados de exemplo aparecem;
- [ ] pelo menos um fluxo usa API real;
- [ ] esse fluxo consulta ou grava no banco;
- [ ] não há `.env` com segredo versionado;
- [ ] a equipe sabe quais funcionalidades ficaram de fora.

---

# 🆘 Chame o professor se

- houver conflito Git difícil;
- duas branches mudarem o mesmo arquivo importante;
- backend e frontend não conseguirem combinar após duas tentativas;
- uma correção exigir refazer grande parte do projeto;
- o sistema parar de rodar perto do feature freeze.
