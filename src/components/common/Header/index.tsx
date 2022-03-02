import {
	AppBar,
	Avatar,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { articleAction } from 'features/articles/articleSlice';
import { authAction } from 'features/auth/authSlice';
import { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import styles from './styles.module.scss';

const Header = () => {
	const auth = useAppSelector((state) => state.auth);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const dispatch = useAppDispatch();
	const navigate = useHistory();
	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleSignOut = () => {
		localStorage.removeItem('access_token');
		handleClose();
		dispatch(authAction.signOut());
		dispatch(articleAction.getListArticle());
	};
	return (
		<AppBar
			position="sticky"
			sx={{ backgroundColor: '#ffffff', color: 'black' }}
		>
			<Container maxWidth="lg">
				<div className={styles.navbar}>
					<nav>
						<ul>
							<li>
								<Typography>
									<NavLink to="/blog">Home</NavLink>
								</Typography>
							</li>
							<li>
								<Typography>
									<NavLink to="/about">About us</NavLink>
								</Typography>
							</li>
						</ul>
					</nav>
					<nav className={styles.navbarLeft}>
						<ul>
							{auth.isLogged ? (
								<li>
									<div>
										<IconButton
											size="small"
											aria-label="account of current user"
											aria-controls="menu-appbar"
											aria-haspopup="true"
											onClick={handleMenu}
											sx={{ padding: '0px', color: 'black' }}
										>
											<Avatar alt="User avt" src={auth.userState.user.image} />
											<Typography>
												<NavLink to="#">{auth.userState.user.username}</NavLink>
											</Typography>
										</IconButton>
										<Menu
											id="menu-appbar"
											anchorEl={anchorEl}
											anchorOrigin={{
												vertical: 'bottom',
												horizontal: 'right',
											}}
											keepMounted
											transformOrigin={{
												vertical: 'top',
												horizontal: 'right',
											}}
											open={Boolean(anchorEl)}
											onClose={handleClose}
										>
											<MenuItem
												onClick={() => {
													navigate.push('/setting');
													handleClose();
												}}
											>
												Setting
											</MenuItem>
											<MenuItem
												onClick={() => {
													navigate.push('/profile');
													handleClose();
												}}
											>
												Profile
											</MenuItem>
											<MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
										</Menu>
									</div>
								</li>
							) : (
								<>
									<li>
										<Typography>
											<NavLink to="/login">Sign In</NavLink>
										</Typography>
									</li>
									<li>
										<Typography>
											<NavLink to="/register">Sign Up</NavLink>
										</Typography>
									</li>
								</>
							)}
						</ul>
					</nav>
				</div>
			</Container>
		</AppBar>
	);
};

export default Header;
