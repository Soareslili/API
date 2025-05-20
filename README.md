# DevBills API

API construída com [Fastify](https://www.fastify.io/) e [Prisma](https://www.prisma.io/) para gerenciamento de dados, pronta para ser conectada a um banco de dados PostgreSQL (ou outro, conforme configuração).

## Tecnologias

- [Fastify](https://www.fastify.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [dotenv](https://github.com/motdotla/dotenv)
- [Biome](https://biomejs.dev/) (formatação e lint)

## Como rodar o projeto

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/seu-usuario/seu-repo.git
   cd seu-repo
   ```

2. **Instale as dependências:**
   ```sh
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   - Renomeie o arquivo `.env.example` para `.env`
   - Definir a porta (`PORT`) e a string de conexão do banco de dados (`DATABASE_URL`).

4. **Rode as migrations do Prisma (se necessário):**
   ```sh
   npx prisma migrate dev
   ```

5. **Inicie o servidor em modo desenvolvimento:**
   ```sh
   npm run dev
   ```

6. **Acesse a rota de health check:**
   - [http://localhost:3001/health](http://localhost:3001/health)

## Estrutura do Projeto

```
.
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app.ts
│   ├── server.ts
│   └── routes/
│       └── index.ts
├── .env
├── package.json
├── tsconfig.json
└── biome.json

