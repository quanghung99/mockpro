import articleSaga from 'features/articles/articleSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
	yield all([articleSaga()]);
}
