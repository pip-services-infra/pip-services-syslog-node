import { ComponentFactory } from 'pip-services-runtime-node';
import { DefaultFactory } from 'pip-services-runtime-node';

import { SystemLogMongoDbPersistence } from '../persistence/SystemLogMongoDbPersistence';
import { SystemLogFilePersistence } from '../persistence/SystemLogFilePersistence';
import { SystemLogMemoryPersistence } from '../persistence/SystemLogMemoryPersistence';
import { SystemLogController } from '../logic/SystemLogController';
import { SystemLogRestService } from '../services/version1/SystemLogRestService';
import { SystemLogSenecaService } from '../services/version1/SystemLogSenecaService'; 

export class SystemLogFactory extends ComponentFactory {
	public static Instance: SystemLogFactory = new SystemLogFactory();
	
	constructor() {
		super(DefaultFactory.Instance);

		this.register(SystemLogFilePersistence.Descriptor, SystemLogFilePersistence);
		this.register(SystemLogMemoryPersistence.Descriptor, SystemLogMemoryPersistence);
		this.register(SystemLogMongoDbPersistence.Descriptor, SystemLogMongoDbPersistence);
		this.register(SystemLogController.Descriptor, SystemLogController);
		this.register(SystemLogRestService.Descriptor, SystemLogRestService);
		this.register(SystemLogSenecaService.Descriptor, SystemLogSenecaService);
	}
	
}
