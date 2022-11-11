import { useDispatch, useSelector } from "react-redux";
import styles from "../assets/components/EditModal.module.css";
import { modalActions } from "../store/slices/modalSlice";
import { useState } from "react";
import { employeesActions } from "../store/slices/employeesSlice";
import toast from 'react-hot-toast';


export default function EditModal({ employeeData }) {

    const employeeSelected = useSelector((state) => state.selectedEmployee.employee);
    const employee = employeeData ? employeeData : employeeSelected;
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        id: employee.id,
        username: employee.username, 
        password: employee.password,
        name: employee.name,
        lastname: employee.lastname,
        email: employee.email,
        birthday: employee.birthday,
        address: employee.address,
        mobile: employee.mobile,
        vaccinated: employee.vaccinated,
        vaccineType: employee.vaccineType,
		vaccineDate: employee.vaccineDate,
		dosis: employee.dosis,
        avatarColor: employee.avatarColor
    })

    const hideModal = () => {
        dispatch(modalActions.setEditModal(false));
    }

    const handleChange = (e) => {
        let value = e.target.value;
        if (e.target.name === "vaccinated") {
            value = value === "yes" ? true : false;
        }
        setForm({...form, [e.target.name]: value});
    }

    // validar fecha de vacunacion
    const validateVaccine = (_vaccinated, _vaccineDate, _vaccineType, _dosis) => {
        if (_vaccinated) {
            if (!_vaccineType) {
                setLoading(false);
                toast.error("You must enter a Vaccine Type");
                return false;
            } else if (!_vaccineDate) {
                setLoading(false);
                toast.error("You must enter a Vaccine Date");
                return false;
            } else if (!_dosis) {
                setLoading(false);
                toast.error("You must enter a Dosis");
                return false;
            }
        }
        return true;
    }

    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        // validar fecha de vacunacion (si esta vacunado)
        if (!validateVaccine(form.vaccinated, form.vaccineDate, form.vaccineType, form.dosis)) return;
        // agregamos al nuevo empleado
        const auxiliarForm = form;
        if (!form.vaccinated) {
            auxiliarForm.vaccineType = null;
            auxiliarForm.vaccineDate = null;
            auxiliarForm.dosis = null;
        }
        await new Promise(resolve => setTimeout(resolve, 1500));
        dispatch(employeesActions.addEmployee(auxiliarForm));
        dispatch(modalActions.setEditModal(false));
        setLoading(false);
        toast.success("Changes saved");
    }

    return (
        <div className={styles.container} onClick={hideModal}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3>Edit Employee's Info</h3>
                <form>
                    <div className={styles.inputsContainer}>
                        <div className={styles.block}>
                            <label htmlFor="id">ID</label>
                            <input
                                type="text"
                                name="id"
                                placeholder={form.id}
                                readOnly={true}
                                required
                            />
                        </div>
                        <div className={styles.block}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email" 
                                placeholder={form.email}
                                readOnly={true}
                                required
                            />
                        </div>
                        <div className={styles.block}>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="name" 
                                placeholder={form.name}
                                readOnly={true}
                                required
                            />
                        </div>
                        <div className={styles.block}>
                            <label htmlFor="lastname">Last Name</label>
                            <input
                                type="text"
                                name="lastname" 
                                placeholder={form.lastname}
                                readOnly={true}
                                required
                            />
                        </div>
                        <div className={styles.block}>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username" 
                                placeholder={form.username}
                                readOnly={true}
                                required
                            />
                        </div>
                        <div className={styles.block}>
                            <label htmlFor="password">Password</label>
                            <input
                                type="text"
                                name="password" 
                                placeholder={form.password}
                                readOnly={true}
                                required
                            />
                        </div>
                        <div className={styles.block}>
                            <label htmlFor="birthday">Date of Birth</label>
                            <input 
                                type="date"
                                name="birthday"
                                min="1960-01-01"
                                max="2004-01-01"
                                value={form.birthday}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.block}>
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                name="address" 
                                placeholder="Enter employee address" 
                                value={form.address}
                                onChange={handleChange}
                                maxLength="17"
                            />
                        </div>
                        <div className={styles.block}>
                            <label htmlFor="mobile">Mobile Number</label>
                            <input
                                type="tel"
                                name="mobile" 
                                placeholder="Enter employee number" 
                                value={form.mobile}
                                onChange={handleChange}
                                maxLength="10"
                            />
                        </div>
                        <div className={styles.block}>
                            <label htmlFor="vaccinated">Vaccinated</label>
                            <select name="vaccinated" value={form.vaccinated ? "yes" : "no"} onChange={handleChange}>
                                <option value="yes">yes</option>
                                <option value="no">no</option>
                            </select>
                        </div>
                        <div className={styles.block}>
                            <label htmlFor="avatarColor">Avatar Color</label>
                            <input type="color" name="avatarColor" value={form.avatarColor} onChange={handleChange} />
                        </div>
                    </div>
                    {
                        form.vaccinated
                        &&
                        <div className={styles.extraContainer}>
                            <div className={styles.inputsContainer}>
                                <div className={styles.block}>
                                    <label htmlFor="vaccineType">Vaccine Type</label>
                                    <select value={form.vaccineType} name="vaccineType" onChange={handleChange}>
                                        <option value="">--Please choose an option--</option>
                                        <option value="Sputnik">Sputnik</option>
                                        <option value="AstraZeneca">AstraZeneca</option>
                                        <option value="Pfizer">Pfizer</option>
                                        <option value={'Johnson&Johnson'}>{'Johnson&Johnson'}</option>
                                    </select>
                                </div>
                                <div className={styles.block}>
                                    <label htmlFor="vaccineDate">Vaccine Date</label>
                                    <input
                                        type="date"
                                        name="vaccineDate"
                                        min="2020-03-19"
                                        max="2022-11-01"
                                        value={form.vaccineDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={styles.block}>
                                    <label htmlFor="dosis">Dose</label>
                                    <select value={form.dosis} name="dosis" onChange={handleChange}>
                                        <option value="">--Please choose an option--</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    }
                    <div className={styles.buttonContainer}>
                        <button onClick={submitForm}>{ loading ? "Saving changes..." : "SAVE CHANGES"}</button>
                        {/*<button onClick={hideModal}>CANCEL</button>*/}
                    </div>
                </form>
        </div>
        </div>
    )
}