"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_net_node_2 = require("pip-services-net-node");
const EventLogMemoryPersistence_1 = require("../persistence/EventLogMemoryPersistence");
const EventLogFilePersistence_1 = require("../persistence/EventLogFilePersistence");
const EventLogMongoDbPersistence_1 = require("../persistence/EventLogMongoDbPersistence");
const EventLogController_1 = require("../logic/EventLogController");
const EventLogSenecaServiceV1_1 = require("../services/version1/EventLogSenecaServiceV1");
class EventLogSenecaPlugin extends pip_services_net_node_1.SenecaPlugin {
    constructor(seneca, options) {
        super('pip-services-eventlog', seneca, EventLogSenecaPlugin.createReferences(seneca, options));
    }
    static createReferences(seneca, options) {
        options = options || {};
        let logger = new pip_services_commons_node_4.ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(pip_services_commons_node_3.ConfigParams.fromValue(loggerOptions));
        let controller = new EventLogController_1.EventLogController();
        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb')
            persistence = new EventLogMongoDbPersistence_1.EventLogMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new EventLogFilePersistence_1.EventLogFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new EventLogMemoryPersistence_1.EventLogMemoryPersistence();
        else
            throw new pip_services_commons_node_5.ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(pip_services_commons_node_3.ConfigParams.fromValue(persistenceOptions));
        let senecaInstance = new pip_services_net_node_2.SenecaInstance(seneca);
        let service = new EventLogSenecaServiceV1_1.EventLogSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(pip_services_commons_node_3.ConfigParams.fromValue(serviceOptions));
        return pip_services_commons_node_1.References.fromTuples(new pip_services_commons_node_2.Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger, new pip_services_commons_node_2.Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaInstance, new pip_services_commons_node_2.Descriptor('pip-services-eventlog', 'persistence', persistenceType, 'default', '1.0'), persistence, new pip_services_commons_node_2.Descriptor('pip-services-eventlog', 'controller', 'default', 'default', '1.0'), controller, new pip_services_commons_node_2.Descriptor('pip-services-eventlog', 'service', 'seneca', 'default', '1.0'), service);
    }
}
exports.EventLogSenecaPlugin = EventLogSenecaPlugin;
module.exports = function (options) {
    let seneca = this;
    let plugin = new EventLogSenecaPlugin(seneca, options);
    return { name: plugin.name };
};
//# sourceMappingURL=EventLogSenecaPlugin.js.map