"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var SystemLogMongoDbPersistence_1 = require('../persistence/SystemLogMongoDbPersistence');
var SystemLogFilePersistence_1 = require('../persistence/SystemLogFilePersistence');
var SystemLogMemoryPersistence_1 = require('../persistence/SystemLogMemoryPersistence');
var SystemLogController_1 = require('../logic/SystemLogController');
var SystemLogRestService_1 = require('../services/version1/SystemLogRestService');
var SystemLogSenecaService_1 = require('../services/version1/SystemLogSenecaService');
var SystemLogFactory = (function (_super) {
    __extends(SystemLogFactory, _super);
    function SystemLogFactory() {
        _super.call(this, pip_services_runtime_node_2.DefaultFactory.Instance);
        this.register(SystemLogFilePersistence_1.SystemLogFilePersistence.Descriptor, SystemLogFilePersistence_1.SystemLogFilePersistence);
        this.register(SystemLogMemoryPersistence_1.SystemLogMemoryPersistence.Descriptor, SystemLogMemoryPersistence_1.SystemLogMemoryPersistence);
        this.register(SystemLogMongoDbPersistence_1.SystemLogMongoDbPersistence.Descriptor, SystemLogMongoDbPersistence_1.SystemLogMongoDbPersistence);
        this.register(SystemLogController_1.SystemLogController.Descriptor, SystemLogController_1.SystemLogController);
        this.register(SystemLogRestService_1.SystemLogRestService.Descriptor, SystemLogRestService_1.SystemLogRestService);
        this.register(SystemLogSenecaService_1.SystemLogSenecaService.Descriptor, SystemLogSenecaService_1.SystemLogSenecaService);
    }
    SystemLogFactory.Instance = new SystemLogFactory();
    return SystemLogFactory;
}(pip_services_runtime_node_1.ComponentFactory));
exports.SystemLogFactory = SystemLogFactory;
