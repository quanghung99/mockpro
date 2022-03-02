import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { articleModel } from 'models';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

export interface IArticleListProps {
	articleList: articleModel[];
}

export default function ArticleList({ articleList }: IArticleListProps) {
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
