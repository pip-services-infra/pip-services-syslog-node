import { Descriptor } from 'pip-services-commons-node';
import { CommandableRestService } from 'pip-services-net-node';

export class EventLogRestServiceV1 extends CommandableRestService {
    public constructor() {
        super('eventlog');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-eventlog', 'controller', 'default', '*', '1.0'));
    }
}