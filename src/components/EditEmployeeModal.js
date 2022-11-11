import { useState } from "react";
import toast from "react-hot-toast";
import styles from "../assets/components/EditEmployeeModal.module.css";

export default function EditEmployeeModal({ hideModal, employee }) {

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        birthday: employee.birthday,
        address: employee.address,
        mobile: employee.mobile,
        vaccinated: employee.vaccinated,
        vaccineType: employee.vaccineType,
        vaccineDate: employee.vaccineDate,
        dosis: employee.dosis,
        avatarColor: employee.avatarColor
    })

    const handleChange = (e) => {
        let value = e.target.value;
        if (e.target.name === "vaccinated") {
            value = value === "yes" ? true : false;
        }
        setForm({...form, [e.target.name]: value });
    }

    const validateVaccinatedDate = (_vaccinated, _vaccineDate) => {
        if (_vaccinated) {
            if (!_vaccineDate) {
                setLoading(false);
                toast.error("You must enter a vaccination date");
                return false;
            }
        }
        return true;
    }

    const submitForm = (e) => {
        e.preventDefault();
        if (!validateVaccinatedDate(form.vaccinated, form.vaccineDate)) return;

    }

    return (
        <div className={styles.container} onClick={hideModal}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3>Edit Information</h3>
                <form>
                    <div className={styles.inputsContainer}>
                        <div className={styles.block}>
                            <label htmlFor="birthday">Date of Birth</label>
                            <input 
                                type="date" 
                                name="birthday" 
                                value={form.birthday} 
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.block}>
                            <label htmlFor="address">Address</label>
                            <input 
                                type="text" 
                                name="address" 
                                value={form.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.block}>
                            <label htmlFor="mobile">Phone Number</label>
                            <input 
                                type="text" 
                                name="mobile" 
                                value={form.mobile}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.block}>
                            <label htmlFor="vaccinated">Vaccinated</label>
                            <select name="vaccinated" value={form.vaccinated ? "yes" : "no"} onChange={handleChange}>
                                <option value="yes">yes</option>
                                <option value="no">no</option>
                            </select>
                        </div>
                    </div>
                    {
                        form.vaccinated
                        &&
                        <div className={styles.extraContainer}>
                            <div className={styles.inputsContainer}>
                                <div className={styles.block}>
                                    <label htmlFor="vaccineType">Vaccine Type</label>
                                    <select name="vaccineType" value={form.vaccineType} onChange={handleChange}>
                                        <option value="Sputnik" selected={form.vaccineType==="Sputnik"}>Sputnik</option>
                                        <option value="AstraZeneca" selected={form.vaccineType==="AstraZeneca"}>AstraZeneca</option>
                                        <option value="Pfizer" selected={form.vaccineType==="Pfizer"}>Pfizer</option>
                                        <option value={'Johnson&Johnson'} selected={form.vaccineType==='Johnson&Johnson'}>{'Johnson&Johnson'}</option>
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
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                                <hr/>
                            </div>
                        </div>
                    }
                    <div className={styles.buttonContainer}>
                        <button onClick={submitForm}>{ loading ? "Saving changes..." : "SAVE CHANGES"}</button>
                        <button onClick={hideModal}>CANCEL</button>
                    </div>
                </form>
            </div>
        </div>
    )
}