import authSaga from 'features/auth/authSaga';
import { all } from 'redux-saga/effects';
import articleSaga from 'features/articles/articleSaga';
import { userArticleSaga } from 'features/articles/userArticleSaga';

export default function* rootSaga() {
	yield all([authSaga(), articleSaga(), userArticleSaga()]);
}
