import { IDesigner } from './IDesigner';

export interface IComment {
	id: number;
	issue: string;
	designer: Pick<IDesigner, 'avatar' | 'username' | 'thumbnails'>;
	date_created: string;
	message: string;
}
