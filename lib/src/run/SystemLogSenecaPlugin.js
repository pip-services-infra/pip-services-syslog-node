"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var SystemLogMicroservice_1 = require('./SystemLogMicroservice');
var SystemLogSenecaPlugin = (function (_super) {
    __extends(SystemLogSenecaPlugin, _super);
    function SystemLogSenecaPlugin() {
        _super.call(this, 'syslog', new SystemLogMicroservice_1.SystemLogMicroservice());
    }
    return SystemLogSenecaPlugin;
}(pip_services_runtime_node_1.SenecaPlugin));
exports.SystemLogSenecaPlugin = SystemLogSenecaPlugin;
