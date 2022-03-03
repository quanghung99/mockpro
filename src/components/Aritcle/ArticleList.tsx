import { Avatar, Button, Chip, Paper, Typography } from '@mui/material';
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
			<Box>
				{articleList.map((article: articleModel, index: number) => {
					const dateUpdate = new Date(article?.updatedAt);
					return (
						<Paper
							elevation={2}
							key={index}
							className={styles.articleList__item}
						>
							<Box display={'flex'} alignItems="center" my="10px">
								<Avatar
									className={styles.avatarUser}
									sx={{ width: '32px', height: '32px' }}
									src={article.author.image}
									alt={article.author.username}
								/>
								<Box
									ml="10px"
									display={'flex'}
									alignItems="flex-start"
									flexDirection={'column'}
									justifyContent={'flex-start'}
								>
									<Typography className={styles.articleUsername}>
										{article.author.username}
									</Typography>
									<Typography className={styles.articleDate}>
										{dateUpdate.toDateString()}
									</Typography>
								</Box>
							</Box>
							<Box ml="40px">
								<Typography
									my="10px"
									fontSize={'30px'}
									fontWeight={'500'}
									variant="h5"
									component={'article'}
								>
									<Link to={`/${article.slug}`}>{article.title}</Link>
								</Typography>
								<div>
									{article.tagList?.map((tag, index) => (
										<Chip size="small" key={index} label={tag} />
									))}
								</div>

								<p className={styles.articleBody}>{article.body}</p>
								<Button>❤ {article.favoritesCount}</Button>
							</Box>
						</Paper>
					);
				})}
			</Box>
		</div>
	);
}
