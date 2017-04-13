"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const pip_services_commons_node_6 = require("pip-services-commons-node");
const pip_services_commons_node_7 = require("pip-services-commons-node");
const pip_services_commons_node_8 = require("pip-services-commons-node");
const SystemEventV1Schema_1 = require("../data/version1/SystemEventV1Schema");
class EventLogCommandSet extends pip_services_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetEventsCommand());
        this.addCommand(this.makeLogEventCommand());
    }
    makeGetEventsCommand() {
        return new pip_services_commons_node_2.Command("get_events", new pip_services_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('fitler', new pip_services_commons_node_6.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services_commons_node_7.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getEvents(correlationId, filter, paging, callback);
        });
    }
    makeLogEventCommand() {
        return new pip_services_commons_node_2.Command("log_event", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('event', new SystemEventV1Schema_1.SystemEventV1Schema()), (correlationId, args, callback) => {
            let event = args.get("event");
            event.time = pip_services_commons_node_8.DateTimeConverter.toNullableDateTime(event.time);
            this._logic.logEvent(correlationId, event, callback);
        });
    }
}
exports.EventLogCommandSet = EventLogCommandSet;
//# sourceMappingURL=EventLogCommandSet.js.map