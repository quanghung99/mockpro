import { Grid3x3, Textsms } from '@mui/icons-material';
import CakeIcon from '@mui/icons-material/Cake';
import SettingsIcon from '@mui/icons-material/Settings';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { Avatar, Box, Button, Grid, Paper, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
	articleAction,
	selectArticleFilter,
	selectArticleList,
} from 'features/articles/articleSlice';
import {
	profileActions,
	selectProfileCurrent,
	selectProfileLoading,
} from 'features/profile/profileSlice';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import style from './style.module.scss';

export interface ProfileProps {}

export default function Profile(props: ProfileProps) {
	const dispatch = useAppDispatch();
	// const profileLoading = useAppSelector(selectProfileLoading);
	const profileCurrent = useAppSelector(selectProfileCurrent);
	const articleByUser = useAppSelector(selectArticleList);
	// const filter = useAppSelector(selectArticleFilter);
	const location = useLocation();
	const date = new Date();
	const username = location.pathname.split('/')[2];
	useEffect(() => {
		dispatch(profileActions.fetchProfile(username));
		dispatch(
			articleAction.getListArticle({
				limit: 10,
				offset: 0,
				author: location.pathname.split('/')[2],
			})
		);
	}, [dispatch]);

	return (
		<Box className={style.rootProfile}>
			<Box className={style.blackpath}></Box>

			<Grid container className={style.grid} spacing={2}>
				<Grid item lg={12}>
					<Paper elevation={3} className={style.headerProfile}>
						<Box>
							<Avatar
								className={style.avatar}
								sx={{ width: '99px', height: '99px' }}
								src={profileCurrent.profile.image}
							/>
							<Typography variant="h5" mt={10} className={style.username}>
								{profileCurrent.profile.username}
							</Typography>
							<Typography mt={3} className={style.bio}>
								{profileCurrent.profile.bio
									? profileCurrent.profile.bio
									: '404 profile not found'}
							</Typography>
							<Typography mt={3} className={style.bio}>
								<Typography>
									<CakeIcon />
									&nbsp; 3 march 2022
								</Typography>
							</Typography>
							<Button
								className={style.settingButton}
								variant="contained"
								color="primary"
							>
								<SettingsIcon /> &nbsp; Edit Profile
							</Button>
						</Box>
					</Paper>
				</Grid>
				<Grid item lg={4}>
					<Paper className={style.boardInfo}>
						<Typography>
							<TextSnippetIcon />
							&nbsp; {articleByUser.length} &nbsp; post publish
						</Typography>
						<Typography>
							<Textsms />
							&nbsp; comments written
						</Typography>
						<Typography>
							<Grid3x3 />
							&nbsp; tags followed
						</Typography>
					</Paper>
				</Grid>

				<Grid item lg={8}>
					<Box>
						<Paper>
							<Box>
								<Avatar
									// className={}
									sx={{ width: '32px', height: '32px' }}
									src={profileCurrent.profile.image}
								/>
								<Typography>quanghoapq1</Typography>
								<Typography>{articleByUser[0]?.createdAt}</Typography>
							</Box>
						</Paper>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}
