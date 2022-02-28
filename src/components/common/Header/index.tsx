import { AppBar, Box, Container, Grid, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './styles.scss';

const Header = () => {
	return (
		<AppBar position="sticky" sx={{ backgroundColor: '#ffffff' }}>
			<Container maxWidth="lg">
				<div className="navbar">
					<nav className="navbar-right">
						<ul>
							<li>
								<Typography>Home</Typography>
							</li>
							<li>
								<Typography>About us</Typography>
							</li>
						</ul>
					</nav>
					<nav className="navbar-left">
						<ul>
							<li>
								<Typography sx={{ display: 'flex', alignItems: 'center' }}>
									<AccountCircleIcon className="icon-header" /> Login
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
