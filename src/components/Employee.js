import styles from "../assets/components/Employee.module.css";
import Avatar from "./Avatar";
import { FaTrashAlt } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { modalActions } from "../store/slices/modalSlice";
import { selectedEmployeeActions } from "../store/slices/selectedEmployeeSlice";


export default function Employee({ employee }) {

    const { name, lastname, avatarColor } = employee;

    const dispatch = useDispatch();

    const showDelete = () => {
        dispatch(selectedEmployeeActions.setEmployee(employee));
        dispatch(modalActions.setDeleteModal(true));
    }

    const showEdit = () => {
        dispatch(selectedEmployeeActions.setEmployee(employee));
        dispatch(modalActions.setEditModal(true));
    }

    return (
        <div className={styles.container}>
            <div className={styles.userInfo}>
                <Avatar name={name} avatarColor={avatarColor} />
                <span>{name} {lastname}</span>
            </div>
            <div className={styles.userActions}>
                <div className={styles.iconContainer} onClick={showEdit}>
                    <BsPencilSquare style={{ "color": "rgb(73, 73, 73)" }} className={styles.icon} />
                </div>
                <div className={styles.iconContainer} onClick={showDelete}>
                    <FaTrashAlt style={{ "color": "rgb(226, 38, 38)" }} className={styles.icon} />
                </div>
            </div>
        </div>
    )
}