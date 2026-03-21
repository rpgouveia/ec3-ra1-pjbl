import { Link } from "react-router-dom";
import "../styles/Header.css";

export default function Header() {
    return (
        <header className="header">
            <Link to="/" className="header-logo">RPG Shelf</Link>
            <nav>
                <Link to="/books">Estante</Link>
                <Link to="/books/new">Cadastrar Livro</Link>
            </nav>
        </header>
    );
}