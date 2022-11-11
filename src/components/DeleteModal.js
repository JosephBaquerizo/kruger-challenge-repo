import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import styles from "../assets/components/DeleteModal.module.css";
import { employeesActions } from "../store/slices/employeesSlice";
import { modalActions } from "../store/slices/modalSlice";
import toast from 'react-hot-toast';

export default function DeleteModal() {

    const employee = useSelector((state) => state.selectedEmployee.employee);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const hideModal = () => {
        dispatch(modalActions.setDeleteModal(false));
    }

    const deleteEmployee = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        dispatch(employeesActions.removeEmployee(employee));
        dispatch(modalActions.setDeleteModal(false));
        setLoading(false);
        toast.success("Employee deleted");
    }

    return (
        <div className={styles.container} onClick={hideModal}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3>Delete Employee</h3>
                <span>Are you sure you want to delete this employee?</span>
                <div className={styles.space}></div>
                <span className={styles.warning}>The information related with <span className={styles.emphasis}>{employee.name} {employee.lastname}</span> will be permanently deleted from the system. This cannot be undone.</span>
                <button onClick={deleteEmployee}>{ loading ? "Deleting..." : "DELETE" }</button>
            </div>
        </div>

    )
}