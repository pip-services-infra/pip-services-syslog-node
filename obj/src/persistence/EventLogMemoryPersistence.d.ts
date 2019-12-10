import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';
import { SystemEventV1 } from '../data/version1/SystemEventV1';
import { IEventLogPersistence } from './IEventLogPersistence';
export declare class EventLogMemoryPersistence extends IdentifiableMemoryPersistence<SystemEventV1, string> implements IEventLogPersistence {
    constructor();
    private matchString;
    private matchSearch;
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<SystemEventV1>) => void): void;
}
