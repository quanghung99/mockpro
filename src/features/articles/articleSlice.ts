import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { articleFilter, articleModel } from 'models';

interface State {
	articles: articleModel[];
	isLoading: boolean;
	error: string;
}

const initialState: State = {
	articles: [],
	isLoading: true,
	error: '',
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
	},
});

export const articleAction = articleSlice.actions;
export const selectArticleList = (state: RootState) => state.article.articles;
export const selectIsLoading = (state: RootState) => state.article.isLoading;
const articleReducer = articleSlice.reducer;
export default articleReducer;
