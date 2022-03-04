import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { articleFilter, articleModel, tagModel } from 'models';

interface State {
	articles: articleModel[];
	filter: articleFilter;
	isLoading: boolean;
	error: string;
	tags: string[];
}

const initialState: State = {
	articles: [],
	isLoading: true,
	error: '',
	filter: {
		limit: 0,
		offset: 0,
	},
	tags: [],
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
		getTag: () => {},
		getTagSuccess: (state, action: PayloadAction<tagModel>) => {
			state.tags = action.payload.tags;
		},
		getListFeed: (state, action: PayloadAction<articleFilter>) => {
			state.isLoading = true;
		},
		changeFilter: (state, action: PayloadAction<articleFilter>) => {
			state.filter = action.payload;
			state.isLoading = true;
		},
		deleteArticle(state, action: PayloadAction<string>) {},
		favorArticle(state, action: PayloadAction<string>) {},
		unFavorArticle(state, action: PayloadAction<string>) {},
	},
});

export const articleAction = articleSlice.actions;
export const selectArticleList = (state: RootState) => state.article.articles;
export const selectArticleFilter = (state: RootState) => state.article.filter;

export const selectIsLoading = (state: RootState) => state.article.isLoading;
const articleReducer = articleSlice.reducer;
export default articleReducer;
