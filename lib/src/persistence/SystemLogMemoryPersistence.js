"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var SystemLogFilePersistence_1 = require('./SystemLogFilePersistence');
var SystemLogMemoryPersistence = (function (_super) {
    __extends(SystemLogMemoryPersistence, _super);
    function SystemLogMemoryPersistence() {
        _super.call(this, SystemLogMemoryPersistence.Descriptor);
    }
    SystemLogMemoryPersistence.prototype.configure = function (config) {
        _super.prototype.configure.call(this, config.withDefaultTuples("options.path", ""));
    };
    SystemLogMemoryPersistence.prototype.save = function (callback) {
        // Skip saving data to disk
        if (callback)
            callback(null);
    };
    /**
     * Unique descriptor for the SystemLogFilePersistence component
     */
    SystemLogMemoryPersistence.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-syslog", "memory", "*");
    return SystemLogMemoryPersistence;
}(SystemLogFilePersistence_1.SystemLogFilePersistence));
exports.SystemLogMemoryPersistence = SystemLogMemoryPersistence;
