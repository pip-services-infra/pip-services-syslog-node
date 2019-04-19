"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
class SystemEventV1Schema extends pip_services3_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('time', null); //TypeCode.DateTime);
        this.withOptionalProperty('correlation_id', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('source', pip_services3_commons_node_2.TypeCode.String);
        this.withRequiredProperty('type', pip_services3_commons_node_2.TypeCode.String);
        this.withRequiredProperty('severity', pip_services3_commons_node_2.TypeCode.Long);
        this.withOptionalProperty('message', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('details', pip_services3_commons_node_2.TypeCode.Map);
    }
}
exports.SystemEventV1Schema = SystemEventV1Schema;
//# sourceMappingURL=SystemEventV1Schema.js.map