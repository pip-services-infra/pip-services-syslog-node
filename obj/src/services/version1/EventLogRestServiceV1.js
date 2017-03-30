"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class EventLogRestServiceV1 extends pip_services_net_node_1.CommandableRestService {
    constructor() {
        super('eventlog');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-eventlog', 'controller', 'default', '*', '1.0'));
    }
}
exports.EventLogRestServiceV1 = EventLogRestServiceV1;
//# sourceMappingURL=EventLogRestServiceV1.js.map