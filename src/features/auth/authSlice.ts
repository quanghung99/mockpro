import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginData, signUpData, userModel } from 'models';

interface authType {
	isLogged: boolean;
	isLogging: boolean;
	userState: userModel;
}

const initialState: authType = {
	isLogged: false,
	isLogging: false,
	userState: {
		user: {
			email: '',
			token: '',
			username: '',
			bio: '',
			image: '',
		},
	},
};

const authSlice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		login(state, action: PayloadAction<loginData>) {
			state.isLogging = true;
		},
		getCurrentUser(state) {
			state.isLogging = true;
		},
		loginSuccess(state, action: PayloadAction<userModel>) {
			state.userState.user = action.payload.user;
			state.isLogged = true;
			state.isLogging = false;
		},
		loginFaile(state) {
			state.isLogged = false;
			state.isLogging = false;
		},
		signUp(state, action: PayloadAction<signUpData>) {
			state.isLogging = true;
		},
	},
});

const authReducer = authSlice.reducer;
export const authAction = authSlice.actions;
export default authReducer;
