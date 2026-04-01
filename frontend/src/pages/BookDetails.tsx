import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getBookById, deleteBook } from "../services/api";
import type { Book } from "../types/book";
import Spinner from "../components/Spinner";
import "../styles/BookDetails.css";

export default function BookDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await getBookById(Number(id));
                setBook(response.data);
            } catch {
                toast.error("Erro ao carregar livro.");
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    const handleDelete = async () => {
        try {
            await deleteBook(Number(id));
            toast.success("Livro excluído com sucesso!");
            navigate("/books");
        } catch {
            toast.error("Erro ao excluir livro.");
            setShowConfirm(false);
        }
    };

    if (loading) return <main className="bookdetails"><Spinner message="Carregando livro..." /></main>;
    if (!book) return <main className="bookdetails"><p>Livro não encontrado.</p></main>;

    return (
        <main className="bookdetails" aria-label="Detalhes do livro">
            <Link to="/books" className="bookdetails-back" aria-label="Voltar para estante">
                ← Voltar para Estante
            </Link>

            <article className="bookdetails-card">
                <span className={`book-status status-${book.status?.toLowerCase()}`}>
                    {book.status}
                </span>

                <h1>{book.title}</h1>

                <section className="bookdetails-info" aria-label="Informações do livro">
                    <dl>
                        <div className="bookdetails-field">
                            <dt className="field-label">Sistema</dt>
                            <dd className="field-value">{book.system}</dd>
                        </div>

                        <div className="bookdetails-field">
                            <dt className="field-label">Editora</dt>
                            <dd className="field-value">{book.publisher}</dd>
                        </div>

                        <div className="bookdetails-field">
                            <dt className="field-label">Autor</dt>
                            <dd className="field-value">{book.author || "—"}</dd>
                        </div>

                        <div className="bookdetails-field">
                            <dt className="field-label">Edição</dt>
                            <dd className="field-value">{book.edition || "—"}</dd>
                        </div>

                        <div className="bookdetails-field">
                            <dt className="field-label">Adicionado em</dt>
                            <dd className="field-value">
                                <time dateTime={book.created_at}>
                                    {new Date(book.created_at ?? "").toLocaleDateString("pt-BR")}
                                </time>
                            </dd>
                        </div>
                    </dl>
                </section>

                {book.notes && (
                    <section className="bookdetails-notes" aria-label="Notas sobre o livro">
                        <span className="field-label">Notas</span>
                        <p>{book.notes}</p>
                    </section>
                )}

                <footer className="bookdetails-actions">
                    <Link to={`/books/${book.id}/edit`} className="btn-edit" aria-label={`Editar ${book.title}`}>
                        Editar
                    </Link>
                    <button
                        className="btn-delete"
                        onClick={() => setShowConfirm(true)}
                        aria-label={`Excluir ${book.title}`}
                    >
                        Excluir
                    </button>
                </footer>
            </article>

            {showConfirm && (
                <div className="confirm-overlay" role="dialog" aria-modal="true" aria-label="Confirmar exclusão">
                    <div className="confirm-dialog">
                        <p>Tem certeza que deseja excluir <strong>{book.title}</strong>?</p>
                        <footer className="confirm-actions">
                            <button className="btn-confirm" onClick={handleDelete}>
                                Sim, excluir
                            </button>
                            <button className="btn-cancel" onClick={() => setShowConfirm(false)} autoFocus>
                                Cancelar
                            </button>
                        </footer>
                    </div>
                </div>
            )}
        </main>
    );
}