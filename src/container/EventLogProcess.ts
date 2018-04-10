import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';
import { DefaultOssFactory } from 'pip-services-oss-node';

import { EventLogServiceFactory } from '../build/EventLogServiceFactory';

export class EventLogProcess extends ProcessContainer {

    public constructor() {
        super("eventlog", "System event logging microservice");
        this._factories.add(new EventLogServiceFactory);
        this._factories.add(new DefaultOssFactory);
    }

}
