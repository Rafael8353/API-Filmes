README.md
markdown

# API Filmes Favoritos

API RESTful para gerenciar usuários e filmes favoritos, desenvolvida em Node.js com TypeScript, Express e Prisma.

## Funcionalidades

- Registro e autenticação de usuários (JWT)
- Controle de acesso por perfil (admin e comum)
- CRUD completo para usuários e filmes
- Validação de dados com Zod
- Banco de dados SQLite via Prisma

## Tecnologias

- Node.js
- TypeScript
- Express
- Prisma (SQLite)
- Zod
- bcryptjs
- jsonwebtoken

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seuusuario/api-filmes.git
cd api-filmes
Instale as dependências:

bash
Copiar código
npm install
Configure as variáveis de ambiente

Crie um arquivo .env na raiz e defina:

env
Copiar código
DATABASE_URL="file:./dev.db"
JWT_SECRET="sua_chave_secreta_aqui"
PORT=3000
Gere o banco de dados com Prisma:

bash
Copiar código
npx prisma migrate dev --name init
Rode a aplicação:

bash
Copiar código
npm run dev
Usuário Admin
Para criar um usuário admin, registre um usuário normalmente e depois atualize o perfil dele no banco para "ADMIN" manualmente, ou crie uma rota protegida para isso.

Rotas Principais
POST /register — Registrar novo usuário comum

POST /login — Login e obtenção de token JWT

CRUD /usuarios — Gerenciado por admin

CRUD /filmes — Gerenciado pelo usuário dono ou admin

Testes
Use ferramentas como Postman ou Insomnia para testar as rotas.