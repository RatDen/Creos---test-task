import { combineReducers, configureStore } from '@reduxjs/toolkit';
import designersReducer from './reducers/DesignersListSlice';
import commentsReducer from './reducers/CommentsListSlice';
import issuesReducer from './reducers/IssuesListSlice';

const rootReduser = combineReducers({
	designersReducer,
	commentsReducer,
	issuesReducer,
});

export function setupStore() {
	return configureStore({
		reducer: rootReduser,
	});
}

export type RootState = ReturnType<typeof rootReduser>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
