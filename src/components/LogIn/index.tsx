import { Lock } from '@mui/icons-material';
import { Button, Container, Paper, Typography } from '@mui/material';
import InputField from 'components/common/CustomField/InputField';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
export interface LoginPageProps {}

export default function LoginPage(props: LoginPageProps) {
	const { control, handleSubmit } = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
	});
	const onsubmit = (value: any) => {
		console.log(value);
	};
	return (
		<Container maxWidth={'lg'}>
			<Paper
				elevation={5}
				sx={{
					maxWidth: '350px',
					padding: '20px',
					minHeight: '400px',
					textAlign: 'center',
					mx: 'auto',
				}}
			>
				<Lock color={'primary'} fontSize={'large'} />
				<Typography variant="h5" fontWeight={'700'}>
					Sign In
				</Typography>
				<form onSubmit={handleSubmit(onsubmit)}>
					<InputField
						control={control}
						name="email"
						type={'email'}
						label="Email"
					/>
					<InputField
						control={control}
						name="password"
						type={'password'}
						label="Password"
					/>
					<Button
						sx={{ mt: '20px' }}
						fullWidth
						variant="contained"
						color="primary"
						type="submit"
					>
						Sign In
					</Button>

					<Typography sx={{ mt: '20px' }}>
						Don't have an account?{' '}
						<Link style={{ textDecoration: 'none' }} to={'#'}>
							Sign Up
						</Link>
					</Typography>
				</form>
			</Paper>
		</Container>
	);
}
