INSERT INTO users (
    name, email, password, "groupId", "totalTimeSpent", "firstAttemptTime",
    "codeErrors", "formErrors", "totalSubmissions", "schemaEdits", "uiSchemaEdits",
    "errorCount", "codeResets", "createdAt", "updatedAt"
) VALUES
('João Silva', 'joao.silva@teste.com', '$2b$10$uQw1Qw1Qw1Qw1Qw1Qw1QwOQw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1', 'Grupo A', 180000, 45000, 2, 1, 3, 5, 3, 8, 2, NOW(), NOW()),
('Maria Santos', 'maria.santos@teste.com', '$2b$10$uQw1Qw1Qw1Qw1Qw1Qw1QwOQw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1', 'Grupo B', 240000, 60000, 1, 0, 2, 3, 2, 5, 1, NOW(), NOW()),
('Pedro Oliveira', 'pedro.oliveira@teste.com', '$2b$10$uQw1Qw1Qw1Qw1Qw1Qw1QwOQw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1', 'Grupo A', 300000, 90000, 3, 2, 4, 7, 4, 12, 3, NOW(), NOW()),
('Ana Costa', 'ana.costa@teste.com', '$2b$10$uQw1Qw1Qw1Qw1Qw1Qw1QwOQw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1', 'Grupo B', 150000, 30000, 0, 0, 1, 2, 1, 3, 0, NOW(), NOW()),
('Carlos Ferreira', 'carlos.ferreira@teste.com', '$2b$10$uQw1Qw1Qw1Qw1Qw1Qw1QwOQw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1', 'Grupo A', 420000, 120000, 4, 3, 5, 9, 6, 15, 4, NOW(), NOW()),
('Lucia Rodrigues', 'lucia.rodrigues@teste.com', '$2b$10$uQw1Qw1Qw1Qw1Qw1Qw1QwOQw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1', 'Grupo B', 200000, 75000, 1, 1, 2, 4, 2, 7, 2, NOW(), NOW()),
('Roberto Almeida', 'roberto.almeida@teste.com', '$2b$10$uQw1Qw1Qw1Qw1Qw1Qw1QwOQw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1', 'Grupo A', 360000, 105000, 2, 1, 3, 6, 3, 10, 2, NOW(), NOW()),
('Fernanda Lima', 'fernanda.lima@teste.com', '$2b$10$uQw1Qw1Qw1Qw1Qw1Qw1QwOQw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1', 'Grupo B', 180000, 50000, 0, 0, 1, 2, 1, 4, 1, NOW(), NOW()),
('Marcos Pereira', 'marcos.pereira@teste.com', '$2b$10$uQw1Qw1Qw1Qw1Qw1Qw1QwOQw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1', 'Grupo A', 480000, 150000, 3, 2, 4, 8, 5, 14, 3, NOW(), NOW()),
('Juliana Martins', 'juliana.martins@teste.com', '$2b$10$uQw1Qw1Qw1Qw1Qw1Qw1QwOQw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1', 'Grupo B', 220000, 80000, 1, 1, 2, 3, 2, 6, 1, NOW(), NOW()); 


/* 
Copie o arquivo para dentro do container:

   - docker cp scripts/insert-users.sql jsonforms_test-postgres-1:/insert-users.sql

Execute o script no banco:

   - docker exec -it jsonforms_test-postgres-1 psql -U postgres -d jsonforms_analytics -f /insert-users.sql

Verifique os dados:

   - docker exec -it jsonforms_test-postgres-1 psql -U postgres -d jsonforms_analytics -c "SELECT id, name, email, \"groupId\" FROM users;"

 */