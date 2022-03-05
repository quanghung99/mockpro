import { articlesApi } from 'api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
	articleAction,
	selectArticleList,
} from 'features/articles/articleSlice';
import Profile from 'features/profile/components/Profile';
import {
	profileActions,
	selectProfileCurrent,
} from 'features/profile/profileSlice';
import { articleFilter } from 'models';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function ProfilePage() {
	const dispatch = useAppDispatch();
	const profileCurrent = useAppSelector(selectProfileCurrent);
	const articleByUser = useAppSelector(selectArticleList);
	const location = useLocation();
	const username = location.pathname.split('/')[2];

	const [filter, setFilter] = useState<articleFilter>({
		limit: 10,
		offset: 0,
		author: username,
	});
	useEffect(() => {
		dispatch(profileActions.fetchProfile(username));
		dispatch(articleAction.getListArticle(filter));
	}, [dispatch, filter, location]);

	const handleDeleteArticle = async (slug: string) => {
		try {
			await articlesApi.deleteArticle(slug);
			dispatch(articleAction.getListArticle({ ...filter }));
		} catch (error) {
			console.log('delete article failed', error);
		}
	};
	const handleLoadFavorited = () => {
		setFilter({
			...filter,
			favorited: username,
		});
	};
	const handleLoadAllPost = () => {
		setFilter({
			limit: 10,
			offset: 0,
			author: username,
		});
	};

	return (
		<Profile
			profileCurrent={profileCurrent}
			articleByUser={articleByUser}
			handleLoadFavorited={handleLoadFavorited}
			handleLoadAllPost={handleLoadAllPost}
			handleDeleteArticle={handleDeleteArticle}
		/>
	);
}
