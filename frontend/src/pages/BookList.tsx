import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getBooks } from "../services/api";
import type { Book } from "../types/book";
import Spinner from "../components/Spinner";
import "../styles/BookList.css";

const ITEMS_PER_PAGE = 6;
const STATUS_OPTIONS = ["Todos", "Quero", "Tenho", "Lendo", "Lido"];

export default function BookList() {
    const [books, setBooks] = useState<Book[]>([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("Todos");
    const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getBooks();
                setBooks(response.data);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
                toast.error("Erro ao carregar livros.");
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, statusFilter, sortOrder]);

    const filteredBooks = books
        .filter((book) => {
            const matchesSearch = book.title
                .toLowerCase()
                .includes(search.toLowerCase());
            const matchesStatus =
                statusFilter === "Todos" || book.status === statusFilter;
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            const dateA = new Date(a.created_at ?? "").getTime();
            const dateB = new Date(b.created_at ?? "").getTime();
            return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
        });

    const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);
    const paginatedBooks = filteredBooks.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    if (loading) return <main className="booklist"><Spinner message="Carregando livros..." /></main>;

    return (
        <main className="booklist">
            <div className="booklist-header">
                <h1>Estante</h1>
                <Link to="/books/new" className="booklist-add">+ Novo Livro</Link>
            </div>

            <div className="booklist-filters">
                <input
                    type="text"
                    placeholder="Buscar por título..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="booklist-search"
                />

                <div className="booklist-options">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>

                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as "desc" | "asc")}
                    >
                        <option value="desc">Mais recentes</option>
                        <option value="asc">Mais antigos</option>
                    </select>
                </div>
            </div>

            {paginatedBooks.length === 0 ? (
                <p className="booklist-empty">Nenhum livro encontrado.</p>
            ) : (
                <div className="booklist-grid">
                    {paginatedBooks.map((book) => (
                        <Link
                            to={`/books/${book.id}`}
                            key={book.id}
                            className="book-card"
                        >
                            <span className={`book-status status-${book.status?.toLowerCase()}`}>
                                {book.status}
                            </span>
                            <h2 className="book-title">{book.title}</h2>
                            <p className="book-system">{book.system}</p>
                            <p className="book-publisher">{book.publisher}</p>
                        </Link>
                    ))}
                </div>
            )}

            {totalPages > 1 && (
                <div className="booklist-pagination">
                    <button
                        onClick={() => setCurrentPage((p) => p - 1)}
                        disabled={currentPage === 1}
                    >
                        Anterior
                    </button>
                    <span>
                        {currentPage} de {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((p) => p + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Próxima
                    </button>
                </div>
            )}
        </main>
    );
}