import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './rootSaga';

const sagaMiddleWare = createSagaMiddleware()

export const store = configureStore({
	reducer: {},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleWare)
});

sagaMiddleWare.run(rootSaga)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
