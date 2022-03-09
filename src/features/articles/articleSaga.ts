import { PayloadAction } from '@reduxjs/toolkit';
import { articlesApi } from 'api';
import { articleFilter, articlesResponse, tagModel } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';
import { articleAction } from './articleSlice';

export function* fetchAllArticle(action: PayloadAction<articleFilter>) {
	try {
		const res: articlesResponse = yield call(
			articlesApi.getListArticles,
			action.payload
		);
		yield put(articleAction.setListArticle(res));
	} catch (error) {}
}
export function* fetchArticleByFilter(action: PayloadAction<articleFilter>) {
	try {
		const res: articlesResponse = yield call(
			articlesApi.getListArticles,
			action.payload
		);
		yield put(articleAction.setListArticle(res));
	} catch (error) {}
}
export function* fetchAllUserFeed(action: PayloadAction<articleFilter>) {
	try {
		const res: articlesResponse = yield call(
			articlesApi.getFeedArticles,
			action.payload
		);
		yield put(articleAction.setListArticle(res));
	} catch (error) {}
}
export function* fetchTag() {
	try {
		const res: tagModel = yield articlesApi.getTag();
		yield put(articleAction.getTagSuccess(res));
	} catch (error) {}
}

export function* deleteArticle(action: PayloadAction<string>) {
	yield call(articlesApi.deleteArticle, action.payload);
}

export function* favorArticle(action: PayloadAction<string>) {
	yield call(articlesApi.favoriteArticle, action.payload);
}

export function* unFavorArticle(action: PayloadAction<string>) {
	yield call(articlesApi.unfavoriteArticle, action.payload);
}

export default function* articleSaga() {
	yield takeLatest(articleAction.getListArticle.type, fetchAllArticle);
	yield takeLatest(articleAction.getListFeed.type, fetchAllUserFeed);
	yield takeLatest(articleAction.changeFilter.type, fetchArticleByFilter);
	yield takeLatest(articleAction.getTag.type, fetchTag);
	yield takeLatest(articleAction.deleteArticle.type, deleteArticle);
	yield takeLatest(articleAction.favorArticle.type, favorArticle);
	yield takeLatest(articleAction.unFavorArticle.type, unFavorArticle);
}
