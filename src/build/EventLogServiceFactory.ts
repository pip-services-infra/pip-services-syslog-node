import { Factory } from 'pip-services-components-node';
import { Descriptor } from 'pip-services-commons-node';

import { EventLogMongoDbPersistence } from '../persistence/EventLogMongoDbPersistence';
import { EventLogFilePersistence } from '../persistence/EventLogFilePersistence';
import { EventLogMemoryPersistence } from '../persistence/EventLogMemoryPersistence';
import { EventLogController } from '../logic/EventLogController';
import { EventLogHttpServiceV1 } from '../services/version1/EventLogHttpServiceV1';
import { EventLogSenecaServiceV1 } from '../services/version1/EventLogSenecaServiceV1'; 

export class EventLogServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-eventlog", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-eventlog", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-eventlog", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-eventlog", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-eventlog", "controller", "default", "*", "1.0");
	public static SenecaServiceDescriptor = new Descriptor("pip-services-eventlog", "service", "seneca", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-eventlog", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(EventLogServiceFactory.MemoryPersistenceDescriptor, EventLogMemoryPersistence);
		this.registerAsType(EventLogServiceFactory.FilePersistenceDescriptor, EventLogFilePersistence);
		this.registerAsType(EventLogServiceFactory.MongoDbPersistenceDescriptor, EventLogMongoDbPersistence);
		this.registerAsType(EventLogServiceFactory.ControllerDescriptor, EventLogController);
		this.registerAsType(EventLogServiceFactory.SenecaServiceDescriptor, EventLogSenecaServiceV1);
		this.registerAsType(EventLogServiceFactory.HttpServiceDescriptor, EventLogHttpServiceV1);
	}
	
}
