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
var SystemLogMongoDbPersistence = (function (_super) {
    __extends(SystemLogMongoDbPersistence, _super);
    function SystemLogMongoDbPersistence() {
        _super.call(this, SystemLogMongoDbPersistence.Descriptor, require('./SystemLogModel'));
    }
    SystemLogMongoDbPersistence.prototype.validateSystemActivity = function (item) {
        item = _.pick(item, 'id', 'time', 'server', 'type', 'severity', 'details');
        //item.time = item.time ? Converter.toDate(item.time) : null;
        item.severity = item.severity ? pip_services_runtime_node_4.Converter.toInteger(item.severity) : null;
        return item;
    };
    SystemLogMongoDbPersistence.prototype.getSystemActivities = function (correlationId, filter, paging, callback) {
        var criteria = _.pick(filter, 'server', 'type', 'severity');
        this.getPage(criteria, paging, '-time', null, callback);
    };
    SystemLogMongoDbPersistence.prototype.createSystemActivity = function (correlationId, activity, callback) {
        activity = this.validateSystemActivity(activity);
        activity._id = activity.id || this.createUuid();
        activity.server = activity.server || os.hostname();
        activity.time = activity.time || new Date();
        this.create(activity, callback);
    };
    /**
     * Unique descriptor for the SystemLogMongoDbPersistence component
     */
    SystemLogMongoDbPersistence.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-syslog", "mongodb", "*");
    return SystemLogMongoDbPersistence;
}(pip_services_runtime_node_3.MongoDbPersistence));
exports.SystemLogMongoDbPersistence = SystemLogMongoDbPersistence;
