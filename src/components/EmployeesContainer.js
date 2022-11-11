import { useDispatch } from "react-redux";
import styles from "../assets/components/EmployeesContainer.module.css";
import { modalActions } from "../store/slices/modalSlice";
import Employee from "./Employee";

export default function EmployeesContainer({ employees, filter }) {

    const dispatch = useDispatch();

    const addNewEmployee = () => {
        dispatch(modalActions.setRegisterModal(true));
    }

    const convertToDate = (dateString) => {
        const dateArray = dateString.split("-");
        const year = dateArray[0];
        const month = parseInt(dateArray[1], 10) - 1;
        const date = dateArray[2];
        return new Date(year, month, date);
    }
    // filtro de empleados de acuerdo al tipo de filtro escogido
    const filterEmployees = () => {
        console.log(employees);
        switch (filter.type) {
            case "status":
                const vaccineCondition = filter.vaccinated;
                const filteredStatus = employees.filter((item) => item.vaccinated === vaccineCondition);
                return filteredStatus;
            case "type":
                const filteredType = employees.filter((item) => item.vaccineType === filter.vaccineType);
                return filteredType;
            case "date":
                const fromDate = convertToDate(filter.fromDate);
                const toDate = convertToDate(filter.toDate);
                const filteredDate = employees.filter((item) => {
                    if (!item.vaccineDate) return false;
                    const vaccineDate = convertToDate(item.vaccineDate);
                    if (fromDate.getTime() <= vaccineDate.getTime()) {
                        if ( vaccineDate.getTime() <= toDate.getTime()) {
                            return true;
                        }
                    }
                    return false;
                });
                return filteredDate;
            default:
                return employees;
        }
    }

    return (
        <div className={styles.container}>
            <h3>Employees ({employees.length})</h3>
            <div className={styles.content}>
                {
                    filterEmployees().length > 0
                    ?
                    filterEmployees().map((item, index) => {
                        return <Employee key={index} employee={item} />
                    })
                    :
                    <div className={styles.emptyMessage}>
                        <span>No Employees</span>
                    </div>
                }
            </div>
            <button onClick={addNewEmployee}>REGISTER NEW EMPLOYEE</button>
        </div>
    )
}