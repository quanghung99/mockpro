import authSaga from 'features/auth/authSaga';
import { all } from 'redux-saga/effects';
import articleSaga from 'features/articles/articleSaga';
import profileSaga from 'features/profile/profileSaga';
import userArticleSaga from 'features/articles/userArticleSaga';
import commentSaga from 'features/comment/commentSaga';
export default function* rootSaga() {
	yield all([
		authSaga(),
		articleSaga(),
		profileSaga(),
		userArticleSaga(),
		commentSaga(),
	]);
}
