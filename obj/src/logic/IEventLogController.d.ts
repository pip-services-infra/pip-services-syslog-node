import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { SystemEventV1 } from '../data/version1/SystemEventV1';
export interface IEventLogController {
    getEvents(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<SystemEventV1>) => void): void;
    logEvent(correlationId: string, event: SystemEventV1, callback?: (err: any, event: SystemEventV1) => void): void;
}
