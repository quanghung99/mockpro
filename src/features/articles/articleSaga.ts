import { PayloadAction } from '@reduxjs/toolkit';
import { articlesApi } from 'api';
import { articleFilter, articlesResponse } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';
import { articleAction } from './articleSlice';

function* fetchAllArticle(action: PayloadAction<articleFilter>) {
	try {
		const res: articlesResponse = yield call(
			articlesApi.getListArticles,
			action.payload
		);
		yield put(articleAction.setListArticle(res.articles));
	} catch (error) {}
}

export default function* articleSaga() {
	yield takeLatest(articleAction.getListArticle.type, fetchAllArticle);
}
