import type { Request, Response } from "express";
import * as booksService from "../services/booksService";

export const getAll = async (request: Request, response: Response) => {
    try {
        const books = await booksService.findAll();
        response.json(books);
    } catch (error) {
        response.status(500).json({ error: "Erro ao buscar livros." });
    }
};

export const getById = async (request: Request, response: Response) => {
    try {
        const book = await booksService.findById(request.body.validatedId);

        if (!book) {
            response.status(404).json({ error: "Livro não encontrado." });
            return;
        }

        response.json(book);
    } catch (error) {
        response.status(500).json({ error: "Erro ao buscar livro." });
    }
};

export const create = async (request: Request, response: Response) => {
    try {
        const { title, system, author } = request.body;

        if (!title || !system || !author) {
            response.status(400).json({ error: "Campos title, system e author são obrigatórios." });
            return;
        }

        const id = await booksService.create(request.body);
        response.status(201).json({ id, message: "Livro cadastrado com sucesso." });
    } catch (error) {
        response.status(500).json({ error: "Erro ao cadastrar livro." });
    }
};

export const update = async (request: Request, response: Response) => {
    try {
        const updated = await booksService.update(request.body.validatedId, request.body);

        if (!updated) {
            response.status(404).json({ error: "Livro não encontrado." });
            return;
        }

        response.json({ message: "Livro atualizado com sucesso." });
    } catch (error) {
        response.status(500).json({ error: "Erro ao atualizar livro." });
    }
};

export const remove = async (request: Request, response: Response) => {
    try {
        const removed = await booksService.remove(request.body.validatedId);

        if (!removed) {
            response.status(404).json({ error: "Livro não encontrado." });
            return;
        }

        response.json({ message: "Livro removido com sucesso." });
    } catch (error) {
        response.status(500).json({ error: "Erro ao remover livro." });
    }
};