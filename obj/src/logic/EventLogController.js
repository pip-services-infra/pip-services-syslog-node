"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const EventLogSeverityV1_1 = require("../data/version1/EventLogSeverityV1");
const EventLogCommandSet_1 = require("./EventLogCommandSet");
class EventLogController {
    constructor() {
        this._dependencyResolver = new pip_services_commons_node_2.DependencyResolver(EventLogController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new EventLogCommandSet_1.EventLogCommandSet(this);
        return this._commandSet;
    }
    getEvents(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    logEvent(correlationId, event, callback) {
        event.severity = event.severity || EventLogSeverityV1_1.EventLogSeverityV1.Informational;
        event.time = event.time || new Date();
        this._persistence.create(correlationId, event, callback);
    }
}
EventLogController._defaultConfig = pip_services_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'pip-services-eventlog:persistence:*:*:1.0');
exports.EventLogController = EventLogController;
//# sourceMappingURL=EventLogController.js.map