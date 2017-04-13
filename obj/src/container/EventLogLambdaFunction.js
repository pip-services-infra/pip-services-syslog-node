"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_aws_node_1 = require("pip-services-aws-node");
const EventLogFactory_1 = require("../build/EventLogFactory");
class EventLogLambdaFunction extends pip_services_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("eventlog", "System event logging function");
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-eventlog', 'controller', 'default', '*', '*'));
        this._factories.add(new EventLogFactory_1.EventLogFactory());
    }
}
exports.EventLogLambdaFunction = EventLogLambdaFunction;
exports.handler = new EventLogLambdaFunction().getHandler();
//# sourceMappingURL=EventLogLambdaFunction.js.map