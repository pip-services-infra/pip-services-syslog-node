"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class EventLogHttpServiceV1 extends pip_services3_rpc_node_1.CommandableHttpService {
    constructor() {
        super('v1/eventlog');
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-eventlog', 'controller', 'default', '*', '1.0'));
    }
}
exports.EventLogHttpServiceV1 = EventLogHttpServiceV1;
//# sourceMappingURL=EventLogHttpServiceV1.js.map