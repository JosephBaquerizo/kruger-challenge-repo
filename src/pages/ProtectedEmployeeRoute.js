import { Navigate } from "react-router-dom";
import NavigatePrev from "../components/NavigatePrev";

export default function ProtectedEmployeeRoute({ children, username }) {

    // si no hay user logueado, llevar a login
    if (!username) return <Navigate to="/" />

    // si hay user pero es admin, redireccionar a su pagina (admin)
    if (username === "admin") return <NavigatePrev />

    // si hay user y no es admin, llevar a employee
    return children;

}