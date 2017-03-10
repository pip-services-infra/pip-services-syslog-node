"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var pip_services_runtime_node_5 = require('pip-services-runtime-node');
var SystemLogRestService = (function (_super) {
    __extends(SystemLogRestService, _super);
    function SystemLogRestService() {
        _super.call(this, SystemLogRestService.Descriptor);
    }
    SystemLogRestService.prototype.link = function (components) {
        this._logic = components.getOnePrior(this, new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.BusinessLogic, "pip-services-syslog", "*", "*"));
        _super.prototype.link.call(this, components);
    };
    SystemLogRestService.prototype.getSystemActivities = function (req, res) {
        this._logic.getSystemActivities(req.params.correlation_id, new pip_services_runtime_node_4.FilterParams(req.params), new pip_services_runtime_node_5.PagingParams(req.params), this.sendResult(req, res));
    };
    SystemLogRestService.prototype.logSystemActivity = function (req, res) {
        this._logic.logSystemActivity(req.params.correlation_id, req.body, this.sendResult(req, res));
    };
    SystemLogRestService.prototype.register = function () {
        this.registerRoute('get', '/syslog', this.getSystemActivities);
        this.registerRoute('post', '/syslog', this.logSystemActivity);
    };
    /**
     * Unique descriptor for the SystemLogRestService component
     */
    SystemLogRestService.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Services, "pip-services-syslog", "rest", "1.0");
    return SystemLogRestService;
}(pip_services_runtime_node_3.RestService));
exports.SystemLogRestService = SystemLogRestService;
