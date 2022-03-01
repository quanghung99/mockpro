import { Container, Grid } from '@mui/material';
import { articlesApi } from 'api';
import { useAppSelector } from 'app/hooks';
import ArticleFilter from 'components/Aritcle/ArticleFilter';
import ArticleList from 'components/Aritcle/ArticleList';
import { tagModel } from 'models';
import React, { useEffect, useState } from 'react';
import { selectIsLoading } from './articleSlice';

const Article = () => {
	const isLoading = useAppSelector(selectIsLoading);
	const [tags, setTags] = useState<tagModel>()

	useEffect(() => {
		(async () => {
			const res = await articlesApi.getTag();
			setTags(res)
		})();
	}, []);

	if (isLoading) return <p>Loading...</p>;

	return (
		<Container>
			<Grid container>
				<Grid item lg={8} sm={12}>
					<ArticleList />
				</Grid>
				<Grid item lg={4} sm={12}>
					<ArticleFilter tags={tags}/>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Article;
