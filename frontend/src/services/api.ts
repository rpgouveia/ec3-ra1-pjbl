import axios from "axios";
import type { Book } from "../types/book";

const api = axios.create({
    baseURL: "http://localhost:3001/",
    timeout: 1000,
});

export const getBooks    = () => api.get<Book[]>("/books");
export const getBookById = (id: number) => api.get<Book>(`/books/${id}`);
export const createBook  = (book: Book) => api.post("/books", book);
export const updateBook  = (id: number, book: Book) => api.put(`/books/${id}`, book);
export const deleteBook  = (id: number) => api.delete(`/books/${id}`);

export default api;