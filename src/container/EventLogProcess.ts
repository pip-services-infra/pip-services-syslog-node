import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';

import { EventLogServiceFactory } from '../build/EventLogServiceFactory';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';

export class EventLogProcess extends ProcessContainer {

    public constructor() {
        super("eventlog", "System event logging microservice");
        this._factories.add(new EventLogServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
