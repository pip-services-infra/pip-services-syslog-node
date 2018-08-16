"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const EventLogServiceFactory_1 = require("../build/EventLogServiceFactory");
class EventLogProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("eventlog", "System event logging microservice");
        this._factories.add(new EventLogServiceFactory_1.EventLogServiceFactory);
    }
}
exports.EventLogProcess = EventLogProcess;
//# sourceMappingURL=EventLogProcess.js.map