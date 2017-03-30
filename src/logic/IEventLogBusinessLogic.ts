import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';

import { SystemEventV1 } from '../data/version1/SystemEventV1';

export interface IEventLogBusinessLogic {
    read(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<SystemEventV1>) => void): void;
    write(correlationId: string, event: SystemEventV1, callback?: (err: any, event: SystemEventV1) => void): void;
}
