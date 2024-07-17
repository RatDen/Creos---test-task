import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IComment } from 'src/models/IComment';

interface CommentsListState {
	isLoading: boolean;
	commentsList: IComment[];
	error: string;
}

const initialState: CommentsListState = {
	isLoading: false,
	commentsList: [],
	error: '',
};

export const commentsListSlice = createSlice({
	name: 'designers',
	initialState,
	reducers: {
		commentsListFetching(state) {
			state.isLoading = true;
		},
		commentsListFetchingSuccess(state, action: PayloadAction<IComment[]>) {
			state.isLoading = false;
			state.error = '';
			state.commentsList = action.payload;
		},
		commentsListFetchingError(state, action: PayloadAction<string>) {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export default commentsListSlice.reducer;
