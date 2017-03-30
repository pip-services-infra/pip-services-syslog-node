import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { DependencyResolver } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { ICommandable } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';

import { SystemEventV1 } from '../data/version1/SystemEventV1';
import { IEventLogPersistence } from '../persistence/IEventLogPersistence';
import { IEventLogBusinessLogic } from './IEventLogBusinessLogic';
import { EventLogCommandSet } from './EventLogCommandSet';

export class EventLogController implements IConfigurable, IReferenceable, ICommandable, IEventLogBusinessLogic {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'pip-services-eventlog:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(EventLogController._defaultConfig);
    private _persistence: IEventLogPersistence;
    private _commandSet: EventLogCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IEventLogPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new EventLogCommandSet(this);
        return this._commandSet;
    }

    public read(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<SystemEventV1>) => void): void {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }

    public write(correlationId: string, event: SystemEventV1, callback: (err: any) => void): void {
        this._persistence.create(correlationId, event, callback);
    }
    
}
