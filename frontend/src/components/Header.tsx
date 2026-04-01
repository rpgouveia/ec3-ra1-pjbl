import { Link } from "react-router-dom";
import "../styles/Header.css";

export default function Header() {
    return (
        <header className="header">
            <Link to="/" className="header-logo" aria-label="Ir para página inicial">RPG Shelf</Link>
            <nav aria-label="Navegação principal">
                <Link to="/books">Estante</Link>
                <Link to="/books/new">Cadastrar Livro</Link>
            </nav>
        </header>
    );
}