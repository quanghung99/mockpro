import { Container, Grid, Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import { articlesApi } from 'api';
import { useAppSelector } from 'app/hooks';
import ArticleFilter from 'components/Aritcle/ArticleFilter';
import ArticleList from 'components/Aritcle/ArticleList';
import { tagModel } from 'models';
import React, { useEffect, useState } from 'react';
import { selectArticleList, selectIsLoading } from './articleSlice';

const Article = () => {
	const isLoading = useAppSelector(selectIsLoading);
	const articleList = useAppSelector(selectArticleList);
	const [tags, setTags] = useState<tagModel>();
	useEffect(() => {
		(async () => {
			const res = await articlesApi.getTag();
			setTags(res);
		})();
	}, []);

	return (
		<Container>
			<Grid container spacing={2}>
				<Grid item lg={8} sm={12}>
					{isLoading ? (
						<Box sx={{ my: '50px' }}>
							<Skeleton variant="rectangular" width={'100%%'} height={'40vh'} />
							<Skeleton variant="text" width={'100%'} height={'40vh'} />
						</Box>
					) : (
						<ArticleList articleList={articleList} />
					)}
				</Grid>
				<Grid item lg={4} sm={12}>
					{tags?.tags.length ? (
						<ArticleFilter tags={tags} />
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
