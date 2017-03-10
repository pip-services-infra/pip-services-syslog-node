let _ = require('lodash');
let os = require('os');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { MongoDbPersistence } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { Converter } from 'pip-services-runtime-node';
import { ISystemLogPersistence } from './ISystemLogPersistence';

export class SystemLogMongoDbPersistence extends MongoDbPersistence implements ISystemLogPersistence {
	/**
	 * Unique descriptor for the SystemLogMongoDbPersistence component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Persistence, "pip-services-syslog", "mongodb", "*"
	);

    constructor() {
        super(SystemLogMongoDbPersistence.Descriptor, require('./SystemLogModel'));
    }
    
    private validateSystemActivity(item) {
        item = _.pick(item, 'id', 'time', 'server', 'type', 'severity', 'details');
        
        //item.time = item.time ? Converter.toDate(item.time) : null;
        item.severity = item.severity ? Converter.toInteger(item.severity) : null;
        
        return item;
    }
    
    public getSystemActivities(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any) {
        let criteria = _.pick(filter, 'server', 'type', 'severity');

        this.getPage(criteria, paging, '-time', null, callback);
    }

    public createSystemActivity(correlationId: string, activity: any, callback: any) {
        activity = this.validateSystemActivity(activity);
        activity._id = activity.id || this.createUuid();
        activity.server = activity.server || os.hostname();
        activity.time = activity.time || new Date();

        this.create(activity, callback);
    }

}
