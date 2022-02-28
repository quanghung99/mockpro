import { articleModel, articleParam, articleList } from 'models/article';
import { tagModel } from 'models/tag';
import axiosCustom from './axiosCustom';

export const articlesApi = {
	getListArticles(): Promise<articleList<articleModel>> {
		const url = '/articles';
		return axiosCustom.get(url);
	},
	getFeedArticles(): Promise<articleList<articleModel>> {
		const url = '/articles/feed';
		return axiosCustom.get(url);
	},
	getArticle(slug: string): Promise<articleList<articleModel>> {
		const url = `/api/articles/${slug}`;
		return axiosCustom.get(url);
	},
	addArticle(articleData: articleParam): Promise<articleList<articleModel>> {
		const url = '/articles';
		return axiosCustom.post(url, articleData);
	},
	updateArticle(
		articleData: articleParam,
		slug: string
	): Promise<articleList<articleModel>> {
		const url = `/articles/${slug}`;
		return axiosCustom.post(url, articleData);
	},
	deleteArticle(slug: string): Promise<articleList<articleModel>> {
		const url = `/api/articles/${slug}`;
		return axiosCustom.delete(url);
	},
	favoriteArticle(slug: string): Promise<articleModel> {
		const url = `/api/articles/${slug}/favorite`;
		return axiosCustom.post(url);
	},

	unfavoriteArticle(slug: string): Promise<articleModel> {
		const url = `/api/articles/${slug}/favorite`;
		return axiosCustom.delete(url);
	},
	getTag(): Promise<tagModel> {
		const url = '/tags';
		return axiosCustom.get(url);
	},
};
