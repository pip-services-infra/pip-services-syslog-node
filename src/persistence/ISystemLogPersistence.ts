import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { IPersistence } from 'pip-services-runtime-node';

export interface ISystemLogPersistence extends IPersistence {
    getSystemActivities(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any): void;
    createSystemActivity(correlationId: string, activity: any, callback: any): void;
}
