export interface articleModel {
	slug: string;
	title: string;
	description: string;
	body: string;
	createdAt: string;
	updatedAt: string;
	tagList: Array<string>;
	author: {
		username: string;
		bio: string;
		image: string;
		following: boolean;
	};
	favoritesCount: number;
	favorited: boolean;
}

export interface articleList<T> {
	articles: Array<T>;
}

export interface articleParam {
	article: {
		title: string;
		description: string;
		body: string;
		tagList: Array<string>;
	};
}
