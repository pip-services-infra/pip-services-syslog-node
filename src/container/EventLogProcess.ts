import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { EventLogFactory } from '../build/EventLogFactory';

export class EventLogProcess extends ProcessContainer {

    protected initReferences(references: IReferences): void {
        super.initReferences(references);

        // Factory to statically resolve eventlog components
        references.put(EventLogFactory.Descriptor, new EventLogFactory());
    }

    public runWithArguments(args: string[]): void {
        return this.runWithArgumentsOrConfigFile("eventlog", args, "./config/config.yaml");
    }

}
