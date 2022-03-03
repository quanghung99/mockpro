import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { articleFilter, articleModel, tagModel } from 'models';

interface State {
	articles: articleModel[];
	filer: articleFilter;
	isLoading: boolean;
	error: string;
	tags: string[];
}

const initialState: State = {
	articles: [],
	isLoading: true,
	error: '',
	filer: {
		limit: 10,
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
			state.filer = action.payload;
			state.isLoading = true;
		},
		
	},
});

export const articleAction = articleSlice.actions;
export const selectArticleList = (state: RootState) => state.article.articles;
export const selectIsLoading = (state: RootState) => state.article.isLoading;
const articleReducer = articleSlice.reducer;
export default articleReducer;
