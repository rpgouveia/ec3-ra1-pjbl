export interface Book {
    id?: number;
    title: string;
    system: string;
    publisher: string;
    author?: string;
    edition?: string;
    status?: "Quero" | "Tenho" | "Lendo" | "Lido";
    notes?: string;
    created_at?: string;
}