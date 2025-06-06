# Backend do JsonForms

Este é o backend do projeto JsonForms, desenvolvido com Node.js, TypeScript, Express e PostgreSQL.

## Estrutura do Projeto

```
src/
  ├── config/         # Configurações do projeto
  ├── controllers/    # Controladores da aplicação
  ├── entities/       # Entidades do banco de dados
  ├── middlewares/    # Middlewares da aplicação
  ├── repositories/   # Repositórios para acesso ao banco
  ├── routes/         # Rotas da API
  ├── services/       # Serviços da aplicação
  ├── types/          # Definições de tipos
  └── index.ts        # Arquivo principal
```

## Requisitos

- Node.js (v14 ou superior)
- PostgreSQL (v12 ou superior)
- npm ou yarn

## Instalação

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env`
   - Ajuste as variáveis conforme necessário

## Executando o Projeto

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

## API Endpoints

### Autenticação

- `POST /api/auth/register` - Registra um novo usuário
- `POST /api/auth/login` - Autentica um usuário
- `GET /api/auth/profile` - Retorna os dados do usuário autenticado

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- TypeORM
- PostgreSQL
- JWT para autenticação
- bcrypt para hash de senhas 