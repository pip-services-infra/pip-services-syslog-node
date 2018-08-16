import { Descriptor } from 'pip-services-commons-node';
import { CommandableSenecaService } from 'pip-services-seneca-node';

export class EventLogSenecaServiceV1 extends CommandableSenecaService {
    public constructor() {
        super('eventlog');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-eventlog', 'controller', 'default', '*', '1.0'));
    }
}