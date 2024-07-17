export interface IIssue {
	id: number;
	status: 'New' | 'In Progress' | 'Done';
	designer: string | null;
	project: string;
	date_created: string;
	summary: string;
	received_from_client: number;
	send_to_project_manager: number;
	send_to_account_manager: number;
	send_to_designer: number;
	date_updated: string;
	date_started_by_designer: string | null;
	date_finished_by_designer: string | null;
	date_finished: string | null;
}
