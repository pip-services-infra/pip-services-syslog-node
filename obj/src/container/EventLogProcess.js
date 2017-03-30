"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const EventLogFactory_1 = require("../build/EventLogFactory");
class EventLogProcess extends pip_services_container_node_1.ProcessContainer {
    initReferences(references) {
        super.initReferences(references);
        // Factory to statically resolve eventlog components
        references.put(EventLogFactory_1.EventLogFactory.Descriptor, new EventLogFactory_1.EventLogFactory());
    }
    runWithArguments(args) {
        return this.runWithArgumentsOrConfigFile("eventlog", args, "./config/config.yaml");
    }
}
exports.EventLogProcess = EventLogProcess;
//# sourceMappingURL=EventLogProcess.js.map