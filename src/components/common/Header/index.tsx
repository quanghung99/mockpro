import { AppBar, Box, Container, Grid, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from './styles.module.scss';
import { NavLink } from 'react-router-dom';

const Header = () => {
	return (
		<AppBar position="sticky" sx={{ backgroundColor: '#ffffff' }}>
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
									<NavLink to="/about-us">About us</NavLink>
								</Typography>
							</li>
						</ul>
					</nav>
					<nav className={styles.navbarLeft}>
						<ul>
							<li>
								<Typography sx={{ display: 'flex', alignItems: 'center' }}>
									<AccountCircleIcon className={styles.iconHeader} /> Login
								</Typography>
							</li>
							<li></li>
						</ul>
					</nav>
				</div>
			</Container>
		</AppBar>
	);
};

export default Header;
