import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IDesignersList } from 'src/models/IDesignersList';

interface DesignersListState {
	isLoading: boolean;
	designersList: IDesignersList;
	error: string;
}

const initialState: DesignersListState = {
	isLoading: false,
	designersList: {
		count: 0,
		next: null,
		previous: null,
		results: [],
	},
	error: '',
};

export const designersListSlice = createSlice({
	name: 'designers',
	initialState,
	reducers: {
		designersListFetching(state) {
			state.isLoading = true;
		},
		designersListFetchingSuccess(state, action: PayloadAction<IDesignersList>) {
			state.isLoading = false;
			state.error = '';
			state.designersList = action.payload;
		},
		designersListFetchingError(state, action: PayloadAction<string>) {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export default designersListSlice.reducer;
