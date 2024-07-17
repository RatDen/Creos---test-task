import axios from 'axios';
import { AppDispatch } from '..';
import { IDesignersList } from '../../models/IDesignersList';
import { designersListSlice } from './DesignersListSlice';
import {
	API_DESIGNERS_URL,
	API_COMMENTS_URL,
	API_ISSUES_URL,
} from '../../constants';
import { IComment } from '../../models/IComment';
import { commentsListSlice } from './CommentsListSlice';
import { issuesListSlice } from './IssuesListSlice';
import { IIssue } from '../../models/IIssue';

type DesignerListQuerySettings = {
	status?: 'New' | 'In Progress' | 'Done' | null;
	key?: string;
	ordering?: 'email' | 'username' | null;
	page?: number;
	limit?: number;
};

export const fetchDesignersList =
	(settings?: DesignerListQuerySettings) => async (dispatch: AppDispatch) => {
		try {
			dispatch(designersListSlice.actions.designersListFetching());
			const response = await axios.get<IDesignersList>(API_DESIGNERS_URL, {
				params: settings,
			});
			dispatch(
				designersListSlice.actions.designersListFetchingSuccess(response.data)
			);
		} catch (e) {
			if (typeof e === 'string') {
				dispatch(designersListSlice.actions.designersListFetchingError(e));
			} else if (e instanceof Error) {
				dispatch(
					designersListSlice.actions.designersListFetchingError(e.message)
				);
			}
		}
	};

type CommentsListQuerySettings = {
	status?: 'New' | 'In Progress' | 'Done' | null;
	key?: string;
	ordering?: 'email' | 'username' | null;
	page?: number;
	limit?: number;
};

export const fetchCommentsList =
	(settings?: CommentsListQuerySettings) => async (dispatch: AppDispatch) => {
		try {
			dispatch(commentsListSlice.actions.commentsListFetching());
			const response = await axios.get<IComment[]>(API_COMMENTS_URL, {
				params: settings,
			});
			dispatch(
				commentsListSlice.actions.commentsListFetchingSuccess(response.data)
			);
		} catch (e) {
			if (typeof e === 'string') {
				dispatch(commentsListSlice.actions.commentsListFetchingError(e));
			} else if (e instanceof Error) {
				dispatch(
					commentsListSlice.actions.commentsListFetchingError(e.message)
				);
			}
		}
	};

type IssuesListQuerySettings = {
	status?: 'New' | 'In Progress' | 'Done' | null;
	key?: string;
};

export const fetchIssuesList =
	(settings?: IssuesListQuerySettings) => async (dispatch: AppDispatch) => {
		try {
			dispatch(issuesListSlice.actions.issuesListFetching());
			const response = await axios.get<IIssue[]>(API_ISSUES_URL, {
				params: settings,
			});
			dispatch(
				issuesListSlice.actions.issuesListFetchingSuccess(response.data)
			);
		} catch (e) {
			if (typeof e === 'string') {
				dispatch(issuesListSlice.actions.issuesListFetchingError(e));
			} else if (e instanceof Error) {
				dispatch(issuesListSlice.actions.issuesListFetchingError(e.message));
			}
		}
	};

type IssueSetting = {
	status?: 'New' | 'In Progress' | 'Done' | null;
	key?: string;
};

export const fetchIssue =
	(settings?: IssueSetting) => (dispatch: AppDispatch) => {
		try {
			const response = axios.get<IIssue[]>(API_ISSUES_URL, {
				params: settings,
			});

			return response;
		} catch (e) {
			if (typeof e === 'string') {
				dispatch(issuesListSlice.actions.issuesListFetchingError(e));
			} else if (e instanceof Error) {
				dispatch(issuesListSlice.actions.issuesListFetchingError(e.message));
			}
		}
	};
