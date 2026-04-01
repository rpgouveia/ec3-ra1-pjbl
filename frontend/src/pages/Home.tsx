import { Link } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
    return (
        <main className="home" aria-label="Página inicial">
            <h1 className="home-title">RPG Shelf</h1>
            <p className="home-description">
                Gerencie sua coleção de livros de RPG. Organize, catalogue e
                acompanhe o estado de leitura de cada livro da sua estante.
            </p>
            <Link to="/books" className="home-button">
                Acessar Estante
            </Link>
            <footer className="home-footer">
                Desenvolvido por Renato Gouveia
            </footer>
        </main>
    );
}