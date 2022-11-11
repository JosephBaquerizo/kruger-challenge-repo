import { createSlice } from '@reduxjs/toolkit';

const employeesSlice = createSlice({
	name: 'employees',
	initialState: { 
		employees: [
            {
                username: "admin",
                password: "admin"
            },
			{ 
				id: "0919910091",
				username: "josanbaq",
				password: "123456",
				name: "Joseph",
				lastname: "Baquerizo",
				email: "josanbaq@gmail.com",
				birthday: "1997-03-24",
				address: "Entre Rios malecon 117",
				mobile: "0999482008",
				vaccinated: true,
				vaccineType: "Pfizer",
				vaccineDate: "2020-04-01",
				dosis: "2",
				avatarColor: "#964b00"
			},
			{ 
				id: "0929103281",
				username: "jesunava",
				password: "jesu123",
				name: "Jesus",
				lastname: "Navarro",
				email: "jesusnavarro99@hotmail.com",
				birthday: "1997-03-24",
				address: "Entre Rios malecon 117",
				mobile: "0999482008",
				vaccinated: true,
				vaccineType: "Sputnik",
				vaccineDate: "2020-05-02",
				dosis: "1",
				avatarColor: "#3584e4"
			},
			{ 
				id: "1203245683",
				username: "claucerv",
				password: "123pony123",
				name: "Claudia",
				lastname: "Cervantes",
				email: "claudiac@yahoo.com",
				birthday: "1997-03-24",
				address: "Entre Rios malecon 117",
				mobile: "0999482008",
				vaccinated: true,
				vaccineType: "AstraZeneca",
				vaccineDate: "2020-05-02",
				dosis: "2",
				avatarColor: "#d30000"
			},
			{ 
				id: "1102939294",
				username: "jonasola",
				password: "surfer14",
				name: "Jonathan",
				lastname: "Solano",
				email: "jonsolan@gmail.com",
				birthday: "1997-03-24",
				address: "Entre Rios malecon 117",
				mobile: "0999482008",
				vaccinated: true,
				vaccineType: "Johnson&Johnson",
				vaccineDate: "2021-07-02",
				dosis: "1",
				avatarColor: "#7f3667"
			},
			{ 
				id: "0928329381",
				username: "belenca",
				password: "senacontra",
				name: "Belen",
				lastname: "Calderon",
				email: "belencita@gmail.com",
				birthday: "1997-03-24",
				address: "Entre Rios malecon 117",
				mobile: "0999482008",
				vaccinated: false,
				vaccineType: "",
				vaccineDate: "",
				dosis: "",
				avatarColor: "#3584e4"
			},
        ]
	},
	reducers: {
		removeEmployee(state, action) {
			const employeeToRemove = action.payload;
			state.employees = state.employees.filter((item) => item.id !== employeeToRemove.id);
			return;
		},
		addEmployee(state, action) {
			const newEmployee = action.payload;
			const employeeExists = state.employees.find((item) => item.id === newEmployee.id);
			if (employeeExists) {
				const foundIndex = state.employees.findIndex((item) => item.id === employeeExists.id);
				state.employees[foundIndex] = newEmployee;
				return;
			}
			state.employees = [...state.employees, newEmployee];
			return;
		},
	}
});

export const employeesActions = employeesSlice.actions;

export default employeesSlice.reducer;