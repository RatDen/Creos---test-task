import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IIssue } from 'src/models/IIssue';

interface IssuesListState {
	isLoading: boolean;
	issuesList: IIssue[];
	error: string;
}

const initialState: IssuesListState = {
	isLoading: false,
	issuesList: [],
	error: '',
};

export const issuesListSlice = createSlice({
	name: 'designers',
	initialState,
	reducers: {
		issuesListFetching(state) {
			state.isLoading = true;
		},
		issuesListFetchingSuccess(state, action: PayloadAction<IIssue[]>) {
			state.isLoading = false;
			state.error = '';
			state.issuesList = action.payload;
		},
		issuesListFetchingError(state, action: PayloadAction<string>) {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export default issuesListSlice.reducer;
