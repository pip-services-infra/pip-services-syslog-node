let _ = require('lodash');

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services-oss-node';

import { SystemEventV1 } from '../data/version1/SystemEventV1';
import { IEventLogPersistence } from './IEventLogPersistence';
import { SystemEventMongoDbSchema } from './SystemEventMongoDbSchema';

export class EventLogMongoDbPersistence 
    extends IdentifiableMongoDbPersistence<SystemEventV1, string> 
    implements IEventLogPersistence {

    constructor() {
        super('event_log', SystemEventMongoDbSchema());
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let criteria = [];

        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            let searchCriteria = [];
            searchCriteria.push({ source: { $regex: searchRegex } });
            searchCriteria.push({ type: { $regex: searchRegex } });
            searchCriteria.push({ message: { $regex: searchRegex } });
            criteria.push({ $or: searchCriteria });
        }

        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });

        let correlationId = filter.getAsNullableString('correlation_id');
        if (correlationId != null)
            criteria.push({ correlation_id: correlationId });

        let source = filter.getAsNullableString('source');
        if (source != null)
            criteria.push({ source: source });

        let type = filter.getAsNullableString('type');
        if (type != null)
            criteria.push({ type: type });

        let minSeverity = filter.getAsNullableInteger('min_severity');
        if (minSeverity != null)
            criteria.push({ severity: { $gte: minSeverity } });

        let fromTime = filter.getAsNullableDateTime('from_time');
        if (fromTime != null)
            criteria.push({ time: { $gte: fromTime } });

        let toTime = filter.getAsNullableDateTime('to_time');
        if (toTime != null)
            criteria.push({ time: { $lt: toTime } });

        return criteria.length > 0 ? { $and: criteria } : {};
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, '-time', null, callback);
    }

}
