import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getBookById, deleteBook } from "../services/api";
import type { Book } from "../types/book";
import "../styles/BookDetails.css";

export default function BookDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await getBookById(Number(id));
                setBook(response.data);
            } catch {
                setError("Erro ao carregar livro.");
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    const handleDelete = async () => {
        try {
            await deleteBook(Number(id));
            navigate("/books");
        } catch {
            setError("Erro ao excluir livro.");
            setShowConfirm(false);
        }
    };

    if (loading) return <main className="bookdetails"><p>Carregando...</p></main>;
    if (error) return <main className="bookdetails"><p className="error">{error}</p></main>;
    if (!book) return <main className="bookdetails"><p>Livro não encontrado.</p></main>;

    return (
        <main className="bookdetails">
            <Link to="/books" className="bookdetails-back">← Voltar para Estante</Link>

            <div className="bookdetails-card">
                <span className={`book-status status-${book.status?.toLowerCase()}`}>
                    {book.status}
                </span>

                <h1>{book.title}</h1>

                <div className="bookdetails-info">
                    <div className="bookdetails-field">
                        <span className="field-label">Sistema</span>
                        <span className="field-value">{book.system}</span>
                    </div>

                    <div className="bookdetails-field">
                        <span className="field-label">Autor</span>
                        <span className="field-value">{book.author}</span>
                    </div>

                    <div className="bookdetails-field">
                        <span className="field-label">Edição</span>
                        <span className="field-value">{book.edition || "—"}</span>
                    </div>

                    <div className="bookdetails-field">
                        <span className="field-label">Adicionado em</span>
                        <span className="field-value">
                            {new Date(book.created_at ?? "").toLocaleDateString("pt-BR")}
                        </span>
                    </div>
                </div>

                {book.notes && (
                    <div className="bookdetails-notes">
                        <span className="field-label">Notas</span>
                        <p>{book.notes}</p>
                    </div>
                )}

                <div className="bookdetails-actions">
                    <Link to={`/books/${book.id}/edit`} className="btn-edit">
                        Editar
                    </Link>
                    <button
                        className="btn-delete"
                        onClick={() => setShowConfirm(true)}
                    >
                        Excluir
                    </button>
                </div>
            </div>

            {showConfirm && (
                <div className="confirm-overlay">
                    <div className="confirm-dialog">
                        <p>Tem certeza que deseja excluir <strong>{book.title}</strong>?</p>
                        <div className="confirm-actions">
                            <button className="btn-confirm" onClick={handleDelete}>
                                Sim, excluir
                            </button>
                            <button className="btn-cancel" onClick={() => setShowConfirm(false)}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}