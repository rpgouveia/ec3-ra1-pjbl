import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getBookById, createBook, updateBook } from "../services/api";
import type { Book } from "../types/book";
import "../styles/BookForm.css";

const STATUS_OPTIONS = ["Quero", "Tenho", "Lendo", "Lido"];

const emptyBook: Book = {
    title: "",
    system: "",
    publisher: "",
    author: "",
    edition: "",
    status: "Quero",
    notes: "",
};

export default function BookForm() {
    const { id } = useParams();
    const isEditing = Boolean(id);

    const [book, setBook] = useState<Book>(emptyBook);
    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (isEditing) {
            const fetchBook = async () => {
                try {
                    setLoading(true);
                    const response = await getBookById(Number(id));
                    setBook(response.data);
                } catch {
                    toast.error("Erro ao carregar livro.");
                } finally {
                    setLoading(false);
                }
            };

            fetchBook();
        }
    }, [id, isEditing]);

    const validate = (): boolean => {
        const errors: Record<string, string> = {};

        if (!book.title.trim()) errors.title = "Título é obrigatório.";
        if (!book.system.trim()) errors.system = "Sistema é obrigatório.";
        if (!book.publisher.trim()) errors.publisher = "Editora é obrigatória.";

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setBook((prev) => ({ ...prev, [name]: value }));
        setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            if (isEditing) {
                await updateBook(Number(id), book);
                toast.success("Livro atualizado com sucesso!");
            } else {
                await createBook(book);
                toast.success("Livro cadastrado com sucesso!");
                setBook(emptyBook);
            }
        } catch (error: unknown) {
            if (error instanceof Error && "response" in error) {
                const axiosError = error as { response?: { status: number } };
                if (axiosError.response?.status === 409) {
                    toast.warning("Este livro já está cadastrado.");
                    return;
                }
            }
            toast.error("Erro ao salvar livro.");
        }
    };

    if (loading) return <main className="bookform"><p>Carregando...</p></main>;

    return (
        <main className="bookform">
            <h1>{isEditing ? "Editar Livro" : "Cadastrar Livro"}</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Título *</label>
                    <input
                        id="title"
                        name="title"
                        value={book.title}
                        onChange={handleChange}
                        placeholder="Ex: Player's Handbook"
                    />
                    {fieldErrors.title && <span className="field-error">{fieldErrors.title}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="system">Sistema *</label>
                    <input
                        id="system"
                        name="system"
                        value={book.system}
                        onChange={handleChange}
                        placeholder="Ex: D&D 5e"
                    />
                    {fieldErrors.system && <span className="field-error">{fieldErrors.system}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="publisher">Editora *</label>
                    <input
                        id="publisher"
                        name="publisher"
                        value={book.publisher}
                        onChange={handleChange}
                        placeholder="Ex: Wizards of the Coast"
                    />
                    {fieldErrors.publisher && <span className="field-error">{fieldErrors.publisher}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="author">Autor</label>
                    <input
                        id="author"
                        name="author"
                        value={book.author}
                        onChange={handleChange}
                        placeholder="Ex: Jeremy Crawford"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="edition">Edição</label>
                        <input
                            id="edition"
                            name="edition"
                            value={book.edition}
                            onChange={handleChange}
                            placeholder="Ex: 5ª Edição"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={book.status}
                            onChange={handleChange}
                        >
                            {STATUS_OPTIONS.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="notes">Notas</label>
                    <textarea
                        id="notes"
                        name="notes"
                        value={book.notes}
                        onChange={handleChange}
                        placeholder="Observações sobre o livro..."
                        rows={4}
                    />
                </div>

                <div className="form-actions">
                    <button type="submit">
                        {isEditing ? "Salvar Alterações" : "Cadastrar"}
                    </button>
                    <Link to="/books" className="form-cancel">Voltar</Link>
                </div>
            </form>
        </main>
    );
}