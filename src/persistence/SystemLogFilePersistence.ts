let _ = require('lodash');
let os = require('os');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { Converter } from 'pip-services-runtime-node';
import { FilePersistence } from 'pip-services-runtime-node';
import { ISystemLogPersistence } from './ISystemLogPersistence';

export class SystemLogFilePersistence extends FilePersistence implements ISystemLogPersistence {
	/**
	 * Unique descriptor for the SystemLogFilePersistence component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Persistence, "pip-services-syslog", "file", "*"
	);
    
    constructor(descriptor?: ComponentDescriptor) {
        super(descriptor || SystemLogFilePersistence.Descriptor);
    }
    
    private validateSystemActivity(item) {
        item = _.pick(item, 'id', 'time', 'server', 'type', 'severity', 'details');
        
        //item.time = item.time ? Converter.toDate(item.time) : null;
        item.severity = item.severity ? Converter.toInteger(item.severity) : null;
        
        return item;
    }
    
    public getSystemActivities(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any) {
        let filterParams = <any>filter || {};
        let server = filterParams.server;
        let type = filterParams.type;
        let severity = filterParams.severity;

        let filterFunc = (item) => {
            if (server && item.server != server) return false;
            if (type && item.type != type) return false;
            if (severity && item.severity != severity) return false;
            return true; 
        };

        this.getPage(filterFunc, paging, null, null, callback);
    }

    public createSystemActivity(correlationId: string, activity: any, callback: any) {
        activity = this.validateSystemActivity(activity);

        activity.id = activity.id || this.createUuid();
        activity.server = activity.server || os.hostname();
        activity.time = activity.time || new Date();
            
        this.create(activity, callback);
    }

}
