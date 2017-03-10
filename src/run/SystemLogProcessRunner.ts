import { ProcessRunner } from 'pip-services-runtime-node';

import { SystemLogMicroservice } from './SystemLogMicroservice';

/**
 * Syslog process runner
 * 
 * @author Sergey Seroukhov
 * @version 1.1
 * @since 2016-06-06
 */
export class SystemLogProcessRunner extends ProcessRunner {
    /**
     * Creates instance of quotes process runner
     */
    constructor() {
        super(new SystemLogMicroservice());
    }
}