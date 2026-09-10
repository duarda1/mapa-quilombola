# Seed sintético

O arquivo `seed.json` contém dados fictícios normalizados conforme `database/schema.dbml`.

O projeto usa SQLite como banco local. O script cria ou recria as tabelas, ativa as chaves estrangeiras, carrega o `seed.json` e valida as contagens:

```bash
python database/seed/validate_seed.py
```

O banco gerado fica em `database/mapa_quilombola.db`. Cada execução recria as tabelas para manter o banco exatamente igual ao `seed.json` atual.

## Ordem de carga

1. `municipios`
2. `comunidades`
3. `territorios`
4. `atividades`
5. `documentos`

Todos os IDs e relacionamentos foram conferidos contra o schema atual. O arquivo `seed.json` não é alterado pelo script.
