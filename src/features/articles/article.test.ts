import { takeLatest } from 'redux-saga/effects';
import articleSaga, {
	deleteArticle,
	favorArticle,
	fetchAllArticle,
	fetchAllUserFeed,
	fetchArticleByFilter,
	fetchTag,
	unFavorArticle,
} from './articleSaga';
import { articleAction } from './articleSlice';

describe('articleSaga', () => {
	const genObject = articleSaga();

	it('Should wait for latest getListArticle action and call makeAuthorApiRequest', () => {
		expect(genObject.next().value).toEqual(
			takeLatest(articleAction.getListArticle.type, fetchAllArticle)
		);
	});

	it('Should wait for latest getListFeed action and call fetchAllUserFeed', () => {
		expect(genObject.next().value).toEqual(
			takeLatest(articleAction.getListFeed.type, fetchAllUserFeed)
		);
	});

	it('Should wait for latest changeFilter action and call fetchAllUserFeed', () => {
		expect(genObject.next().value).toEqual(
			takeLatest(articleAction.changeFilter.type, fetchArticleByFilter)
		);
	});

	it('Should wait for latest getTag action and call fetchAllUserFeed', () => {
		expect(genObject.next().value).toEqual(
			takeLatest(articleAction.getTag.type, fetchTag)
		);
	});

	it('Should wait for latest deleteArticle action and call fetchAllUserFeed', () => {
		expect(genObject.next().value).toEqual(
			takeLatest(articleAction.deleteArticle.type, deleteArticle)
		);
	});

	it('Should wait for latest favorArticle action and call fetchAllUserFeed', () => {
		expect(genObject.next().value).toEqual(
			takeLatest(articleAction.favorArticle.type, favorArticle)
		);
	});

	it('Should wait for latest unFavorArticle action and call fetchAllUserFeed', () => {
		expect(genObject.next().value).toEqual(
			takeLatest(articleAction.unFavorArticle.type, unFavorArticle)
		);
	});

	it('should be done on next iteration', () => {
		expect(genObject.next().done).toBeTruthy();
	});
});
