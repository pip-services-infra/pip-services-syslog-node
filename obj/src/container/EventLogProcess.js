"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
// import { DefaultNetFactory } from 'pip-services-net-node';
// import { DefaultOssFactory } from 'pip-services-oss-node';
const EventLogServiceFactory_1 = require("../build/EventLogServiceFactory");
class EventLogProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("eventlog", "System event logging microservice");
        this._factories.add(new EventLogServiceFactory_1.EventLogServiceFactory);
        // this._factories.add(new DefaultNetFactory);
        // this._factories.add(new DefaultOssFactory);
    }
}
exports.EventLogProcess = EventLogProcess;
//# sourceMappingURL=EventLogProcess.js.map