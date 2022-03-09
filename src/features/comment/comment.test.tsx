import { takeLatest } from 'redux-saga/effects';
import commentSaga, {
	addComment,
	deleteComment,
	getListComment,
} from './commentSaga';
import { commentActions } from './commentSlice';

describe('Test Comment Saga', () => {
	const genObject = commentSaga();

	it('Should wait for latest getListComment action and call getListComment', () => {
		expect(genObject.next().value).toEqual(
			takeLatest(commentActions.getListComment.type, getListComment)
		);
	});

	it('Should wait for latest addComment action and call addComment', () => {
		expect(genObject.next().value).toEqual(
			takeLatest(commentActions.addComment.type, addComment)
		);
	});

	it('Should wait for latest removeComment action and call deleteComment', () => {
		expect(genObject.next().value).toEqual(
			takeLatest(commentActions.removeComment.type, deleteComment)
		);
	});
	it('should be done on next iteration', () => {
		expect(genObject.next().done).toBeTruthy();
	});
});
