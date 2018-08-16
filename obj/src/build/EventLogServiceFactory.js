"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_components_node_1 = require("pip-services-components-node");
const pip_services_commons_node_1 = require("pip-services-commons-node");
const EventLogMongoDbPersistence_1 = require("../persistence/EventLogMongoDbPersistence");
const EventLogFilePersistence_1 = require("../persistence/EventLogFilePersistence");
const EventLogMemoryPersistence_1 = require("../persistence/EventLogMemoryPersistence");
const EventLogController_1 = require("../logic/EventLogController");
const EventLogHttpServiceV1_1 = require("../services/version1/EventLogHttpServiceV1");
const EventLogSenecaServiceV1_1 = require("../services/version1/EventLogSenecaServiceV1");
class EventLogServiceFactory extends pip_services_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(EventLogServiceFactory.MemoryPersistenceDescriptor, EventLogMemoryPersistence_1.EventLogMemoryPersistence);
        this.registerAsType(EventLogServiceFactory.FilePersistenceDescriptor, EventLogFilePersistence_1.EventLogFilePersistence);
        this.registerAsType(EventLogServiceFactory.MongoDbPersistenceDescriptor, EventLogMongoDbPersistence_1.EventLogMongoDbPersistence);
        this.registerAsType(EventLogServiceFactory.ControllerDescriptor, EventLogController_1.EventLogController);
        this.registerAsType(EventLogServiceFactory.SenecaServiceDescriptor, EventLogSenecaServiceV1_1.EventLogSenecaServiceV1);
        this.registerAsType(EventLogServiceFactory.HttpServiceDescriptor, EventLogHttpServiceV1_1.EventLogHttpServiceV1);
    }
}
EventLogServiceFactory.Descriptor = new pip_services_commons_node_1.Descriptor("pip-services-eventlog", "factory", "default", "default", "1.0");
EventLogServiceFactory.MemoryPersistenceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-eventlog", "persistence", "memory", "*", "1.0");
EventLogServiceFactory.FilePersistenceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-eventlog", "persistence", "file", "*", "1.0");
EventLogServiceFactory.MongoDbPersistenceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-eventlog", "persistence", "mongodb", "*", "1.0");
EventLogServiceFactory.ControllerDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-eventlog", "controller", "default", "*", "1.0");
EventLogServiceFactory.SenecaServiceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-eventlog", "service", "seneca", "*", "1.0");
EventLogServiceFactory.HttpServiceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-eventlog", "service", "http", "*", "1.0");
exports.EventLogServiceFactory = EventLogServiceFactory;
//# sourceMappingURL=EventLogServiceFactory.js.map