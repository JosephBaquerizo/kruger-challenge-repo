import React, { lazy, Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import styles from "../assets/pages/Employee.module.css";
import Avatar from "../components/Avatar";
import Spinner from "../components/Spinner";
import { modalActions } from "../store/slices/modalSlice";
import { toast } from "react-hot-toast";

const LazyEditModal = lazy(() => import("../components/EditModal"));

export default function Employee() {

    // el id es en realidad el username (unico) del empleado
    const { id } = useParams();

    const employees = useSelector((state) => state.employees.employees);
    const showEditModal = useSelector((state) => state.modal.showEdit);
    const employee = employees.find((item) => item.username === id);
    const dispatch = useDispatch();

    const setShowEditModal = () => {
        dispatch(modalActions.setEditModal(true));
    }

    // para hacer un map de la info del employee
    const employeeData = [
        {
            type: "id",
            value: employee.id
        },
        {
            type: "email",
            value: employee.email
        },
        {
            type: "name",
            value: employee.name
        },
        {
            type: "lastname",
            value: employee.lastname
        },
        {
            type: "birthday",
            value: employee.birthday
        },
        {
            type: "address",
            value: employee.address
        },
        {
            type: "mobile",
            value: employee.mobile
        },
        {
            type: "vaccinated",
            value: employee.vaccinated ? "yes" : "no"
        },
        {
            type: "vaccine type",
            value: employee.vaccineType
        },
        {
            type: "vaccine date",
            value: employee.vaccineDate
        },
        {
            type: "dosis",
            value: employee.dosis
        },
        {
            type: "avatar color",
            value: employee.avatarColor
        }
    ];

    useEffect(() => {
        const employeeEntries = Object.entries(employee);
        const employeeEmpty = employeeEntries.filter((item) => {
            console.log("ITEM ACTUAL", item);
            if (item[0] === "vaccineType" || item[0] === "vaccineDate" || item[0] === "dosis" || item[0] === "vaccinated") {
                console.log("no le para bola a ", item);
                return false;
            }
            return !item[1];
        });
        if (employeeEmpty.length > 0) {
            toast("Please complete your information");
        }
    }, [employee]);

    return (
        <div className={styles.container}>
            { showEditModal && <Suspense fallback={<Spinner/>}><LazyEditModal employeeData={employee}/></Suspense> }
            <div className={styles.content}>
                <div className={styles.topContent}>
                    <div className={styles.greetings}>
                        <h2>Welcome {id}</h2>
                        <Avatar name={id} avatarColor={employee.avatarColor}/>
                    </div>
                    <div className={styles.positionContainer}>
                        <div>
                            <span>EMPLOYEE</span>
                        </div>
                    </div>
                </div>
                <div className={styles.middleContent}>
                    <div className={styles.informationTop}>
                        <h3>Information</h3>
                        <BsPencilSquare className={styles.icon} onClick={setShowEditModal} />
                    </div>
                    <div className={styles.infoContainer}>
                        {
                            employeeData.map((item, index) => {
                                return (
                                    <div key={index} className={styles.block}>
                                        <div className={styles.parameter}>
                                            <span>{item.type}</span>
                                        </div>
                                        <div className={styles.value}>
                                            <span>{item.value}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}