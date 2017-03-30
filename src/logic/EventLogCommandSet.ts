import { CommandSet } from 'pip-services-commons-node';
import { ICommand } from 'pip-services-commons-node';
import { Command } from 'pip-services-commons-node';
import { Schema } from 'pip-services-commons-node';
import { Parameters } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';

import { SystemEventV1 } from '../data/version1/SystemEventV1';
import { IEventLogBusinessLogic } from './IEventLogBusinessLogic';

export class EventLogCommandSet extends CommandSet {
    private _logic: IEventLogBusinessLogic;

	constructor(logic: IEventLogBusinessLogic) {
		super();

		this._logic = logic;

		// Register commands to the database
		this.addCommand(this.makeReadCommand());
		this.addCommand(this.makeWriteCommand());
	}

	private makeReadCommand(): ICommand {
		return new Command(
			"get_events_page_by_filter",
			null,
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let filter = FilterParams.fromValue(args.get("filter"));
				let paging = PagingParams.fromValue(args.get("paging"));
				this._logic.get_events_page_by_filter(correlationId, filter, paging, callback);
			}
		);
	}

	private makeWriteCommand(): ICommand {
		return new Command(
			"log_event",
			null,
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let event: SystemEventV1 = args.get("event");
				this._logic.log_event(correlationId, event, callback);
			}
		);
	}

}