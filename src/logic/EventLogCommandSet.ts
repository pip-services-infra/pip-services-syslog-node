import { CommandSet } from 'pip-services3-commons-node';
import { ICommand } from 'pip-services3-commons-node';
import { Command } from 'pip-services3-commons-node';
import { Schema } from 'pip-services3-commons-node';
import { Parameters } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { FilterParamsSchema } from 'pip-services3-commons-node';
import { PagingParamsSchema } from 'pip-services3-commons-node';
import { DateTimeConverter } from 'pip-services3-commons-node';

import { SystemEventV1 } from '../data/version1/SystemEventV1';
import { SystemEventV1Schema } from '../data/version1/SystemEventV1Schema';
import { IEventLogController } from './IEventLogController';

export class EventLogCommandSet extends CommandSet {
    private _logic: IEventLogController;

	constructor(logic: IEventLogController) {
		super();

		this._logic = logic;

		// Register commands to the database
		this.addCommand(this.makeGetEventsCommand());
		this.addCommand(this.makeLogEventCommand());
	}

	private makeGetEventsCommand(): ICommand {
		return new Command(
			"get_events",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let filter = FilterParams.fromValue(args.get("filter"));
				let paging = PagingParams.fromValue(args.get("paging"));
				this._logic.getEvents(correlationId, filter, paging, callback);
			}
		);
	}

	private makeLogEventCommand(): ICommand {
		return new Command(
			"log_event",
			new ObjectSchema(true)
				.withOptionalProperty('eventlog', new SystemEventV1Schema())
				.withOptionalProperty('event', new SystemEventV1Schema()),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let event: SystemEventV1 = args.get("event") || args.get("eventlog");
				event.time = DateTimeConverter.toNullableDateTime(event.time);
				this._logic.logEvent(correlationId, event, callback);
			}
		);
	}

}