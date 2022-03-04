import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { articleFilter, articleModel, articleParamCreate } from 'models';

interface State {
	articles: articleModel[];
	filer: articleFilter;
	isLoading: boolean;
	error: string;
}

const initialState: State = {
	articles: [],
	isLoading: true,
	error: '',
	filer: {
		limit: 10,
		offset: 0,
	},
};

const articleSlice = createSlice({
	name: 'article',
	initialState,
	reducers: {
		getListArticle: (state) => {
			state.isLoading = true;
		},
		setListArticle: (state, action: PayloadAction<articleModel[]>) => {
			state.articles = action.payload;
			state.isLoading = false;
		},
		changeFilter: (state, action: PayloadAction<articleFilter>) => {
			state.filer = action.payload;
		},
		addArticle: (state, action: PayloadAction<articleParamCreate>) => {},
	},
});

export const articleAction = articleSlice.actions;
export const selectArticleList = (state: RootState) => state.article.articles;
export const selectIsLoading = (state: RootState) => state.article.isLoading;
const articleReducer = articleSlice.reducer;
export default articleReducer;
