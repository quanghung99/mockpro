import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { RootState } from 'app/store';
import { articleAction } from 'features/articles/articleSlice';
import { profileActions } from 'features/profile/profileSlice';
import { articleModel } from 'models';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RouterProps } from 'react-router-dom';
import Comments from './comment';
import SideLeft from './SideLeft';
import SideRight from './SideRight';
import styles from './styles.module.scss';

const tagColor = ['#6b4040', '#b0eaff', '#ff5722', '#04aa6d'];
export default function ArticleDetail(props: RouterProps) {
	const articleList: Array<articleModel> = useSelector((state: RootState) => {
		return state.article.articles;
	});

	const slug = (props as any).match.params.slug;
	const article: articleModel | undefined = articleList.find((a) => {
		return a.slug === slug;
	});
	const dispatch = useDispatch();
	const profile = useSelector(
		(state: RootState) => state.profile.currentProfile.profile
	);
	useEffect(() => {
		if (article) {
			dispatch(profileActions.fetchProfile((article as any).author.username));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);
	const handleFavorite = () => {
		dispatch(articleAction.favorArticle(article?.slug as string));
	};
	const handleUnFavorite = () => {
		dispatch(articleAction.unFavorArticle(article?.slug as string));
	};
	if (article !== undefined) {
		return (
			<div className={styles.ArticleDetail}>
				<Container>
					<Grid container spacing={2}>
						<Grid
							item
							xs={1}
							sx={{
								position: 'relative',
							}}
						>
							<SideLeft
								favorited={article.favorited}
								favoritesCount={article.favoritesCount}
								handleFavorite={handleFavorite}
								handleUnfavorite={handleUnFavorite}
							/>
						</Grid>
						<Grid item xs={8}>
							{/* Paper start */}
							<Paper
								variant="outlined"
								sx={{
									overflow: 'hidden',
								}}
							>
								<div className={styles.article_img}></div>
								<Container
									className="article"
									sx={{
										textAlign: 'left',
									}}
								>
									{/* Title start */}
									<Typography
										align="left"
										variant="h2"
										sx={{
											fontFamily: 'Segoe UI Bold',
											color: '#171717',
											fontSize: '48px',
											fontWeight: '800',
											paddingTop: '16px',
										}}
									>
										{article.title}
									</Typography>
									{/* Title end */}
									{/* Tags start */}
									<Box
										sx={{
											padding: '8px 0',
										}}
									>
										{article.tagList.map((t, i) => {
											let style = {
												style: {
													color: tagColor[i],
												},
											};
											return (
												<Button size="small" className={styles.tag}>
													<span {...style}># </span>
													{t}
												</Button>
											);
										})}
									</Box>
									{/* Tags end */}
									{/* Body start */}
									<Typography
										variant="body1"
										sx={{
											textIndent: '50px',
											backgroundColor: '#fafafa',
											borderRadius: '16px',
											padding: '12px',
											margin: '8px 0',
											textAlign: 'justify',
											fontSize: '18px',
											fontFamily: 'Segoe UI Regular',
										}}
									>
										{article.body}
									</Typography>
									{/* Body end */}
								</Container>
								{/* Comments */}
								<Comments profile={profile} slug={slug}></Comments>
							</Paper>
							{/* Paper end */}
						</Grid>
						<Grid
							item
							xs={3}
							sx={{
								position: 'relative',
							}}
						>
							<SideRight slug={slug} profile={profile}></SideRight>
						</Grid>
					</Grid>
				</Container>
			</div>
		);
	} else return null;
}

/*
var input = "Hey is some text some text?\r\n\r\nYou are some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text\r\n\r\nMy name is some text some text some text some text some text some text some text some text some text some text some text some text some text some text";
var paragraphs = input.split(/(?:\r?\n)+/);
console.log(paragraphs);
*/
