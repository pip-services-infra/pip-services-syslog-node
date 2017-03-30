import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services-data-node';
import { SystemEventV1 } from '../data/version1/SystemEventV1';
import { IEventLogPersistence } from './IEventLogPersistence';
export declare class EventLogMongoDbPersistence extends IdentifiableMongoDbPersistence<SystemEventV1, string> implements IEventLogPersistence {
    constructor();
    private composeFilter(filter);
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any): void;
}
