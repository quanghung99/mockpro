import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { articleAction } from 'features/articles/articleSlice';
import { profileActions } from 'features/profile/profileSlice';
import { profileModel } from 'models';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
type Props = {
	profile: profileModel['profile'];
	slug: string;
};

export default function SideRight({ profile, slug }: Props) {
	const navigate = useHistory();
	const dispatch = useDispatch();
	const isLoading = useAppSelector((state) => state.profile.isLoading);
	const isLogged = useAppSelector((state) => state.auth.isLogged);
	const currentUser = useSelector(
		(state: RootState) => state.auth.userState.user.username
	);
	const deleteArticle = () => {
		dispatch(articleAction.deleteArticle(slug));
		navigate.push('/blog');
	};
	const handleFollow = () => {
		dispatch(profileActions.followProfile(profile.username));
	};
	const handleUnFollow = () => {
		dispatch(profileActions.unfollowProfile(profile.username));
	};
	return (
		<Box
			className="sideRight"
			sx={{
				position: 'absolute',
				left: '0',
				width: '100%',
				boxSizing: 'border-box',
				marginTop: '16px',
			}}
		>
			<Container>
				<Box
					sx={{
						borderRadius: '16px',
						border: '1px solid #ececec',
						overflow: 'hidden',
					}}
				>
					<Box
						sx={{
							height: '32px',
							width: '100%',
							backgroundColor: '#080808',
						}}
					></Box>
					<Box
						sx={{
							padding: '0 16px 16px',
						}}
					>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'bottom',
								transform: 'translateY(-10px)',
							}}
						>
							<Avatar src={profile.image} />
							<Typography
								sx={{
									fontFamily: 'Segoe UI Bold',
									paddingTop: '16px',
									marginLeft: '12px',
								}}
							>
								{profile.username}
							</Typography>
						</Box>
						<Typography variant="body2" align="justify">
							{profile.bio}
						</Typography>
						{profile.username === currentUser && isLogged ? (
							<>
								<Button
									variant="contained"
									color="primary"
									sx={{
										width: '100%',
										marginTop: '28px',
									}}
									onClick={() => navigate.push('/editor/' + slug)}
								>
									Edit this article
								</Button>
								<Button
									variant="contained"
									color="error"
									sx={{
										width: '100%',
										marginTop: '14px',
									}}
									onClick={() => deleteArticle()}
								>
									Delete this article
								</Button>
							</>
						) : (
							<Button
								variant="contained"
								disabled={Boolean(!isLogged || isLoading)}
								sx={{
									width: '100%',
									marginTop: '28px',
								}}
								onClick={() => {
									profile.following ? handleUnFollow() : handleFollow();
								}}
							>
								{profile.following === false ? 'Follow' : 'Unfollow'}
							</Button>
						)}
					</Box>
				</Box>
			</Container>
		</Box>
	);
}
