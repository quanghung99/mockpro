import {
	AddCommentOutlined,
	DeleteOutlined,
	FavoriteBorderOutlined,
	Grid3x3,
	Textsms,
	TextsmsOutlined,
} from '@mui/icons-material';
import CakeIcon from '@mui/icons-material/Cake';
import SettingsIcon from '@mui/icons-material/Settings';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import {
	Avatar,
	Box,
	Button,
	Container,
	Grid,
	Paper,
	Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
	articleAction,
	selectArticleList,
} from 'features/articles/articleSlice';
import { commentActions } from 'features/comment/commentSlice';
import {
	profileActions,
	selectProfileCurrent,
} from 'features/profile/profileSlice';
import React, { useEffect } from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import style from './style.module.scss';

export interface ProfileProps {}

export default function Profile(props: ProfileProps) {
	const dispatch = useAppDispatch();
	const profileCurrent = useAppSelector(selectProfileCurrent);
	const articleByUser = useAppSelector(selectArticleList);
	const location = useLocation();
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

	const handleAddComment = () => {
		dispatch(commentActions.addComment);
	};

	const handleRemoveComment = () => {
		dispatch(commentActions.removeComment);
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
							<Link to="/editSetting">
								<Button
									className={style.settingButton}
									variant="contained"
									color="primary"
								>
									<SettingsIcon /> &nbsp; Edit Profile
								</Button>
							</Link>
						</Box>
					</Paper>
				</Container>
			</Box>
			<Container>
				<Grid container className={style.grid} spacing={2}>
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
						<Paper className={style.ContainArticle}>
							<Box className={style.userInfo}>
								<Avatar
									sx={{ width: '32px', height: '32px' }}
									src={profileCurrent.profile.image}
								/>
								<Box>
									<Typography>quanghoapq1</Typography>
									<Typography>{articleByUser[0]?.createdAt}</Typography>
								</Box>
							</Box>
							<Box className={style.userArticle}>
								<Link to="/" className={style.userArticle_title}>
									{articleByUser[0]?.slug || 'new post'}
								</Link>
								<Link to="/tagList" className={style.userArticle_tagList}>
									{articleByUser[0]?.tagList || 'tagList'}
								</Link>
							</Box>
							<Box className={style.userActions} mt={4}>
								<Box>
									<Button>
										<FavoriteBorderOutlined /> &nbsp; Reactions
									</Button>
									<Button>
										<AddCommentOutlined /> &nbsp; Add comments
									</Button>
								</Box>

								<Box>
									<Button>
										<DeleteOutlined /> &nbsp; Remove
									</Button>
								</Box>
							</Box>
						</Paper>
						<Paper className={style.ContainArticle}>
							<Box className={style.userInfo}>
								<Avatar
									sx={{ width: '32px', height: '32px' }}
									src={profileCurrent.profile.image}
								/>
								<Box>
									<Typography>quanghoapq1</Typography>
									<Typography>{articleByUser[0]?.createdAt}</Typography>
								</Box>
							</Box>
							<Box className={style.userArticle}>
								<Link to="/" className={style.userArticle_title}>
									{articleByUser[0]?.slug || 'new post'}
								</Link>
								<Link to="/tagList" className={style.userArticle_tagList}>
									{articleByUser[0]?.tagList || 'tagList'}
								</Link>
							</Box>
							<Box className={style.userActions} mt={4}>
								<Box>
									<Button>
										<FavoriteBorderOutlined /> &nbsp; Reactions
									</Button>
									<Button>
										<AddCommentOutlined /> &nbsp; Add comments
									</Button>
								</Box>

								<Box>
									<Button>
										<DeleteOutlined /> &nbsp; Remove
									</Button>
								</Box>
							</Box>
						</Paper>
						<Paper className={style.ContainArticle}>
							<Box className={style.userInfo}>
								<Avatar
									sx={{ width: '32px', height: '32px' }}
									src={profileCurrent.profile.image}
								/>
								<Box>
									<Typography>quanghoapq1</Typography>
									<Typography>{articleByUser[0]?.createdAt}</Typography>
								</Box>
							</Box>
							<Box className={style.userArticle}>
								<Link to="/" className={style.userArticle_title}>
									{articleByUser[0]?.slug || 'new post'}
								</Link>
								<Link to="/tagList" className={style.userArticle_tagList}>
									{articleByUser[0]?.tagList || 'tagList'}
								</Link>
							</Box>
							<Box className={style.userActions} mt={4}>
								<Box>
									<Button>
										<FavoriteBorderOutlined /> &nbsp; Reactions
									</Button>
									<Button>
										<AddCommentOutlined /> &nbsp; Add comments
									</Button>
								</Box>

								<Box>
									<Button>
										<DeleteOutlined /> &nbsp; Remove
									</Button>
								</Box>
							</Box>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}
