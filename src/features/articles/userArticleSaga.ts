import { PayloadAction } from '@reduxjs/toolkit';
import { articlesApi } from 'api';
import { push } from 'connected-react-router';
import { articleModel, articleParamCreate, createResponse } from 'models';
import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import { articleAction } from './articleSlice';

function* addArticle(action: PayloadAction<articleParamCreate>) {
	try {
		let res: createResponse = yield call(
			articlesApi.addArticle,
			action.payload
		);
		yield put(push('/blog'));
		toast.success('Add article success!');
	} catch (err) {}
}
function* updateArticle(
	action: PayloadAction<{ formData: articleParamCreate; slug: string }>
) {
	try {
		yield call(
			articlesApi.updateArticle,
			action.payload.formData,
			action.payload.slug
		);
		yield put(push('/blog'));
		toast.success('Update success!');
	} catch (err) {
		toast.error('Update failed!');
	}
}
function* deleteArticle(action: PayloadAction<string>) {
	try {
		let res: articleModel = yield call(
			articlesApi.deleteArticle,
			action.payload
		);
		toast.success('Delete success!');
	} catch (err) {}
}

export default function* userArticleSaga() {
	yield takeLatest(articleAction.addArticle.type, addArticle);
	yield takeLatest(articleAction.updateArticle.type, updateArticle);
	yield takeLatest(articleAction.deleteArticle.type, deleteArticle);
}
