import {
	articleModel,
	articleParamCreate,
	articleParamUpdate,
	articlesFilterd,
	articleList,
	articleSlug,
} from 'models/article';
import { tagModel } from 'models/tag';
import axiosCustom from './axiosCustom';

export const articlesApi = {
	getListArticles(filter: string): Promise<articlesFilterd> {
		const url = `/articles${filter}`;
		return axiosCustom.get(url);
	},
	getFeedArticles(filter: string): Promise<articlesFilterd> {
		const url = `/articles/feed${filter}`;
		return axiosCustom.get(url);
	},
	getArticle(slug: string): Promise<articleSlug> {
		const url = `/articles/${slug}`;
		return axiosCustom.get(url);
	},
	addArticle(articleData: articleParamCreate): Promise<articleModel> {
		const url = '/articles';
		return axiosCustom.post(url, articleData);
	},
	updateArticle(
		articleData: articleParamUpdate,
		slug: string
	): Promise<articleModel> {
		const url = `/articles/${slug}`;
		return axiosCustom.put(url, articleData);
	},
	deleteArticle(slug: string): Promise<articleModel> {
		const url = `/articles/${slug}`;
		return axiosCustom.delete(url);
	},
	favoriteArticle(slug: string): Promise<articleModel> {
		const url = `/articles/${slug}/favorite`;
		return axiosCustom.post(url);
	},

	unfavoriteArticle(slug: string): Promise<articleModel> {
		const url = `/articles/${slug}/favorite`;
		return axiosCustom.delete(url);
	},
	getTag(): Promise<tagModel> {
		const url = '/tags';
		return axiosCustom.get(url);
	},
};
