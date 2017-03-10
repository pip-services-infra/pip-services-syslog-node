"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var os = require('os');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var SystemLogFilePersistence = (function (_super) {
    __extends(SystemLogFilePersistence, _super);
    function SystemLogFilePersistence(descriptor) {
        _super.call(this, descriptor || SystemLogFilePersistence.Descriptor);
    }
    SystemLogFilePersistence.prototype.validateSystemActivity = function (item) {
        item = _.pick(item, 'id', 'time', 'server', 'type', 'severity', 'details');
        //item.time = item.time ? Converter.toDate(item.time) : null;
        item.severity = item.severity ? pip_services_runtime_node_3.Converter.toInteger(item.severity) : null;
        return item;
    };
    SystemLogFilePersistence.prototype.getSystemActivities = function (correlationId, filter, paging, callback) {
        var filterParams = filter || {};
        var server = filterParams.server;
        var type = filterParams.type;
        var severity = filterParams.severity;
        var filterFunc = function (item) {
            if (server && item.server != server)
                return false;
            if (type && item.type != type)
                return false;
            if (severity && item.severity != severity)
                return false;
            return true;
        };
        this.getPage(filterFunc, paging, null, null, callback);
    };
    SystemLogFilePersistence.prototype.createSystemActivity = function (correlationId, activity, callback) {
        activity = this.validateSystemActivity(activity);
        activity.id = activity.id || this.createUuid();
        activity.server = activity.server || os.hostname();
        activity.time = activity.time || new Date();
        this.create(activity, callback);
    };
    /**
     * Unique descriptor for the SystemLogFilePersistence component
     */
    SystemLogFilePersistence.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-syslog", "file", "*");
    return SystemLogFilePersistence;
}(pip_services_runtime_node_4.FilePersistence));
exports.SystemLogFilePersistence = SystemLogFilePersistence;
