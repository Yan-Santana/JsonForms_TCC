#!/bin/bash

echo "Verificando detalhes dos usuários..."
echo "----------------------------------------"

# Executa o script SQL
docker exec -i jsonforms_test-postgres-1 psql -U postgres -d jsonforms_analytics < scripts/check-users.sql

echo "----------------------------------------" 