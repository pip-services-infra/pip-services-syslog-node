import { Descriptor } from 'pip-services-commons-node';
import { CommandableHttpService } from 'pip-services-net-node';

export class EventLogHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('eventlog');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-eventlog', 'controller', 'default', '*', '1.0'));
    }
}