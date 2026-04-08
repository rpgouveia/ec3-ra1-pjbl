import database from "../connection";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import type { Book } from "../types/book";

export const findAll = async () => {
    const [rows] = await database.query<RowDataPacket[]>(
        "SELECT * FROM books"
    );
    return rows as Book[];
};

export const findById = async (id: number) => {
    const [rows] = await database.query<RowDataPacket[]>(
        "SELECT * FROM books WHERE id = ?", [id]
    );
    return rows[0] as Book | null;
};

export const findDuplicate = async (book: Book, excludeId?: number) => {
    let query = "SELECT id FROM books WHERE title = ? AND `system` = ? AND `edition` = ?";
    const params: (string | number | null)[] = [book.title, book.system, book.edition || null];

    if (excludeId) {
        query += " AND id != ?";
        params.push(excludeId);
    }

    const [rows] = await database.query<RowDataPacket[]>(query, params);
    return rows.length > 0;
};

export const create = async (book: Book) => {
    const [result] = await database.query<ResultSetHeader>(
        "INSERT INTO books (title, `system`, publisher, author, `edition`, `status`, notes) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
            book.title,
            book.system,
            book.publisher || null,
            book.author || null,
            book.edition,
            book.status || "Quero",
            book.notes || null
        ]
    );
    return result.insertId;
};

export const update = async (id: number, book: Book) => {
    const [result] = await database.query<ResultSetHeader>(
        "UPDATE books SET title = ?, `system` = ?, publisher = ?, author = ?, `edition` = ?, `status` = ?, notes = ? WHERE id = ?",
        [
            book.title, 
            book.system, 
            book.publisher,
            book.author || null, 
            book.edition || null, 
            book.status || null, 
            book.notes || null, 
            id
        ]
    );
    return result.affectedRows > 0;
};

export const remove = async (id: number) => {
    const [result] = await database.query<ResultSetHeader>(
        "DELETE FROM books WHERE id = ?", [id]
    );
    return result.affectedRows > 0;
};