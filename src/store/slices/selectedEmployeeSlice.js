import { createSlice } from '@reduxjs/toolkit';

const selectedEmployeeSlice = createSlice({
	name: 'selectedEmployee',
	initialState: { 
		employee: {}
	},
	reducers: {
		setEmployee(state, action) {
			state.employee = action.payload;
		},
	}
});

export const selectedEmployeeActions = selectedEmployeeSlice.actions;

export default selectedEmployeeSlice.reducer;