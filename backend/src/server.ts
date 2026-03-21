import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import database from "./connection";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});

database.getConnection()
    .then((connection) => {
        console.log("Conexão com o banco de dados estabelecida com sucesso.");
        connection.release();
    })
    .catch((error) => {
        console.error("Erro ao conectar ao banco de dados:", error);
    });