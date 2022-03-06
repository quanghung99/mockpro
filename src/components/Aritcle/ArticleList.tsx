import { Avatar, Button, Chip, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { articlesApi } from 'api';
import { articleModel } from 'models';
import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './styles.module.scss';

export interface IArticleListProps {
	articleList: articleModel[];
}
interface typeFavorite {
	isFavorited: Boolean;
	favoriteCount: number;
}
const getFavoriteList = (articleList: articleModel[]) => {
	return articleList.map((value) => {
		return {
			isFavorited: value.favorited,
			favoriteCount: value.favoritesCount,
		};
	});
};
export default function ArticleList({ articleList }: IArticleListProps) {
	const [listFavorite, setListFavorite] = React.useState<typeFavorite[]>(
		getFavoriteList(articleList)
	);
	const navigate = useHistory();

	const handleClickFavorite = async (slug: string, index: number) => {
		try {
			const newList = listFavorite.map((value, index2) => {
				if (index2 === index) {
					return {
						favoriteCount: value.favoriteCount + 1,
						isFavorited: !value.isFavorited,
					};
				}
				return value;
			});
			setListFavorite(newList);
			await articlesApi.favoriteArticle(slug);
		} catch (error) {
			console.log(error);
		}
	};
	const handleUnFavorite = async (slug: string, index: number) => {
		try {
			const newList = listFavorite.map((value, index2) => {
				if (index2 === index) {
					return {
						favoriteCount: value.favoriteCount - 1,
						isFavorited: !value.isFavorited,
					};
				}
				return value;
			});
			setListFavorite(newList);
			await articlesApi.unfavoriteArticle(slug);
		} catch (error) {
			console.log(error);
		}
	};
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
							<Box
								display={'flex'}
								alignItems="center"
								my="10px"
								onClick={() =>
									navigate.push(`/profile/${article.author.username}`)
								}
							>
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
									sx={{ cursor: 'pointer' }}
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
									<Link to={`/article/${article.slug}`}>{article.title}</Link>
								</Typography>
								<div>
									{article.tagList?.map((tag, index) => (
										<Chip size="small" key={index} label={tag} />
									))}
								</div>

								<p className={styles.articleBody}>
									<Link to={`/article/${article.slug}`}>{article.body}</Link>
								</p>
								<Button
									variant={'text'}
									sx={{
										color: listFavorite[index].isFavorited
											? 'rgb(220,38,38)'
											: 'black',
									}}
									onClick={() => {
										listFavorite[index].isFavorited
											? handleUnFavorite(article.slug, index)
											: handleClickFavorite(article.slug, index);
									}}
								>
									❤ {listFavorite[index].favoriteCount}
								</Button>
							</Box>
						</Paper>
					);
				})}
			</Box>
		</div>
	);
}
