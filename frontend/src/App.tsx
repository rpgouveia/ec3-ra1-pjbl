import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import BookList from "./pages/BookList";
import BookForm from "./pages/BookForm";
import BookDetails from "./pages/BookDetails";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<BookList />} />
                <Route path="/books/new" element={<BookForm />} />
                <Route path="/books/:id" element={<BookDetails />} />
                <Route path="/books/:id/edit" element={<BookForm />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;