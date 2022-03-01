import './App.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { Route, Switch } from 'react-router-dom';
import LoginPage from 'components/LogIn';
import SignUpPage from 'components/SignUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Backdrop, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { authAction } from 'features/auth/authSlice';
import { WithAuth } from 'utils/authGuard';

function App() {
	const isLogging = useAppSelector((state) => state.auth.isLogging);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(authAction.getCurrentUser());
	}, [dispatch]);
	return (
		<div className="App">
			<Header />
			<Switch>
				<Route component={WithAuth(LoginPage)} path="/login" />
				<Route component={SignUpPage} path="/register" />
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
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={isLogging}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		</div>
	);
}

export default App;
