"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_oss_node_1 = require("pip-services-oss-node");
const EventLogServiceFactory_1 = require("../build/EventLogServiceFactory");
class EventLogProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("eventlog", "System event logging microservice");
        this._factories.add(new EventLogServiceFactory_1.EventLogServiceFactory);
        this._factories.add(new pip_services_net_node_1.DefaultNetFactory);
        this._factories.add(new pip_services_oss_node_1.DefaultOssFactory);
    }
}
exports.EventLogProcess = EventLogProcess;
//# sourceMappingURL=EventLogProcess.js.map