import {
	Home,
	LibraryBooks,
	MailOutline,
	Summarize,
} from '@mui/icons-material';
import {
	Container,
	Grid,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Skeleton,
	Tab,
	Tabs,
} from '@mui/material';
import { Box } from '@mui/system';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import ArticleFilter from 'components/Aritcle/ArticleFilter';
import ArticleList from 'components/Aritcle/ArticleList';
import { articleFilter } from 'models';
import React, { useEffect, useState } from 'react';
import {
	articleAction,
	selectArticleList,
	selectIsLoading,
} from './articleSlice';

const Article = () => {
	const isLoading = useAppSelector(selectIsLoading);
	const articleList = useAppSelector(selectArticleList);
	const hashTag = useAppSelector((state) => state.article.tags);
	const filter = useAppSelector((state) => state.article.filer);
	const dispatch = useAppDispatch();
	const [tagValue, setTagValue] = useState('1');
	const [hashTagValue, setHashTagValue] = useState('');
	useEffect(() => {
		dispatch(articleAction.getTag());
	}, [dispatch]);
	useEffect(() => {
		if (tagValue === '2') {
			const newFilter: articleFilter = {
				limit: 10,
				offset: 0,
			};
			dispatch(articleAction.getListArticle(newFilter));
			console.log(tagValue);
		} else if (tagValue === '1') {
			const newFilter: articleFilter = {
				limit: 10,
				offset: 0,
			};
			dispatch(articleAction.getListFeed(newFilter));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tagValue, dispatch]);
	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setHashTagValue('');
		setTagValue(newValue);
	};
	const handleClickTag = (tag: string) => {
		setHashTagValue(tag);
		setTagValue('3');
		const newFilter: articleFilter = {
			...filter,
			tag: tag,
		};
		dispatch(articleAction.changeFilter(newFilter));
	};
	return (
		<Container maxWidth={'lg'} sx={{ mt: '40px' }}>
			<Grid container spacing={2}>
				<Grid item lg={2} xs={12}>
					<List>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<img src="/assets/001-house.png" alt="" />
								</ListItemIcon>
								<ListItemText primary="Home" />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<img src="/assets/002-open-book.png" alt="" />
								</ListItemIcon>
								<ListItemText primary="Reading List" />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<img src="/assets/003-checklist.png" alt="" />
								</ListItemIcon>
								<ListItemText primary="Listing" />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<img src="/assets/004-headphone.png" alt="" />
								</ListItemIcon>
								<ListItemText primary="Postcasts" />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<img src="/assets/005-video-player.png" alt="" />
								</ListItemIcon>
								<ListItemText primary="Video" />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<img src="/assets/006-tag.png" alt="" />
								</ListItemIcon>
								<ListItemText primary="Tags" />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<img src="/assets/007-light-bulb.png" alt="" />
								</ListItemIcon>
								<ListItemText primary="FAQ" />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<img src="/assets/008-about.png" alt="" />
								</ListItemIcon>
								<ListItemText primary="About" />
							</ListItemButton>
						</ListItem>
					</List>
				</Grid>
				<Grid item lg={8} xs={12}>
					<Box sx={{ borderBottom: 1, borderColor: '#e7ebf0' }}>
						<Tabs
							value={tagValue}
							onChange={handleChange}
							aria-label="basic tabs example"
						>
							<Tab sx={{ textTransform: 'none' }} label="Your Feed" value="1" />
							<Tab
								sx={{ textTransform: 'none' }}
								label="Global Feed"
								value="2"
							/>
							<Tab sx={{ textTransform: 'none' }} label="Latest" value="4" />
							<Tab sx={{ textTransform: 'none' }} label="Popular" value="5" />
							{hashTagValue.length > 0 ? (
								<Tab
									sx={{ textTransform: 'none' }}
									label={`#${hashTagValue}`}
									value="3"
								/>
							) : (
								<Tab></Tab>
							)}
						</Tabs>
					</Box>
					{isLoading ? (
						<Box sx={{ my: '50px' }}>
							<Skeleton variant="rectangular" width={'100%%'} height={'40vh'} />
							<Skeleton variant="text" width={'100%'} height={'40vh'} />
						</Box>
					) : (
						<ArticleList articleList={articleList} />
					)}
				</Grid>
				<Grid item lg={2} xs={12}>
					{hashTag?.length ? (
						<ArticleFilter tags={hashTag} clickTag={handleClickTag} />
					) : (
						<Box sx={{ my: '50px' }}>
							<Skeleton variant="rectangular" width={'100%%'} height={'20vh'} />
						</Box>
					)}
				</Grid>
			</Grid>
		</Container>
	);
};

export default Article;
