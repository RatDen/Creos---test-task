import { IIssue } from './IIssue';

export interface IDesigner {
	avatar: string;
	username: string;
	email: string;
	thumbnails: {
		avatar: string;
		avatar_2x: string;
		avatar_webp: string;
		avatar_webp_2x: string;
	};
	issues: (Pick<{ key: string }, 'key'> &
		Pick<IIssue, 'date_created' | 'status'>)[];
}
