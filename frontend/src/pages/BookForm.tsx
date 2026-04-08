import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { getBookById, createBook, updateBook } from "../services/api";
import type { Book } from "../types/book";
import Spinner from "../components/Spinner";
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
    const [submitting, setSubmitting] = useState(false);
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
        if (!book.edition.trim()) errors.edition = "Edição é obrigatória.";

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

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            setSubmitting(true);
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
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <main className="bookform"><Spinner message="Carregando livro..." /></main>;

    return (
        <main className="bookform" aria-label={isEditing ? "Editar livro" : "Cadastrar livro"}>
            <h1>{isEditing ? "Editar Livro" : "Cadastrar Livro"}</h1>

            <form onSubmit={handleSubmit} noValidate>
                <fieldset disabled={submitting}>
                    <div className="form-group">
                        <label htmlFor="title">Título *</label>
                        <input
                            id="title"
                            name="title"
                            value={book.title}
                            onChange={handleChange}
                            placeholder="Ex: Player's Handbook"
                            aria-required="true"
                            aria-invalid={!!fieldErrors.title}
                            aria-describedby={fieldErrors.title ? "title-error" : undefined}
                        />
                        {fieldErrors.title && <span className="field-error" id="title-error" role="alert">{fieldErrors.title}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="system">Sistema *</label>
                        <input
                            id="system"
                            name="system"
                            value={book.system}
                            onChange={handleChange}
                            placeholder="Ex: D&D 5e"
                            aria-required="true"
                            aria-invalid={!!fieldErrors.system}
                            aria-describedby={fieldErrors.system ? "system-error" : undefined}
                        />
                        {fieldErrors.system && <span className="field-error" id="system-error" role="alert">{fieldErrors.system}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="publisher">Editora</label>
                        <input
                            id="publisher"
                            name="publisher"
                            value={book.publisher}
                            onChange={handleChange}
                            placeholder="Ex: Wizards of the Coast"
                        />
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
                            <label htmlFor="edition">Edição *</label>
                            <input
                                id="edition"
                                name="edition"
                                value={book.edition}
                                onChange={handleChange}
                                placeholder="Ex: 5ª Edição"
                                aria-required="true"
                                aria-invalid={!!fieldErrors.edition}
                                aria-describedby={fieldErrors.edition ? "edition-error" : undefined}
                            />
                            {fieldErrors.edition && <span className="field-error" id="edition-error" role="alert">{fieldErrors.edition}</span>}
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
                </fieldset>

                <footer className="form-actions">
                    <button type="submit" disabled={submitting} aria-busy={submitting}>
                        {submitting ? (
                            <span className="btn-loading">
                                <ClipLoader color="#0f0f0f" size={16} />
                                Salvando...
                            </span>
                        ) : (
                            isEditing ? "Salvar Alterações" : "Cadastrar"
                        )}
                    </button>
                    <Link to="/books" className="form-cancel">Voltar</Link>
                </footer>
            </form>
        </main>
    );
}