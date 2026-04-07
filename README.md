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
- Validação contra livros duplicados
- Design responsivo (mobile-first)
- Acessibilidade: HTML semântico, atributos ARIA e contraste em conformidade com WCAG 2.0 AA

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
│   ├── ec3-ra1-pjbl.pdf
│   ├── ERD.png
│   ├── planejamento-ec3.jpeg
│   └── rpg-shelf-routes-insomnia.yaml
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Header.tsx
│       │   └── Spinner.tsx
│       ├── pages/
│       │   ├── BookDetails.tsx
│       │   ├── BookForm.tsx
│       │   ├── BookList.tsx
│       │   └── Home.tsx
│       ├── services/
│       │   └── api.ts
│       ├── styles/
│       │   ├── BookDetails.css
│       │   ├── BookForm.css
│       │   ├── BookList.css
│       │   ├── Header.css
│       │   ├── Home.css
│       │   ├── Index.css
│       │   └── Spinner.css
│       ├── types/
│       │   ├── book.ts
│       │   └── spinner.ts
│       ├── App.tsx
│       └── main.tsx
└── README.md
```

## Pré-requisitos

- Node.js v24.12.0
- MySQL 8.0.45
- npm

## Tecnologias e Versões

### Frontend
- React 19.2.4
- TypeScript 5.9.3
- Vite 8.0.1
- React Router 7.13.1
- Axios 1.14.0
- React Toastify 11.0.5
- Normalize.css 8.0.1

### Backend
- Express 5.2.1
- mysql2 3.20.0
- dotenv 17.3.1
- TypeScript 5.9.3

## Testando a API

Na pasta `docs/` há o arquivo `rpg-shelf-routes-insomnia.yaml` com todas as rotas configuradas. Para importar:

1. Abra o Insomnia
2. Clique em Import
3. Selecione o arquivo `docs/rpg-shelf-routes-insomnia.yaml`

A coleção inclui testes para todas as operações CRUD, validação de ID inválido e detecção de livros duplicados.

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

| Método | Rota       | Descrição                   |
|--------|------------|-----------------------------|
| GET    | /books     | Lista todos os livros       |
| GET    | /books/:id | Busca um livro por ID       |
| POST   | /books     | Cadastra um novo livro      |
| PUT    | /books/:id | Atualiza um livro existente |
| DELETE | /books/:id | Remove um livro             |

## Banco de Dados

A tabela `books` possui os seguintes campos:

| Campo      | Tipo         | Descrição                            |
|------------|--------------|--------------------------------------|
| id         | INT (PK)     | Identificador único, auto incremento |
| title      | VARCHAR(255) | Título do livro (obrigatório)        |
| system     | VARCHAR(100) | Sistema de RPG (obrigatório)         |
| publisher  | VARCHAR(255) | Editora (obrigatório)                |
| author     | VARCHAR(255) | Autor (opcional)                     |
| edition    | VARCHAR(50)  | Edição (opcional)                    |
| status     | ENUM         | Quero, Tenho, Lendo, Lido            |
| notes      | TEXT         | Observações (opcional)               |
| created_at | TIMESTAMP    | Data de criação automática           |

A tabela possui um índice UNIQUE em (title, system, edition) para evitar livros duplicados.

## Autor

Desenvolvido por **Renato Gouveia** — PUCPR, Experiência Criativa III.

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
