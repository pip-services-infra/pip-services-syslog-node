let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';

import { SystemLogFilePersistence } from './SystemLogFilePersistence';
import { ISystemLogPersistence } from './ISystemLogPersistence';

export class SystemLogMemoryPersistence extends SystemLogFilePersistence implements ISystemLogPersistence {
	/**
	 * Unique descriptor for the SystemLogFilePersistence component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Persistence, "pip-services-syslog", "memory", "*"
	);

    constructor() {
        super(SystemLogMemoryPersistence.Descriptor);
    }

    public configure(config: ComponentConfig): void {
        super.configure(config.withDefaultTuples("options.path", ""));
    }

    public save(callback: (err: any) => void): void {
        // Skip saving data to disk
        if (callback) callback(null);
    }
}
