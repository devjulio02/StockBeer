import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {

    const usuario = localStorage.getItem("usuario");

    if (!usuario) {
        return <Navigate to="/" replace />;
    }

    try {
        JSON.parse(usuario);
    } catch {
        localStorage.removeItem("usuario");
        return <Navigate to="/" replace />;
    }

    return children;
}