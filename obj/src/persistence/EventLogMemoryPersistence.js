"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_data_node_1 = require("pip-services-data-node");
class EventLogMemoryPersistence extends pip_services_data_node_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
    }
    matchString(value, search) {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }
    matchSearch(item, search) {
        search = search.toLowerCase();
        if (this.matchString(item.source, search))
            return true;
        if (this.matchString(item.message, search))
            return true;
        // if (this.matchString(item.severity.toString(), search))
        //     return true;
        if (this.matchString(item.type, search))
            return true;
        return false;
    }
    composeFilter(filter) {
        filter = filter || new pip_services_commons_node_1.FilterParams();
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let correlationId = filter.getAsNullableString('correlation_id');
        let source = filter.getAsNullableString('source');
        let type = filter.getAsNullableString('type');
        let minSeverity = filter.getAsNullableInteger('min_severity');
        let fromTime = filter.getAsNullableDateTime('from_time');
        let toTime = filter.getAsNullableDateTime('to_time');
        return (item) => {
            if (search != null && !this.matchSearch(item, search))
                return false;
            if (id != null && id != item.id)
                return false;
            if (correlationId != null && correlationId != item.correlationId)
                return false;
            if (source != null && source != item.source)
                return false;
            if (type != null && type != item.type)
                return false;
            if (minSeverity != null && item.severity >= minSeverity)
                return false;
            if (fromTime != null && item.time >= fromTime)
                return false;
            if (toTime != null && item.time < toTime)
                return false;
            return true;
        };
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
}
exports.EventLogMemoryPersistence = EventLogMemoryPersistence;
//# sourceMappingURL=EventLogMemoryPersistence.js.map