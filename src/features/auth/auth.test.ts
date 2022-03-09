import { takeLatest } from 'redux-saga/effects';
import authSaga, {
	handleChangeUserProfile,
	handleGetUserProfile,
	handleSignUp,
	hanleLogin,
} from './authSaga';
import { authAction } from './authSlice';

describe('Auth Saga', () => {
	const genObject = authSaga();

	it('Should wait for latest Login action and call hanleLogin', () => {
		expect(genObject.next().value).toEqual(
			takeLatest(authAction.login.type, hanleLogin)
		);
	});
	it('Should wait for latest signUp action and call hanleSignUp', () => {
		expect(genObject.next().value).toEqual(
			takeLatest(authAction.signUp.type, handleSignUp)
		);
	});

	it('Should wait for latest getCurrentUser action and call handleGetCurrentProfile', () => {
		expect(genObject.next().value).toEqual(
			takeLatest(authAction.getCurrentUser.type, handleGetUserProfile)
		);
	});

	it('Should wait for latest updateUserProfile action and call handleChangeUserProfile', () => {
		expect(genObject.next().value).toEqual(
			takeLatest(authAction.updateUserProfile.type, handleChangeUserProfile)
		);
	});
	it('should be done on next iteration', () => {
		expect(genObject.next().done).toBeTruthy();
	});
});
