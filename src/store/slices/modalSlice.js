import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
	name: 'modal',
	initialState: { 
		showRegister: false,
		showDelete: false,
        showEdit: false,
	},
	reducers: {
		setRegisterModal(state, action) {
			state.showRegister = action.payload;
		},
		setDeleteModal(state, action) {
			state.showDelete = action.payload;
		},
        setEditModal(state, action) {
            state.showEdit = action.payload;
        }
	}
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;