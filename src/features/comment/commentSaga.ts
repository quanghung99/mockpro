import { PayloadAction } from '@reduxjs/toolkit';
import { commentApi } from '../../api';
import { commentResponse, commentModel, addCommentParam } from '../../models';
import { call, put, takeLatest } from 'redux-saga/effects';
import { commentActions } from './commentSlice';

function* getListComment(action: PayloadAction<string>) {
	const response: commentResponse = yield call(
		commentApi.getCommentByArticle,
		action.payload
	);
	yield put(commentActions.setListComment(response.comments));
}

function* addComment(action: PayloadAction<addCommentParam>) {
	const response: commentModel = yield commentApi.addComment(
		action.payload.commentData,
		action.payload.slug
	);
	yield put(commentActions.getListComment(action.payload.slug));
}
function* deleteComment(action: PayloadAction<{ slug: string; id: string }>) {
	const response: commentResponse = yield commentApi.deleteComment(
		action.payload.slug,
		action.payload.id
	);
	yield put(commentActions.getListComment(action.payload.slug));
}

export default function* commentSaga() {
	yield takeLatest(commentActions.getListComment, getListComment);
	yield takeLatest(commentActions.addComment, addComment);
	yield takeLatest(commentActions.removeComment, deleteComment);
}
