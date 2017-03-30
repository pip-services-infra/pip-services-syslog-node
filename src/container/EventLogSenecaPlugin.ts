import { References } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { ConfigException } from 'pip-services-commons-node';
import { SenecaPlugin } from 'pip-services-net-node';

import { EventLogMemoryPersistence } from '../persistence/EventLogMemoryPersistence';
import { EventLogFilePersistence } from '../persistence/EventLogFilePersistence';
import { EventLogMongoDbPersistence } from '../persistence/EventLogMongoDbPersistence';
import { EventLogController } from '../logic/EventLogController';
import { EventLogSenecaServiceV1 } from '../services/version1/EventLogSenecaServiceV1';

export class EventLogSenecaPlugin extends SenecaPlugin {
    public constructor(seneca: any, options: any) {
        super('pip-services-eventlog', seneca, EventLogSenecaPlugin.createReferences(options));
    }

    private static createReferences(options: any): References {
        options = options || {};

        let logger = new ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(ConfigParams.fromValue(loggerOptions));

        let controller = new EventLogController();

        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb') 
            persistence = new EventLogMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new EventLogFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new EventLogMemoryPersistence();
        else 
            throw new ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(ConfigParams.fromValue(persistenceOptions));

        let service = new EventLogSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(ConfigParams.fromValue(serviceOptions));

        return References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-eventlog', 'persistence', persistenceType, 'default', '1.0'), persistence,
            new Descriptor('pip-services-eventlog', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-eventlog', 'service', 'rest', 'default', '1.0'), service
        );
    }
}

module.exports = function(options: any): any {
    let seneca = this;
    let plugin = new EventLogSenecaPlugin(seneca, options);
    return { name: plugin.name };
}