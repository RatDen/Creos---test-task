import { IDesigner } from './IDesigner';

export interface IDesignersList {
	count: number;
	next: string | null;
	previous: string | null;
	results: IDesigner[];
}
