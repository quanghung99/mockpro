export const checkToken = (): string => {
	const token = localStorage.getItem('access_tokenn');
	return token ? token : '';
};
