#!/bin/bash

# Carrega as variáveis de ambiente do arquivo .env
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Verifica se o container do PostgreSQL está rodando
if [ -z "$(docker ps -q -f name=jsonforms_test-postgres-1)" ]; then
    echo "O container do PostgreSQL não está rodando. Inicie os containers com 'docker compose up' primeiro."
    exit 1
fi

echo "Verificando usuários no banco de dados..."
echo "----------------------------------------"

# Executa o comando SQL para listar os usuários
docker exec -it jsonforms_test-postgres-1 psql -U postgres -d jsonforms_analytics -c "SELECT * FROM \"user\";"

echo "----------------------------------------"
echo "Consulta concluída!" 