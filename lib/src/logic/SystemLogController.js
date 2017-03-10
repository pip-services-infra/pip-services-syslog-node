"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var SystemLogCommandSet_1 = require('./SystemLogCommandSet');
var SystemLogController = (function (_super) {
    __extends(SystemLogController, _super);
    function SystemLogController() {
        _super.call(this, SystemLogController.Descriptor);
    }
    SystemLogController.prototype.link = function (components) {
        // Locate reference to quotes persistence component
        this._db = components.getOneRequired(new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-syslog", '*', '*'));
        _super.prototype.link.call(this, components);
        // Add commands
        var commands = new SystemLogCommandSet_1.SystemLogCommandSet(this);
        this.addCommandSet(commands);
    };
    SystemLogController.prototype.getSystemActivities = function (correlationId, filter, paging, callback) {
        callback = this.instrument(correlationId, 'syslog.get_system_activities', callback);
        this._db.getSystemActivities(correlationId, filter, paging, callback);
    };
    SystemLogController.prototype.logSystemActivity = function (correlationId, activity, callback) {
        callback = this.instrument(correlationId, 'syslog.log_system_activity', callback);
        this._db.createSystemActivity(correlationId, activity, callback);
    };
    /**
     * Unique descriptor for the SystemLogController component
     */
    SystemLogController.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Controllers, "pip-services-syslog", "*", "*");
    return SystemLogController;
}(pip_services_runtime_node_3.AbstractController));
exports.SystemLogController = SystemLogController;
