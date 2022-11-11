import styles from "../assets/pages/Login.module.css";
import { userActions } from "../store/slices/userSlice";
import toast from 'react-hot-toast';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

export default function LOGIN() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        username: "",
        password: ""
    })

    const employees = useSelector((state) => state.employees.employees);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const value = e.target.value;
        setForm({...form, [e.target.name]: value })
    }

    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formUsername = form.username;
        const formPassword = form.password;
        // Para simular request
        await new Promise(resolve => setTimeout(resolve, 1500));
        const userExist = employees.find((item) => item.username === formUsername);
        if (userExist) {
            if (formPassword === userExist.password) {
                dispatch(userActions.setUser(userExist.username));
                if (formUsername === "admin") {
                    return navigate("/admin");
                } else {
                    return navigate(`/employee/${formUsername}`)
                }
            }
        }
        setLoading(false);
        toast.error("You have entered an invalid username or password")
        return;
    }

    return (
        <div className={styles.container}>
            <div className={styles.login}>
                <h3>LOGIN</h3>
                <form>
                    <div className={styles.block}>
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="Enter username"
                            value={form.username} 
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.block}>
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Enter password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button onClick={submitForm}>{ loading ? "Processing..." : "LOGIN" }</button>
                </form>
            </div>
        </div>
    )
}