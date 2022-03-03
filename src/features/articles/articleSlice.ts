import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { articleFilter, articleModel } from 'models';

interface State {
	articles: articleModel[];
	fitler: articleFilter;
	isLoading: boolean;
	error: string;
}

const initialState: State = {
	articles: [],
	isLoading: true,
	error: '',
	fitler: {
		limit: 0,
		offset: 0,
	},
};

const articleSlice = createSlice({
	name: 'article',
	initialState,
	reducers: {
		getListArticle: (state, action: PayloadAction<articleFilter>) => {
			state.isLoading = true;
		},
		setListArticle: (state, action: PayloadAction<articleModel[]>) => {
			state.articles = action.payload;
			state.isLoading = false;
		},
		changeFilter: (state, action: PayloadAction<articleFilter>) => {
			state.fitler = action.payload;
		},
	},
});

export const articleAction = articleSlice.actions;
export const selectArticleList = (state: RootState) => state.article.articles;
export const selectArticleFilter = (state: RootState) => state.article.fitler;
export const selectArticleListByUser = createSelector(
	selectArticleList,
	(articleList) =>
		articleList.reduce((map: { [key: string]: articleModel }, article) => {
			map[article.author.username] = article;
			return map;
		}, {})
);
export const selectIsLoading = (state: RootState) => state.article.isLoading;
const articleReducer = articleSlice.reducer;
export default articleReducer;
