import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useAppSelector } from 'app/hooks';
import { selectArticleList } from 'features/articles/articleSlice';
import { articleModel } from 'models';
import styles from './styles.module.scss';
import * as React from 'react';
import { Link } from 'react-router-dom';

export interface IArticleListProps {}

export default function ArticleList(props: IArticleListProps) {
	const articleList = useAppSelector(selectArticleList);

	return (
		<div className={styles.articleList}>
			<Typography variant="h5" sx={{ fontWeight: 'bold' }} textAlign="left">
				Posts
			</Typography>
			<Box>
				<ul>
					{articleList.map((article: articleModel, index: number) => {
						const dateUpdate = new Date(article?.updatedAt);
						return (
							<li key={index}>
								<div className={styles.articleTag}>
									{article.tagList?.map((tag, index) => (
										<div key={index}>{tag}</div>
									))}
								</div>
								<h2>
									<Link to={`/${article.slug}`}>{article.title}</Link>
								</h2>
								<p className={styles.articleBody}>{article.body}</p>
								<img src={article.author.image} alt={article.author.username} />
								<p className={styles.articleUsername}>
									{article.author.username}
								</p>
								<p className={styles.articleDate}>
									{dateUpdate.toDateString()}
								</p>
							</li>
						);
					})}
				</ul>
			</Box>
		</div>
	);
}
