import {
	AddCommentOutlined,
	DeleteOutlined,
	FavoriteBorderOutlined,
	FavoriteRounded,
	Grid3x3,
	Textsms,
} from '@mui/icons-material';
import CakeIcon from '@mui/icons-material/Cake';
import SettingsIcon from '@mui/icons-material/Settings';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import {
	Avatar,
	Box,
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogTitle,
	Grid,
	Paper,
	Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { articleModel, profileModel } from 'models';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { profileActions } from '../profileSlice';
import style from './style.module.scss';

interface ProfileProps {
	profileCurrent: profileModel;
	articleByUser: articleModel[];
	handleLoadFavorited: () => void;
	handleLoadAllPost: () => void;
	handleDeleteArticle: (slug: string) => void;
}

export default function Profile({
	articleByUser,
	profileCurrent,
	handleLoadFavorited,
	handleLoadAllPost,
	handleDeleteArticle,
}: ProfileProps) {
	const navigate = useHistory();
	const [open, setOpen] = useState<boolean>(false);
	const isLoading = useAppSelector((state) => state.profile.isLoading);
	const dispatch = useAppDispatch();
	const usernameAuth = useAppSelector(
		(state) => state.auth.userState.user.username
	);
	const handleCloseSubmit = (slug: string) => {
		setOpen(false);
		handleDeleteArticle(slug);
	};

	const handleFollow = () => {
		dispatch(profileActions.followProfile(profileCurrent.profile.username));
	};
	const handleUnFollow = () => {
		dispatch(profileActions.unfollowProfile(profileCurrent.profile.username));
	};
	return (
		<Box className={style.rootProfile}>
			<Box className={style.header}>
				<Box className={style.blackpath}></Box>
				<Container>
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
							<Typography mt={3}>
								{profileCurrent.profile.bio
									? profileCurrent.profile.bio
									: '404 profile not found'}
							</Typography>
							<Typography mt={3}>
								<CakeIcon />
								<span className={style.createdDate_text}>
									&nbsp; 3 march 2022
								</span>
							</Typography>
							{profileCurrent.profile.username === usernameAuth ? (
								<Link to="/setting">
									<Button
										className={style.settingButton}
										variant="contained"
										color="primary"
									>
										<SettingsIcon /> &nbsp; Edit Profile
									</Button>
								</Link>
							) : (
								<Button
									className={style.settingButton}
									variant="contained"
									disabled={isLoading}
									color="primary"
									onClick={() => {
										profileCurrent.profile.following
											? handleUnFollow()
											: handleFollow();
									}}
								>
									<SettingsIcon /> &nbsp;{' '}
									{profileCurrent.profile.following ? 'Unfollow' : 'Follow'}
								</Button>
							)}
						</Box>
					</Paper>
				</Container>
			</Box>
			<Container>
				<Grid container className={style.grid} spacing={2}>
					<Grid item lg={4}>
						<Paper className={style.boardInfo}>
							<Typography
								className={style.sideBarButton}
								onClick={handleLoadAllPost}
							>
								<TextSnippetIcon />
								&nbsp; My articles
							</Typography>

							<Typography
								className={style.sideBarButton}
								onClick={handleLoadFavorited}
							>
								<FavoriteRounded />
								&nbsp; Favorited
							</Typography>
							<Typography className={style.sideBarButton}>
								<Textsms />
								&nbsp; comments written
							</Typography>
							<Typography className={style.sideBarButton}>
								<Grid3x3 />
								&nbsp; tags followed
							</Typography>
						</Paper>
					</Grid>

					<Grid item lg={8}>
						{articleByUser.map((article) => {
							const date = new Date(article?.createdAt);
							return (
								<Paper className={style.ContainArticle} key={article.slug}>
									<Box className={style.userInfo}>
										<Avatar
											sx={{ width: '32px', height: '32px' }}
											src={article.author.image}
										/>
										<Box>
											<Typography>{article.author.username}</Typography>
											<Typography>{date.toDateString()}</Typography>
										</Box>
									</Box>
									<Box className={style.userArticle}>
										<Link to="/" className={style.userArticle_title}>
											{article.title}
										</Link>
										<Link to="/tagList" className={style.userArticle_tagList}>
											{article.tagList}
										</Link>
									</Box>
									<Box className={style.userActions} mt={4}>
										<Box>
											<Button>
												{article.favoritesCount === 0 ? (
													<FavoriteBorderOutlined color="inherit" />
												) : (
													<FavoriteRounded color="error" />
												)}
												&nbsp; {article.favoritesCount} &nbsp;Reactions
											</Button>
											<Button
												onClick={() =>
													navigate.push(`/article/${article.slug}`)
												}
											>
												<AddCommentOutlined /> &nbsp; Add comments
											</Button>
										</Box>

										<Box>
											<Button onClick={() => setOpen(true)}>
												<DeleteOutlined /> &nbsp; Remove
											</Button>
											<Dialog open={open} onClose={() => setOpen(false)}>
												<DialogTitle>
													{'Are you sure you want to delete this article?'}
												</DialogTitle>
												<DialogActions>
													<Button onClick={() => setOpen(false)}>
														Disagree
													</Button>
													<Button
														onClick={() => handleCloseSubmit(article.slug)}
														autoFocus
													>
														Agree
													</Button>
												</DialogActions>
											</Dialog>
										</Box>
									</Box>
								</Paper>
							);
						})}
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}
