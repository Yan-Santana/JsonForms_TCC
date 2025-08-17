# JsonForms Playground

Este projeto é um ambiente completo para experimentação, construção e análise de formulários dinâmicos utilizando React, JsonForms e um backend robusto em NestJS + PostgreSQL. Ele foi desenvolvido como parte de um Trabalho de Conclusão de Curso (TCC).

## 🚀 Tecnologias Utilizadas

### Frontend

- **React** (com Vite)
- **JsonForms** - Biblioteca para formulários dinâmicos
- **TailwindCSS** - Framework CSS
- **Material-UI** - Componentes de interface
- **Monaco Editor** - Editor de código para schemas
- **React Router DOM** - Roteamento
- **Axios** - Cliente HTTP

### Backend

- **Node.js** + **NestJS** (TypeScript)
- **TypeORM** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **Docker** & **Docker Compose** - Containerização

## 📦 Estrutura do Projeto

```
JsonForms_test/
├── backend/                    # Backend NestJS
│   ├── src/
│   │   ├── analytics/         # Analytics e estatísticas
│   │   ├── auth/              # Autenticação JWT
│   │   ├── forms/             # CRUD de formulários
│   │   ├── users/             # Gerenciamento de usuários
│   │   ├── migrations/        # Migrações do banco
│   │   └── main.ts            # Bootstrap da aplicação
│   └── package.json
├── src/                       # Frontend React
│   ├── components/            # Componentes reutilizáveis
│   │   ├── dashboard/         # Componentes do dashboard
│   │   └── ui/                # Componentes de interface
│   ├── pages/                 # Páginas principais
│   ├── services/              # Integração com API
│   ├── hooks/                 # Hooks customizados
│   └── utils/                 # Utilitários
├── public/                    # Arquivos estáticos
├── scripts/                   # Scripts utilitários
└── docker-compose.yml         # Configuração Docker
```

## ⚙️ Como rodar o projeto

### Com Docker (recomendado)

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/Yan-Santana/JsonForms_TCC.git
   cd JsonForms_test
   ```

2. **Configure as variáveis de ambiente:**

   ```bash
   cp .env.example .env
   # Edite o arquivo .env conforme necessário
   ```

3. **Execute com Docker:**

   ```bash
   docker-compose up --build
   ```

4. **Acesse a aplicação:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:5001/api](http://localhost:5001/api)
   - Swagger: [http://localhost:5001/api](http://localhost:5001/api)

### Manualmente (sem Docker)

1. **Instale as dependências do frontend:**

   ```bash
   npm install
   ```

2. **Instale as dependências do backend:**

   ```bash
   cd backend
   npm install
   cd ..
   ```

3. **Configure o banco PostgreSQL** e as variáveis de ambiente

4. **Inicie o backend:**

   ```bash
   cd backend
   npm run dev
   ```

5. **Inicie o frontend (em outro terminal):**
   ```bash
   npm run dev
   ```

## 📝 Funcionalidades Principais

### 🎮 Playground de Formulários

- Criação e edição de formulários dinâmicos com JsonForms
- Editor visual e de código (Monaco Editor) para JSON Schema
- Validação automática baseada em JSON Schema
- Preview em tempo real dos formulários

### 📊 Dashboard Analítico

- Visualização de estatísticas de uso dos formulários
- Gráficos de comparação entre grupos de usuários
- Métricas de desempenho e tempo de conclusão
- Análise de erros e tentativas

### 🔐 Sistema de Autenticação

- Cadastro e login de usuários
- Proteção de rotas com JWT
- Perfil de usuário

### 🛠️ API RESTful

- Endpoints para CRUD de formulários
- Sistema de analytics e métricas
- Gerenciamento de usuários
- Documentação automática com Swagger

## 🧪 Scripts Disponíveis

### Frontend

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Gera build de produção
npm run lint         # Executa o linter
npm run preview      # Previa a build de produção
```

### Backend

```bash
npm run dev          # Inicia servidor em modo desenvolvimento
npm run build        # Compila o TypeScript
npm run start        # Inicia servidor em produção
npm run watch        # Compila em modo watch
```

## 📚 Documentação

- **JsonForms**: [https://jsonforms.io/](https://jsonforms.io/)
- **Swagger**: [http://localhost:5001/api](http://localhost:5001/api) (após iniciar o backend)
- **NestJS**: [https://nestjs.com/](https://nestjs.com/)

## 🤝 Contribuição

Este projeto é parte de um trabalho de conclusão de curso (TCC). Contribuições são bem-vindas através de pull requests.

## 👨‍💻 Autor

**Yan G. Santana** - yansantana63@gmail.com

---

_Desenvolvido como parte do meu TCC sobre Technical writing, formulários dinâmicos e análise de usabilidade._
