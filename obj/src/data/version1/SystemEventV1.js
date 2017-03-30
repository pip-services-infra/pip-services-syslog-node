"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const EventLogSeverityV1_1 = require("./EventLogSeverityV1");
const EventLogTypeV1_1 = require("./EventLogTypeV1");
class SystemEventV1 {
    constructor(correlationId, source, type, severity, message, details) {
        this.id = pip_services_commons_node_1.IdGenerator.nextLong();
        this.time = new Date();
        this.correlationId = correlationId;
        this.source = source;
        this.type = type || EventLogTypeV1_1.EventLogTypeV1.Other;
        this.severity = severity || EventLogSeverityV1_1.EventLogSeverityV1.Informational;
        this.message = message;
        this.details = details || new pip_services_commons_node_2.StringValueMap();
    }
}
exports.SystemEventV1 = SystemEventV1;
//# sourceMappingURL=SystemEventV1.js.map