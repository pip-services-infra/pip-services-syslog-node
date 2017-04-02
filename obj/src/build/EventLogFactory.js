"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const EventLogMongoDbPersistence_1 = require("../persistence/EventLogMongoDbPersistence");
const EventLogFilePersistence_1 = require("../persistence/EventLogFilePersistence");
const EventLogMemoryPersistence_1 = require("../persistence/EventLogMemoryPersistence");
const EventLogController_1 = require("../logic/EventLogController");
const EventLogHttpServiceV1_1 = require("../services/version1/EventLogHttpServiceV1");
const EventLogSenecaServiceV1_1 = require("../services/version1/EventLogSenecaServiceV1");
class EventLogFactory extends pip_services_commons_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(EventLogFactory.MemoryPersistenceDescriptor, EventLogMemoryPersistence_1.EventLogMemoryPersistence);
        this.registerAsType(EventLogFactory.FilePersistenceDescriptor, EventLogFilePersistence_1.EventLogFilePersistence);
        this.registerAsType(EventLogFactory.MongoDbPersistenceDescriptor, EventLogMongoDbPersistence_1.EventLogMongoDbPersistence);
        this.registerAsType(EventLogFactory.ControllerDescriptor, EventLogController_1.EventLogController);
        this.registerAsType(EventLogFactory.SenecaServiceDescriptor, EventLogSenecaServiceV1_1.EventLogSenecaServiceV1);
        this.registerAsType(EventLogFactory.HttpServiceDescriptor, EventLogHttpServiceV1_1.EventLogHttpServiceV1);
    }
}
EventLogFactory.Descriptor = new pip_services_commons_node_2.Descriptor("pip-services-eventlog", "factory", "default", "default", "1.0");
EventLogFactory.MemoryPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-eventlog", "persistence", "memory", "*", "1.0");
EventLogFactory.FilePersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-eventlog", "persistence", "file", "*", "1.0");
EventLogFactory.MongoDbPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-eventlog", "persistence", "mongodb", "*", "1.0");
EventLogFactory.ControllerDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-eventlog", "controller", "default", "*", "1.0");
EventLogFactory.SenecaServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-eventlog", "service", "seneca", "*", "1.0");
EventLogFactory.HttpServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-eventlog", "service", "http", "*", "1.0");
exports.EventLogFactory = EventLogFactory;
//# sourceMappingURL=EventLogFactory.js.map