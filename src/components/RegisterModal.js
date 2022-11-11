import styles from "../assets/components/RegisterModal.module.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { employeesActions } from "../store/slices/employeesSlice";
import toast from "react-hot-toast";
import { modalActions } from "../store/slices/modalSlice";


export default function RegisterModal() {

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        id: "",
        username: "", 
        password: "",
        name: "",
        lastname: "",
        email: "",
        birthday: "",
        address: "",
        mobile: "",
        vaccinated: false,
        vaccineType: "",
		vaccineDate: "",
		dosis: "",
        avatarColor: ""
    })

    const dispatch = useDispatch();

    const hideModal = () => {
        dispatch(modalActions.setRegisterModal(false));
    }

    // manejamos las entradas de email, firstname, lastname
    const handleChange = (e) => {
        const value = e.target.value;
        setForm({...form, [e.target.name]: value});
    }

    // solo permitimos ingreso de numeros en el id
    const handleID = (e) => {
        const value = e.target.value;
        const re1 = /[.,\s]/;
        const re =  /[0-9]+[0-9]*$/;
        if (value === '' || re.test(value)) {
            if (!re1.test(value)) {
                setForm({...form, [e.target.name]: value})
            };
        };
    }

    // validar ID
    const evaluateID = (id) => {
        if (id.length !== 10) {
            setLoading(false);
            toast.error("ID must be 10 digits long");
            return false;
        }
        return true;
    }

    // validar email
    const evaluateEmail = (email)  => {
		let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!re.test(email)) {
            setLoading(false);
            toast.error("You must enter a valid email");
            return false;
        }
        return true;
	}

    // validar name y lastname
    const evaluateText = (text, parameter) => {
        const regex = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
        if (!regex.test(text)) {
            if (text.length < 2) {
                setLoading(false);
                toast.error(`You must enter a ${parameter}`);
                return false;
            }
            setLoading(false);
            toast.error(`${parameter} must only have letters`);
            return false;
        }
        return true;
    }

    // creamos username para el empleado (deberia hacerlo el backend)
    const createUsername = (name, lastname) => {
        // primeras 2 letras de firstname y de lastname, numero aleatorio de 2 digitos
        const first = name.slice(0,2).toLowerCase();
        const second = lastname.slice(0,2).toLowerCase();
        const num = Math.floor(Math.random() * 90) + 10;
        const newUsername = first + second + num.toString();
        return newUsername;
    }

    // creamos password para el empleado (deberia hacerlo el backend)
    const createPassword = () => {
        // numero aleatorio de 5 digitos
        const newPassword = Math.floor(Math.random()*90000) + 10000;
        return newPassword.toString();
    }

    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        // evaluate id
        if (!evaluateID(form.id)) return;
        // evaluate email
        if (!evaluateEmail(form.email)) return;
        // evaluate name
        if (!evaluateText(form.name, "First Name")) return;
        // evaluate last name
        if (!evaluateText(form.lastname, "Last Name")) return;
        // si todo es valido, creo el usuario
        const newUsername = createUsername(form.name, form.lastname);
        const newPassword = createPassword(form.name, form.lastname);
        let newForm = form;
        newForm.username = newUsername;
        newForm.password = newPassword;
        await new Promise(resolve => setTimeout(resolve, 1500));
        dispatch(employeesActions.addEmployee(newForm));
        dispatch(modalActions.setRegisterModal(false));
        setLoading(false);
        // regresamos toast con el nuevo username y password creados
        toast(
            <div className={styles.toast}>
                <span>Employee registered!</span>
                <div className={styles.space}></div>
                <div>
                    <b>Username: </b><span>{newUsername}</span>
                </div>
                <div>
                    <b>Password: </b><span>{newPassword}</span>
                </div>
                <button onClick={() => toast.dismiss()}>CLOSE</button>
            </div>,
            {
                duration: Infinity
            }
        );
    }

    return (
        <div className={styles.container} onClick={hideModal}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3>Register Employee</h3>
                <form>
                    <div className={styles.formContent}>
                        <div className={styles.block}>
                            <label htmlFor="id">ID</label>
                            <input 
                                type="text" 
                                name="id" 
                                placeholder="Enter id"
                                value={form.id} 
                                onChange={handleID}
                                maxLength="10"
                                required
                            />
                        </div>
                        <div className={styles.block}>
                            <label htmlFor="email">Email</label>
                            <input 
                                type="text" 
                                name="email" 
                                placeholder="Enter email"
                                value={form.email} 
                                onChange={handleChange} 
                                required
                            />
                        </div>
                        <div className={styles.block}>
                            <label htmlFor="name">First Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                placeholder="Enter first name"
                                value={form.name} 
                                onChange={handleChange} 
                                maxLength="17"
                                required
                            />
                        </div>
                        <div className={styles.block}>
                            <label htmlFor="lastname">Last Name</label>
                            <input 
                                type="text" 
                                name="lastname" 
                                placeholder="Enter last name"
                                value={form.lastname} 
                                onChange={handleChange} 
                                maxLength="17"
                                required
                            />
                        </div>
                    </div>
                    <button onClick={submitForm}>{ loading ? "Registering..." : "REGISTER" }</button>
                </form>
            </div>
        </div>
    )
}