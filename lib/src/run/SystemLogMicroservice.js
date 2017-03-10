"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var SystemLogFactory_1 = require('../build/SystemLogFactory');
/**
 * Syslog microservice class.
 *
 * @author Sergey Seroukhov
 * @version 1.0
 * @since 2016-06-09
 */
var SystemLogMicroservice = (function (_super) {
    __extends(SystemLogMicroservice, _super);
    /**
     * Creates instance of syslog microservice.
     */
    function SystemLogMicroservice() {
        _super.call(this, "pip-services-syslog", SystemLogFactory_1.SystemLogFactory.Instance);
    }
    return SystemLogMicroservice;
}(pip_services_runtime_node_1.Microservice));
exports.SystemLogMicroservice = SystemLogMicroservice;
