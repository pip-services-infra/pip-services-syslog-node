import { Descriptor } from 'pip-services3-commons-node';
import { CommandableHttpService } from 'pip-services3-rpc-node';

export class EventLogHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/eventlog');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-eventlog', 'controller', 'default', '*', '1.0'));
    }
}