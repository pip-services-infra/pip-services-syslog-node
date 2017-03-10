import { SenecaPlugin } from 'pip-services-runtime-node';

import { SystemLogMicroservice} from './SystemLogMicroservice';

export class SystemLogSenecaPlugin extends SenecaPlugin {
    constructor() {
        super('syslog', new SystemLogMicroservice());
    }
}