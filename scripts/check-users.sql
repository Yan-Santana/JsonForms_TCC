-- Mostra todos os usuários com todas as colunas
SELECT 
    id,
    name,
    email,
    "group",
    "createdAt",
    "updatedAt"
FROM "user"
ORDER BY "createdAt" DESC; 