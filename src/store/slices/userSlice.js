import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'user',
	initialState: { 
		username: null,
	},
	reducers: {
		setUser(state, action) {
			state.username = action.payload;
		},
	}
});

export const userActions = userSlice.actions;

export default userSlice.reducer;