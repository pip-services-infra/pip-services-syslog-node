import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services-data-node';
import { SystemEventV1 } from '../data/version1/SystemEventV1';
import { IEventLogPersistence } from './IEventLogPersistence';
export declare class EventLogMemoryPersistence extends IdentifiableMemoryPersistence<SystemEventV1, string> implements IEventLogPersistence {
    constructor();
    private matchString(value, search);
    private matchSearch(item, search);
    private composeFilter(filter);
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<SystemEventV1>) => void): void;
}
