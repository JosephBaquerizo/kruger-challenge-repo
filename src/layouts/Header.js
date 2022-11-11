import styles from "../assets/layouts/Header.module.css";
import { userActions } from "../store/slices/userSlice";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";


export default function Header() {

    const username = useSelector((state) => state.user.username);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(userActions.setUser(null));
    }

    return (
        <section className={styles.container}>
            <div className={styles.content}>
                <Link to="/" className={styles.link}>
                    <div className={styles.logo}>
                        <span>KC</span>
                    </div>
                </Link>
                { username ? <button onClick={logout}>LOGOUT</button> : <span style={{'color': 'white'}}>KRUGER</span> }
            </div>
        </section>
    )
}