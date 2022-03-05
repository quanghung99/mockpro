import { commentResponse, commentModel, addCommentBody } from 'models/comment';
import axiosCustom from './axiosCustom';

export const commentApi = {
	addComment(commentData: addCommentBody, slug: string): Promise<commentModel> {
		const url = `/articles/${slug}/comments`;
		return axiosCustom.post(url, commentData);
	},
	getCommentByArticle(slug: string): Promise<commentResponse> {
		const url = `/articles/${slug}/comments`;
		console.log('url', url);
		return axiosCustom.get(url);
	},
	deleteComment(slug: string, id: string | number): Promise<commentResponse> {
		const url = `/articles/${slug}/comments/${id}`;
		return axiosCustom.delete(url);
	},
};
