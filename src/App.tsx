import { authApi, userApi, profilesApi, articlesApi, commentApi } from 'api';
import {
	articleModel,
	articlesFilterd,
	profileModel,
	articleSlug,
	userModel,
	commentModel,
	commentList,
	tagModel,
} from 'models';
import React, { useEffect } from 'react';
import './App.css';
function App() {
	useEffect(() => {
		(async () => {
			localStorage.setItem(
				'access_tokenn',
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZoYWkxMjNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJ2aGFpMTIzIiwicGFzc3dvcmQiOiIkMmEkMTAkdGMwN1IzeVdYdDB6azVZSjdVQU1uT2h1bWlJSG9qd09vV2FDSC5EUEdHQ3JBSzJpMHMzRlMiLCJiaW8iOm51bGwsImltYWdlIjoiaHR0cHM6Ly9hcGkucmVhbHdvcmxkLmlvL2ltYWdlcy9zbWlsZXktY3lydXMuanBlZyIsImlhdCI6MTY0NjA0MDM2NywiZXhwIjoxNjUxMjI0MzY3fQ.ObExAfzdeXeLqmu7V-M4rWvL6Mrg2gsF8UPzMPRLdcw		'
			);

			const response: tagModel = await articlesApi.getTag();
			console.log(response);
		})();
	}, []);

	return <div className="App"></div>;
}

export default App;
/*
user: {
	email: 'vhai123@gmail.com',
	password: 'vhai123',
	Create-a-new-implementation-1
},
slug: abc-26901
commentId: 7490
token:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZoYWkxMjNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJ2aGFpMTIzIiwicGFzc3dvcmQiOiIkMmEkMTAkdGMwN1IzeVdYdDB6azVZSjdVQU1uT2h1bWlJSG9qd09vV2FDSC5EUEdHQ3JBSzJpMHMzRlMiLCJiaW8iOm51bGwsImltYWdlIjoiaHR0cHM6Ly9hcGkucmVhbHdvcmxkLmlvL2ltYWdlcy9zbWlsZXktY3lydXMuanBlZyIsImlhdCI6MTY0NjA0MDM2NywiZXhwIjoxNjUxMjI0MzY3fQ.ObExAfzdeXeLqmu7V-M4rWvL6Mrg2gsF8UPzMPRLdcw
*/
