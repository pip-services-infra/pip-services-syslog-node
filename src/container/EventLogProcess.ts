import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { EventLogServiceFactory } from '../build/EventLogServiceFactory';

export class EventLogProcess extends ProcessContainer {

    public constructor() {
        super("eventlog", "System event logging microservice");
        this._factories.add(new EventLogServiceFactory);
    }

}
