# RPG Shelf

Sistema web de inventário de livros de RPG com operações CRUD completas, desenvolvido com React, Node.js e MySQL.

## Sobre o Projeto

RPG Shelf é uma aplicação para gerenciar sua coleção de livros de RPG. Organize, catalogue e acompanhe o estado de leitura de cada livro da sua estante.

### Funcionalidades

- Listagem de livros com paginação, busca por título, filtro por status e ordenação
- Cadastro de novos livros
- Visualização detalhada de cada livro
- Edição de informações dos livros
- Exclusão com confirmação

### Tecnologias

**Frontend:** React, TypeScript, Vite, React Router, Axios, React Toastify

**Backend:** Node.js, Express, TypeScript, mysql2

**Banco de Dados:** MySQL

## Estrutura do Projeto

```
EC3-RA1-PJBL/
├── backend/
│   └── src/
│       ├── controllers/
│       │   └── booksController.ts
│       ├── middlewares/
│       │   └── validateId.ts
│       ├── routes/
│       │   └── books.ts
│       ├── services/
│       │   └── booksService.ts
│       ├── types/
│       │   └── book.ts
│       ├── connection.ts
│       └── server.ts
├── database/
│   └── schema.sql
├── docs/
│   ├── erd.png
│   ├── ec3-ra1-pjbl.pdf
│   └── planejamento-ec3.jpeg
├── frontend/
│   └── src/
│       ├── components/
│       │   └── Header.tsx
│       ├── pages/
│       │   ├── Home.tsx
│       │   ├── BookList.tsx
│       │   ├── BookForm.tsx
│       │   └── BookDetails.tsx
│       ├── services/
│       │   └── api.ts
│       ├── styles/
│       │   ├── index.css
│       │   ├── Header.css
│       │   ├── Home.css
│       │   ├── BookList.css
│       │   ├── BookForm.css
│       │   └── BookDetails.css
│       ├── types/
│       │   └── book.ts
│       ├── App.tsx
│       └── main.tsx
└── README.md
```

## Pré-requisitos

- Node.js (v18 ou superior)
- MySQL (v8 ou superior)
- npm

## Como Rodar o Projeto

### 1. Banco de Dados

Importe o arquivo SQL para criar o banco e inserir os dados iniciais:

```bash
mysql -u seu_usuario -p < database/schema.sql
```

Ou abra o arquivo `database/schema.sql` no MySQL Workbench e execute.

### 2. Backend

```bash
cd backend
npm install
```

Crie o arquivo `.env` dentro da pasta `backend/` com as seguintes variáveis:

```
PORT=3001
DB_HOST=127.0.0.1
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=rpg_shelf
```

Inicie o servidor:

```bash
npm run dev
```

O backend estará disponível em `http://localhost:3001`.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:5173`.

## Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /books | Lista todos os livros |
| GET | /books/:id | Busca um livro por ID |
| POST | /books | Cadastra um novo livro |
| PUT | /books/:id | Atualiza um livro existente |
| DELETE | /books/:id | Remove um livro |

## Banco de Dados

A tabela `books` possui os seguintes campos:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INT (PK) | Identificador único, auto incremento |
| title | VARCHAR(255) | Título do livro (obrigatório) |
| system | VARCHAR(100) | Sistema de RPG (obrigatório) |
| publisher | VARCHAR(255) | Editora (obrigatório) |
| author | VARCHAR(255) | Autor (opcional) |
| edition | VARCHAR(50) | Edição (opcional) |
| status | ENUM | Quero, Tenho, Lendo, Lido |
| notes | TEXT | Observações (opcional) |
| created_at | TIMESTAMP | Data de criação automática |

## Autor

Desenvolvido por **Renato Gouveia** — PUCPR, Experiência Criativa III.

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
