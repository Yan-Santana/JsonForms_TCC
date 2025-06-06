FROM node:19

WORKDIR /app

# Instalar dependências necessárias para o bcrypt
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copiar apenas os arquivos de configuração primeiro
COPY package*.json ./
COPY tsconfig*.json ./

# Instalar dependências e limpar cache
RUN npm install -g @nestjs/cli && \
    npm install && \
    npm cache clean --force

# Copiar o resto dos arquivos
COPY . .

# Reconstruir o bcrypt para a arquitetura do container
RUN npm rebuild bcrypt --build-from-source

EXPOSE 3000

CMD ["npm", "run", "dev"] 