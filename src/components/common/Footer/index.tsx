import { Container, Box, Grid, Typography } from '@mui/material';
// import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

const Footer = () => {
	return (
		<footer>
			<Container>
				<Box sx={{ paddingTop: '40px', paddingBottom: '80px' }}>
					<Grid container spacing={3}>
						<Grid item lg={6} sm={12}>
							<div>
								<Typography textAlign={'left'} variant="h5">
									Blog
								</Typography>
								<Typography sx={{ fontWeight: 'bold' }}>
									Join our newsletter!
								</Typography>
								<Typography>No spam, guaranteed.</Typography>
							</div>
						</Grid>
						<Grid item lg={6} sm={12} container spacing={3}>
							<Grid item lg={3} sm={6}>
								<Typography>Products</Typography>
								<Typography>
									<Link to="/">MUI Core</Link>
								</Typography>
								<Typography>
									<Link to="/">MUI X</Link>
								</Typography>
								<Typography>
									<Link to="/">Templates</Link>
								</Typography>
								<Typography>
									<Link to="/">Design kits</Link>
								</Typography>
							</Grid>
							<Grid item lg={3} sm={6}>
								<Typography>Resources</Typography>
								<Typography>
									<Link to="/">Material Icons</Link>
								</Typography>
								<Typography>
									<Link to="/">Free templates</Link>
								</Typography>
								<Typography>
									<Link to="/">Components</Link>
								</Typography>
								<Typography>
									<Link to="/">Customization</Link>
								</Typography>
								<Typography>
									<Link to="/">Theming</Link>
								</Typography>
							</Grid>
							<Grid item lg={3} sm={6}>
								<Typography>Explore</Typography>
								<Typography>
									<Link to="/">Documentation</Link>
								</Typography>
								<Typography>
									<Link to="/">Blog</Link>
								</Typography>
								<Typography>
									<Link to="/">Showcase</Link>
								</Typography>
								<Typography>
									<Link to="/">Roadmap</Link>
								</Typography>
								<Typography>
									<Link to="/">Languages</Link>
								</Typography>
							</Grid>
							<Grid item lg={3} sm={6}>
								<Typography>Company</Typography>
								<Typography>
									<Link to="/">About</Link>
								</Typography>
								<Typography>
									<Link to="/">Vision</Link>
								</Typography>
								<Typography>
									<Link to="/">Careers</Link>
								</Typography>
								<Typography>
									<Link to="/">Support</Link>
								</Typography>
								<Typography>
									<Link to="/">Contact us</Link>
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Box>
				<hr />
				<Box
					sx={{
						padding: '40px 0',
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<Typography>Copyright © 2022 Material-UI SAS.</Typography>
				</Box>
			</Container>
		</footer>
	);
};

export default Footer;
