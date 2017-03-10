import { CommandSet } from 'pip-services-runtime-node';
import { ICommand } from 'pip-services-runtime-node';
import { Command } from 'pip-services-runtime-node';
import { Schema } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';

import { ISystemLogBusinessLogic } from './ISystemLogBusinessLogic';

export class SystemLogCommandSet extends CommandSet {
    private _logic: ISystemLogBusinessLogic;

    constructor(logic: ISystemLogBusinessLogic) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetSystemActivitiesCommand());
		this.addCommand(this.makeLogSystemActivityCommand());
    }

	private makeGetSystemActivitiesCommand(): ICommand {
		return new Command(
			this._logic,
			"get_system_activities",
			new Schema()
				.withOptionalProperty("filter", "FilterParams")
				.withOptionalProperty("paging", "PagingParams")
			,
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                this._logic.getSystemActivities(correlationId, filter, paging, callback);
            }
		);
	}

	private makeLogSystemActivityCommand(): ICommand {
		return new Command(
			this._logic,
			"log_system_activity",
			new Schema()
				.withProperty("activity", "object"),
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let activity = args.get("activity");
                this._logic.logSystemActivity(correlationId, activity, callback);
            }
		);
	}

}