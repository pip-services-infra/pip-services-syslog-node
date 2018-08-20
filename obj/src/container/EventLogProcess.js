"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const EventLogServiceFactory_1 = require("../build/EventLogServiceFactory");
const pip_services_rpc_node_1 = require("pip-services-rpc-node");
class EventLogProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("eventlog", "System event logging microservice");
        this._factories.add(new EventLogServiceFactory_1.EventLogServiceFactory);
        this._factories.add(new pip_services_rpc_node_1.DefaultRpcFactory);
    }
}
exports.EventLogProcess = EventLogProcess;
//# sourceMappingURL=EventLogProcess.js.map