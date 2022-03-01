import './App.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { useEffect } from 'react';
import { useAppDispatch } from 'app/hooks';
import { articleAction } from 'features/articles/articleSlice';
import Article from 'features/articles/Article';
import { Switch, Route } from 'react-router-dom';
function App() {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(
			articleAction.getListArticle({
				limit: 10,
				offset: 0,
			})
		);
	}, [dispatch]);
	return (
		<div className="App">
			<Header />
			<Switch>
				<Route path="/blog" component={Article} />
			</Switch>
			<Footer />
		</div>
	);
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
