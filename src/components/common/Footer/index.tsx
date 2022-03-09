import { Container, Typography, Box } from '@mui/material';
import React from 'react';
import './styles.scss';

const Footer = () => {
	return (
		<footer style={{ marginTop: '20px' }}>
			<Container>
				<Box sx={{ paddingTop: '10px', paddingBottom: '80px' }}>
					<Typography>
						<span> DEV Community</span> — A constructive and inclusive social
						network for software developers. With you every step of your
						journey.
					</Typography>
					<Typography>
						Built on <span>Forem</span> — the open source software that powers{' '}
						<span>DEV</span> and other inclusive communities.
					</Typography>
					<Typography>
						Made with love and <span> Ruby on Rails</span>. DEV Community © 2016
						- 2022.
					</Typography>
				</Box>
			</Container>
		</footer>
	);
};

export default Footer;
