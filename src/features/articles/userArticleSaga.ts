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
		console.log('res', res);
	} catch (err) {}
}
function* updateArticle(
	action: PayloadAction<{ formData: articleParamCreate; slug: string }>
) {
	try {
		let res: createResponse = yield call(
			articlesApi.updateArticle,
			action.payload.formData,
			action.payload.slug
		);
		put(push('/blog'));
		toast.success('Update success!');
	} catch (err) {
		toast.error('Update failed!');
	}
}
function* deleteArticle(action: PayloadAction<string>) {
	console.log('formData nhan duoc trong saga', action.payload);
	try {
		let res: articleModel = yield call(
			articlesApi.deleteArticle,
			action.payload
		);
		console.log('res delete', res);
	} catch (err) {}
}

export default function* userArticleSaga() {
	yield takeLatest(articleAction.addArticle.type, addArticle);
	yield takeLatest(articleAction.updateArticle.type, updateArticle);
	yield takeLatest(articleAction.deleteArticle.type, deleteArticle);
}
