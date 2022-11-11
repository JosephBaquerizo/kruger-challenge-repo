import styles from "../assets/components/OptionsContainer.module.css";
import { useState } from "react";

const primaryOptions = [
    {
        value: "none",
        label: "None"
    },
    {
        value: "status",
        label: "Vaccination Status"
    },
    {
        value: "type",
        label: "Vaccine Type"
    },
    {
        value: "date",
        label: "Vaccination Date Range"
    },
]

export default function OptionsContainer({  filter, setFilter }) {

    /*Tuve que crear un filtro auxiliar para poder realizar el filtro al momento de haceer click*/
    const [loading, setLoading] = useState(false);
    const [auxiliarFilter, setAuxiliarFilter] = useState(filter);

    // handle change para mostrar el submenu de filtros
    const handleChange = (e) => {
        let value = e.target.value;
        if (e.target.name === "vaccinated") {
            value = value === "Vaccinated" ? true : false;
        }
        setAuxiliarFilter({...auxiliarFilter, [e.target.name]: value});
    }

    const submitForm = (e) => {
        e.preventDefault();
        setLoading(true);
        // aqui seteo los cambios al state
        setFilter(auxiliarFilter);
        setLoading(false);
    }

    // dependiendo del tipo de filtro seleccionado, se muestra un submenu diferente
    const renderSwitch = (param) => {
        switch(param) {
            case "status":
                return (
                    <fieldset className={styles.underfield}>
                        <legend>Select status</legend>
                        <div className={styles.block}>
                            <label htmlFor="vaccinated">Vaccinated</label>
                            <input 
                                type="radio" 
                                name="vaccinated" 
                                value="Vaccinated"  
                                checked={auxiliarFilter.vaccinated}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.block}>
                            <label htmlFor="vaccinated">No Vaccinated</label>
                            <input 
                                type="radio" 
                                name="vaccinated" 
                                value="Not Vaccinated"
                                checked={!auxiliarFilter.vaccinated}
                                onChange={handleChange}
                            />
                        </div>
                    </fieldset>
                )
            case "type":
                return (
                    <fieldset className={styles.underfield}>
                        <legend>Select vaccine type</legend>
                        <div className={styles.block}>
                            <label htmlFor="vaccineType">Sputnik</label>
                            <input 
                                type="radio" 
                                name="vaccineType" 
                                value="Sputnik" 
                                checked={auxiliarFilter.vaccineType === "Sputnik"}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.block}>
                            <label htmlFor="vaccineType">AstraZeneca</label>
                            <input 
                                type="radio" 
                                name="vaccineType" 
                                value="AstraZeneca" 
                                checked={auxiliarFilter.vaccineType === "AstraZeneca"}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.block}>
                            <label htmlFor="vaccineType">Pfizer</label>
                            <input 
                                type="radio" 
                                name="vaccineType" 
                                value="Pfizer"
                                checked={auxiliarFilter.vaccineType === "Pfizer"}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.block}>
                            <label htmlFor="vaccineType">{`Johnson&Johnson`}</label>
                            <input 
                                type="radio" 
                                name="vaccineType" 
                                value={`Johnson&Johnson`} 
                                checked={auxiliarFilter.vaccineType === `Johnson&Johnson`}
                                onChange={handleChange}
                            />
                        </div>
                    </fieldset>
                )
            case "date":
                return (
                    <fieldset className={styles.underfield}>
                        <legend>Select date range</legend>
                        <div className={styles.block}>
                            <label htmlFor="fromDate">From</label>
                            <input 
                                name="fromDate" 
                                type="date"  
                                value={auxiliarFilter.fromDate}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.block}>
                            <label htmlFor="toDate">To</label>
                            <input 
                                name="toDate" 
                                type="date" 
                                value={auxiliarFilter.toDate}
                                onChange={handleChange}
                            />
                        </div>
                    </fieldset>
                )
            default:
                return <></>
        }
    }

    return (
        <div className={styles.container}>
            <h3>Filter</h3>
            <div className={styles.content}>
                <form>
                    <fieldset className={styles.fieldset}>
                        <legend>Select filter</legend>
                        {
                            primaryOptions.map((item, index) => {
                                return (
                                    <div key={index} className={styles.block}>
                                        <label htmlFor="type">{item.label}</label>
                                        <input 
                                            type="radio" 
                                            name="type" 
                                            value={item.value} 
                                            checked={auxiliarFilter.type === item.value} 
                                            onChange={handleChange} 
                                        />
                                    </div>
                                )
                            })
                        }
                    </fieldset>
                    { renderSwitch(auxiliarFilter.type) }
                    <button onClick={submitForm}>{ loading ? "Filtering..." : "FILTER" }</button>
                </form>
            </div>
        </div>

    )
}