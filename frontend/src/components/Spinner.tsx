import { ClipLoader } from "react-spinners";
import type { SpinnerProps } from "../types/spinner";
import "../styles/Spinner.css";

export default function Spinner({ message = "Carregando..." }: SpinnerProps) {
    return (
        <div className="spinner-container">
            <ClipLoader color="#e0e0e0" size={40} />
            <span className="spinner-message">{message}</span>
        </div>
    );
}