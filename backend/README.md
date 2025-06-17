# Backend - JsonForms Playground

Backend desenvolvido em NestJS, responsável pela API de formulários dinâmicos, autenticação de usuários, analytics e integração com PostgreSQL.

## 🚀 Tecnologias

- **Node.js** + **NestJS** (TypeScript)
- **TypeORM** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação e autorização
- **Docker** - Containerização
- **Swagger** - Documentação da API

## 📦 Estrutura do Projeto

```
src/
├── analytics/              # Módulo de analytics e estatísticas
│   ├── analytics.controller.ts
│   ├── analytics.service.ts
│   └── analytics.module.ts
├── auth/                   # Autenticação e autorização
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│   ├── jwt-auth.guard.ts
│   └── auth.module.ts
├── forms/                  # CRUD de formulários e submissões
│   ├── forms.controller.ts
│   ├── forms.service.ts
│   ├── forms.module.ts
│   ├── dto/               # Data Transfer Objects
│   └── entities/          # Entidades do banco
├── users/                  # Gerenciamento de usuários
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── users.module.ts
│   ├── dto/
│   └── entities/
├── submissions/            # Entidades de submissões
├── migrations/             # Migrações do banco de dados
├── dto/                    # DTOs globais
├── common/                 # Interfaces e tipos comuns
├── types/                  # Definições de tipos
├── app.module.ts           # Módulo principal
└── main.ts                 # Bootstrap da aplicação
```

## ⚙️ Como rodar

### Com Docker (recomendado)

1. **Configure as variáveis de ambiente:**

   ```bash
   # Na raiz do projeto
   cp .env.example .env
   # Edite o arquivo .env conforme necessário
   ```

2. **Execute com Docker:**

   ```bash
   docker-compose up --build
   ```

3. **Acesse:**
   - API: [http://localhost:5001/api](http://localhost:5001/api)
   - Swagger: [http://localhost:5001/api](http://localhost:5001/api)

### Manualmente

1. **Instale as dependências:**

   ```bash
   npm install
   ```

2. **Configure o arquivo `.env`:**

   ```bash
   cp .env.example .env
   # Configure as variáveis do banco e JWT
   ```

3. **Configure o banco PostgreSQL** e execute as migrações

4. **Inicie o servidor:**
   ```bash
   npm run dev
   ```

## 🛠️ Principais Endpoints

### 🔐 Autenticação

- `POST /api/auth/register` - Cadastro de usuário
- `POST /api/auth/login` - Login de usuário
- `GET /api/auth/profile` - Perfil do usuário autenticado

### 👥 Usuários

- `GET /api/users` - Lista todos os usuários
- `GET /api/users/:id` - Busca usuário por ID
- `PATCH /api/users/:id` - Atualiza usuário
- `DELETE /api/users/:id` - Remove usuário

### 📝 Formulários

- `GET /api/forms` - Lista todos os formulários
- `GET /api/forms/:id` - Busca formulário por ID
- `GET /api/forms/user/:userId` - Formulários de um usuário
- `POST /api/forms/submit` - Submete dados de formulário
- `POST /api/forms/schema` - Cria/atualiza schema de formulário

### 📊 Analytics

- `GET /api/analytics` - Estatísticas gerais
- `GET /api/analytics/group/:groupId` - Estatísticas por grupo
- `GET /api/analytics/chart/:groupId` - Dados para gráficos
- `POST /api/analytics/reset` - Reset do codigo
- `POST /api/analytics/error` - Registra erro
- `POST /api/analytics/attempt` - Registra tentativa

## 🧩 Funcionalidades

### 🔐 Autenticação JWT

- Registro e login de usuários
- Proteção de rotas com guards
- Refresh tokens

### 📝 CRUD de Formulários

- Criação e edição de formulários
- Versionamento de schemas
- Submissão de dados
- Validação automática

### 📊 Sistema de Analytics

- Coleta de métricas de uso
- Análise de desempenho
- Comparação entre grupos
- Gráficos e estatísticas

### 🗄️ Banco de Dados

- PostgreSQL com TypeORM
- Migrações automáticas
- Relacionamentos entre entidades
- Índices otimizados

## 🧪 Scripts Disponíveis

```bash
npm run dev          # Inicia servidor em modo desenvolvimento
npm run build        # Compila o TypeScript
npm run start        # Inicia servidor em produção
npm run watch        # Compila em modo watch
npm run migration:run # Executa migrações
npm run migration:generate # Gera nova migração
```

## 📚 Documentação

- **Swagger**: [http://localhost:5001/api](http://localhost:5001/api)
- **NestJS**: [https://nestjs.com/](https://nestjs.com/)
- **TypeORM**: [https://typeorm.io/](https://typeorm.io/)

## 🔧 Configuração

### Variáveis de Ambiente

```env
# PostgreSQL
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=jsonforms_analytics

# Backend
PORT=5001
NODE_ENV=development
JWT_SECRET=your-secret-key

# CORS
CORS_ORIGIN=http://localhost:5173
```

---

_Backend robusto para suportar o playground de formulários dinâmicos com analytics avançado._
