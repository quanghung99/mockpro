import { Backdrop, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import ArticleDetail from 'components/ArticleDetail';
import EditArticlePage from 'components/EditArticle/index';
import LoginPage from 'components/LogIn';
import ProfilePage from 'components/Profile';
import Settings from 'components/Settings';
import SignUpPage from 'components/SignUp';
import Article from 'features/articles/Article';
import { articleAction } from 'features/articles/articleSlice';
import { authAction } from 'features/auth/authSlice';
import { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WithAuth } from 'utils/authGuard';
import { PrivateRoute } from 'utils/privateRoute';
import './App.css';
import Footer from './components/common/Footer';
import Header from './components/common/Header';

function App() {
	const isLoggingAuth = useAppSelector((state) => state.auth.isLogging);
	const isLoadingArticle = useAppSelector((state) => state.article.isLoading);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(authAction.getCurrentUser());
		dispatch(articleAction.getListArticle({}));
	}, [dispatch]);
	// console.log(
	// 	'Boolean(isLoadingArticle || isLoggingAuth)',
	// 	isLoadingArticle,
	// 	isLoggingAuth
	// );
	return (
		<div className="App">
			<Header />
			<Switch>
				<Redirect exact from="/" to="/blog" />{' '}
				<Route component={WithAuth(LoginPage)} path="/login" />
				<Route component={SignUpPage} path="/register" />
				<Route path="/blog" component={Article} />
				<Route path="/setting" component={PrivateRoute(Settings)} />
				<Route path="/profile" component={PrivateRoute(ProfilePage)} />
				<Route path="/article/:slug" component={ArticleDetail}></Route>
				<Route path="/editor/:slug" component={EditArticlePage}></Route>
				<Route path="/editor" component={EditArticlePage}></Route>
			</Switch>
			<Footer />
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
				open={Boolean(isLoadingArticle || isLoggingAuth)}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		</div>
	);
}

export default App;
