import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { EventLogFactory } from '../build/EventLogFactory';

export class EventLogProcess extends ProcessContainer {

    public constructor() {
        super("eventlog", "System event logging microservice");
        this._factories.add(new EventLogFactory);
    }

}
