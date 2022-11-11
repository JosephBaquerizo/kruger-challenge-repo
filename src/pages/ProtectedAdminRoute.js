import { Navigate } from "react-router-dom";
import NavigatePrev from "../components/NavigatePrev";

export default function ProtectedAdminRoute({ children, username }) {

    // si no hay user logueado, mandar a la pagina de login
    if (!username) return <Navigate to="/" />;

    // si hay user logueado, pero no es el admin, mandarlo a la pagina desde la que hizo peticion
    if (username !== "admin") return <NavigatePrev />

    // si hay user y es admin, retornar pagina de admin
    return children;
}