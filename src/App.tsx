import { authApi } from 'api';
import { userModel } from 'models';
import React, { useEffect } from 'react';
import './App.css';
function App() {
	useEffect(() => {
		(async () => {
			const response: userModel = await authApi.login({
				user: {
					email: 'quanghoa123@gmail2.com',
					password: '123',
				},
			});
			console.log(response);
		})();
	}, []);

	return <div className="App"></div>;
}

export default App;
