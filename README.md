# Playground JsonForms - TCC

Este projeto é um playground para experimentação e desenvolvimento com JsonForms, uma biblioteca React para criação de formulários dinâmicos baseados em JSON Schema.

## 🚀 Tecnologias Utilizadas

- **Frontend**:

  - React 19
  - Vite
  - JsonForms
  - Material-UI
  - Monaco Editor
  - React Router DOM

- **Backend**:
  - Node.js
  - Express
  - TypeScript
  - MongoDB
  - Swagger
  - Docker
  - Docker Compose

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- Docker e Docker Compose
- npm ou yarn
- MongoDB (local ou Atlas)

## 🛠️ Instalação

1. Clone o repositório:

```bash
git clone https://github.com/Yan-Santana/JsonForms_TCC.git
```

2. Instale as dependências do frontend:

```bash
npm install
```

3. Instale as dependências do backend:

```bash
cd backend
npm install
```

4. Configure as variáveis de ambiente:

```bash
# Frontend
cp .env.example .env

# Backend
cd backend
cp .env.example .env
```

5. Inicie o ambiente de desenvolvimento:

Frontend:

```bash
npm run dev
```

Backend:

```bash
cd backend
npm run dev
```

6. Para desenvolvimento com Docker:

```bash
docker-compose up
```

## 📝 Funcionalidades Principais

- Criação e edição de formulários dinâmicos
- Validação de dados baseada em JSON Schema
- Interface visual para construção de formulários
- Integração com Monaco Editor para edição de schemas
- API REST com documentação Swagger
- Autenticação de usuários

## 🧪 Scripts Disponíveis

Frontend:

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run lint` - Executa o linter
- `npm run preview` - Previa a build de produção

Backend:

- `npm run dev` - Inicia o servidor em modo desenvolvimento
- `npm run build` - Compila o TypeScript
- `npm run start` - Inicia o servidor em produção
- `npm run watch` - Compila o TypeScript em modo watch

## 📚 Documentação

- [JsonForms](https://jsonforms.io/)
- [Swagger UI](http://localhost:3001/api-docs) (disponível após iniciar o backend)

## 🤝 Contribuição

Este projeto é parte de um trabalho de conclusão de curso (TCC). Contribuições são bem-vindas através de pull requests.

## 👨‍💻 Autor

Yan G. Santana - yansantana63@gmail.com
