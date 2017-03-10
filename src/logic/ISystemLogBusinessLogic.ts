import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { IBusinessLogic } from 'pip-services-runtime-node';

export interface ISystemLogBusinessLogic extends IBusinessLogic {
    getSystemActivities(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any): void;
    logSystemActivity(correlationId: string, activity: any, callback: any): void;
}
