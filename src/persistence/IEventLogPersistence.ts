import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IGetter } from 'pip-services-data-node';
import { IWriter } from 'pip-services-data-node';

import { SystemEventV1 } from '../data/version1/SystemEventV1';

export interface IEventLogPersistence 
    extends IGetter<SystemEventV1, string>, IWriter<SystemEventV1, string> 
{
    getPageByFilter(correlation_id: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<SystemEventV1>) => void): void;

    getOneById(correlation_id: string, id: string, callback: (err: any, item: SystemEventV1) => void): void;

    create(correlation_id: string, item: SystemEventV1, callback?: (err: any, item: SystemEventV1) => void): void;

    update(correlation_id: string, item: SystemEventV1, callback?: (err: any, item: SystemEventV1) => void): void;
    
    deleteById(correlation_id: string, id: string, callback?: (err: any, item: SystemEventV1) => void): void;
}
