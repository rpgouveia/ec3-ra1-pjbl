import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import database from "./connection";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (request, response) => {
    response.json({ message: "RPG Shelf API está rodando." });
});

app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});

// Connection test
database.getConnection()
    .then((connection) => {
        console.log("Conexão com o banco de dados estabelecida com sucesso.");
        connection.release();
    })
    .catch((error) => {
        console.error("Erro ao conectar ao banco de dados:", error);
    });