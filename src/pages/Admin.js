import React, { lazy, Suspense, useState } from "react";
import { useSelector } from 'react-redux';
import styles from "../assets/pages/Admin.module.css";
import EmployeesContainer from "../components/EmployeesContainer";
import OptionsContainer from "../components/OptionsContainer";
import Spinner from "../components/Spinner";

// no aparecen inicialmente, los puedo importar cuando los requiera
const LazyRegisterModal = lazy(() => import("../components/RegisterModal"));
const LazyEditModal = lazy(() => import("../components/EditModal"));
const LazyDeleteModal = lazy(() => import("../components/DeleteModal"));


export default function Admin() {

    const username = useSelector((state) => state.user.username);
    const employees = useSelector((state) => state.employees.employees.slice(1));
    const modals = useSelector((state) => state.modal);

    /* 
        Dependiendo del tipo de filtro seleccionado, accedo por medio 
        de un bloque switch a los atributos del subfiltro seleccionado
        en el componente EmployeesContainer
    */

    const [filter, setFilter] = useState({
        type: "none",
        vaccinated: true,
        vaccineType: "Sputnik",
        fromDate: "2020-04-01",
        toDate: "2022-10-01"
    });
//
    return (
        <main className={styles.container}>
            { modals.showRegister && <Suspense fallback={<Spinner/>}><LazyRegisterModal /></Suspense> }
            { modals.showEdit && <Suspense fallback={<Spinner/>}><LazyEditModal /></Suspense> }
            { modals.showDelete && <Suspense fallback={<Spinner/>}><LazyDeleteModal /></Suspense> }
            <div className={styles.content}>
                <section className={styles.topContent}>
                    <div className={styles.greetings}>
                        <h2>Welcome {username}</h2>
                    </div>
                    <div className={styles.positionContainer}>
                        <div>
                            <span>ADMIN</span>
                        </div>
                    </div>
                </section>
                <section className={styles.generalContent}>
                    <EmployeesContainer employees={employees} filter={filter}/>
                    <OptionsContainer filter={filter} setFilter={setFilter}/>
                </section>
            </div>
        </main>
    )
}