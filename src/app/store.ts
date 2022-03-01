import createSagaMiddleware from '@redux-saga/core';
import {
	Action,
	combineReducers,
	configureStore,
	ThunkAction,
} from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { history } from 'utils/history';
import rootSaga from './rootSaga';

const sagaMiddleWare = createSagaMiddleware();

const rootReducer = combineReducers({
	router: connectRouter(history),
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(sagaMiddleWare, routerMiddleware(history)),
});

sagaMiddleWare.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
