import { ConfigParams } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { JsonFilePersister } from 'pip-services-data-node';

import { EventLogMemoryPersistence } from './EventLogMemoryPersistence';
import { SystemEventV1 } from '../data/version1/SystemEventV1';

export class EventLogFilePersistence extends EventLogMemoryPersistence {
	protected _persister: JsonFilePersister<SystemEventV1>;

    public constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<SystemEventV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }

}