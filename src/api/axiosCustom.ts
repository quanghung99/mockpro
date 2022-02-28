import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const checkToken = (): string => {
	const token = localStorage.getItem('access_tokenn');
	return token ? token : '';
};

const axiosCustom = axios.create({
	headers: {
		'Content-type': 'application/json',
	},
	baseURL: 'https://api.realworld.io/api',
});

// Add a request interceptor
axiosCustom.interceptors.request.use(
	function (config: AxiosRequestConfig) {
		// Do something before request is sent
		const token = checkToken();
		config.headers = {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		};
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
axiosCustom.interceptors.response.use(
	function (response: AxiosResponse) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response.data;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	}
);

export default axiosCustom;
