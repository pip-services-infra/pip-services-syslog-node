"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var pip_services_runtime_node_5 = require('pip-services-runtime-node');
var SystemLogCommandSet = (function (_super) {
    __extends(SystemLogCommandSet, _super);
    function SystemLogCommandSet(logic) {
        _super.call(this);
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetSystemActivitiesCommand());
        this.addCommand(this.makeLogSystemActivityCommand());
    }
    SystemLogCommandSet.prototype.makeGetSystemActivitiesCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "get_system_activities", new pip_services_runtime_node_3.Schema()
            .withOptionalProperty("filter", "FilterParams")
            .withOptionalProperty("paging", "PagingParams"), function (correlationId, args, callback) {
            var filter = pip_services_runtime_node_4.FilterParams.fromValue(args.get("filter"));
            var paging = pip_services_runtime_node_5.PagingParams.fromValue(args.get("paging"));
            _this._logic.getSystemActivities(correlationId, filter, paging, callback);
        });
    };
    SystemLogCommandSet.prototype.makeLogSystemActivityCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "log_system_activity", new pip_services_runtime_node_3.Schema()
            .withProperty("activity", "object"), function (correlationId, args, callback) {
            var activity = args.get("activity");
            _this._logic.logSystemActivity(correlationId, activity, callback);
        });
    };
    return SystemLogCommandSet;
}(pip_services_runtime_node_1.CommandSet));
exports.SystemLogCommandSet = SystemLogCommandSet;
