import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

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