import { profileModel } from './profile';

export interface commentModel {
	id?: string | number;
	createdAt?: string;
	updatedAt?: string;
	body: string;
	author: profileModel['profile'];
}

export interface addCommentBody {
	comment: {
		body: string;
	};
}
export interface addCommentParam {
	commentData: addCommentBody;
	slug: string;
}
export interface removeCommentParam {
	id: string;
	slug: string;
}
export interface commentResponse {
	comments: Array<commentModel>;
}
