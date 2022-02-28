import { userModel } from 'models';
import axiosCustom from './axiosCustom';

export const userApi = {
	getCurrentUser(): Promise<userModel> {
		const url = 'user';
		return axiosCustom.get(url);
	},
	updateCurrentUser(updateUserData: userModel): Promise<userModel> {
		const url = 'user';
		return axiosCustom.put(url, updateUserData);
	},
    
};
