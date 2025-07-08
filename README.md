🎜️ API de Filmes Favoritos

API RESTful para gerenciamento de usuários e seus filmes favoritos, desenvolvida com Node.js, TypeScript, Express, JWT, Prisma e SQLite.


---

🚀 Funcionalidades

Autenticação com JWT;

Registro e login de usuários;

Perfis de acesso: ADMIN e COMUM;

CRUD completo de filmes, vinculado ao usuário;

Usuários só podem acessar seus próprios filmes;

Usuários ADMIN podem gerenciar todos os usuários;

Validação de dados com Zod;

Banco de dados SQLite com ORM Prisma.



---

📁 Tecnologias

Node.js

TypeScript

Express

Prisma (ORM)

SQLite

JWT (JSON Web Token)

Zod (validação)

dotenv (variáveis de ambiente)



---

⚙️ Instalação e execução

1. Clone o projeto:

git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

2. Instale as dependências:

npm install

3. Configure as variáveis de ambiente:

Crie um arquivo .env na raiz do projeto:

JWT_SECRET=sua_chave_secreta
DATABASE_URL="file:./dev.db"

4. Gere o banco de dados:

npx prisma migrate dev --name init

5. Rode o projeto:

npm run dev

A API ficará disponível em: http://localhost:3000


---

🔑 Usuário ADMIN

Você deve criar um usuário com perfil ADMIN manualmente pela rota /register, informando no corpo da requisição:

{
  "nome": "Admin",
  "email": "admin@email.com",
  "senha": "admin123",
  "perfil": "ADMIN"
}

Após o cadastro, faça o login com o ADMIN para gerar o token.


---

📬 Rotas principais

Método	Rota	Acesso	Descrição

POST	/register	Público	Criação de novo usuário (comum/admin)
POST	/login	Público	Login e geração do token JWT
GET	/filmes	Auth	Listar filmes do usuário
POST	/filmes	Auth	Criar novo filme
PUT	/filmes/:id	Auth	Atualizar filme
DELETE	/filmes/:id	Auth	Excluir filme
GET	/usuarios	Admin	Listar todos os usuários
PUT	/usuarios/:id	Admin	Atualizar dados de um usuário
DELETE	/usuarios/:id	Admin	Excluir usuário



---

🛡️ Proteção por perfil

Usuário comum: acessa apenas seus próprios filmes.

Admin: acessa e gerencia todos os usuários e filmes.



---

🛉 .gitignore

Já configurado para ignorar:

node_modules/

.env

/prisma/dev.db (ou similar)

outros arquivos temporários.



---

🔍 Testes via REST Client

Você pode testar os endpoints usando a extensão REST Client no VSCode com o arquivo testes.http.


---

📄 Licença

MIT © Rafael Gonçales
