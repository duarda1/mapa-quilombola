# Migrações do banco

A migração `001_initial.sql` define as tabelas e restrições do SQLite do PMMQ.

Para a demonstração local, o comando recomendado continua sendo:

```powershell
python database/seed/validate_seed.py
```

Esse script recria o schema, carrega `database/seed/seed.json` e valida as contagens. O SQL desta pasta serve como referência explícita da estrutura do banco e para futuras ferramentas de migração.
