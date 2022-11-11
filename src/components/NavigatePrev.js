import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../assets/components/NavigatePrev.module.css";

// este componente sirve para redireccionar a la pagina anterior al usuario sin usar history
export default function NavigatePrev() {

    const navigate = useNavigate();

    useEffect(() => {
        navigate(-1);
    }, [])

    return (
        <div className={styles.container}>
            <span>Redirecting...</span>
        </div>
    )
}