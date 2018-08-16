let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';
import { SenecaInstance } from 'pip-services-seneca-node';

import { SystemEventV1 } from '../../../src/data/version1/SystemEventV1';
import { EventLogTypeV1 } from '../../../src/data/version1/EventLogTypeV1';
import { EventLogSeverityV1 } from '../../../src/data/version1/EventLogSeverityV1';
import { EventLogMemoryPersistence } from '../../../src/persistence/EventLogMemoryPersistence';
import { EventLogController } from '../../../src/logic/EventLogController';
import { EventLogSenecaServiceV1 } from '../../../src/services/version1/EventLogSenecaServiceV1';

let EVENT1: SystemEventV1 = new SystemEventV1(
    null,
    'test',
    EventLogTypeV1.Restart,
    EventLogSeverityV1.Important,
    'test restart #1'
);
let EVENT2: SystemEventV1 = new SystemEventV1(
    null,
    'test',
    EventLogTypeV1.Failure,
    EventLogSeverityV1.Critical,
    'test error'
);

suite('EventLogSenecaServiceV1', ()=> {
    let seneca: any;
    let service: EventLogSenecaServiceV1;
    let persistence: EventLogMemoryPersistence;
    let controller: EventLogController;

    suiteSetup((done) => {
        persistence = new EventLogMemoryPersistence();
        controller = new EventLogController();

        service = new EventLogSenecaServiceV1();
        service.configure(ConfigParams.fromTuples(
            "connection.protocol", "none"
        ));

        let logger = new ConsoleLogger();
        let senecaAddon = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-seneca', 'seneca', 'instance', 'default', '1.0'), senecaAddon,
            new Descriptor('pip-services-eventlog', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-eventlog', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-eventlog', 'service', 'seneca', 'default', '1.0'), service
        );

        controller.setReferences(references);
        service.setReferences(references);

        seneca = senecaAddon.getInstance();

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });
    
    setup((done) => {
        persistence.clear(null, done);
    });
    
    test('CRUD Operations', (done) => {
        let event1;
        let event2;

        async.series([
        // Create one activity
            (callback) => {
                seneca.act(
                    {
                        role: 'eventlog',
                        cmd: 'log_event',
                        event: EVENT1
                    },
                    (err, event) => {
                        assert.isNull(err);

                        assert.isObject(event);
                        assert.isNotNull(event.time);
                        assert.isNotNull(event.server);
                        assert.equal(event.type, EVENT1.type);
                        assert.equal(event.message, EVENT1.message);

                        event1 = event;

                        callback();
                    }
                );
            },
        // Create another activity
            (callback) => {
                seneca.act(
                    {
                        role: 'eventlog',
                        cmd: 'log_event',
                        event: EVENT2
                    },
                    (err, event) => {
                        assert.isNull(err);

                        assert.isObject(event);
                        assert.isNotNull(event.time);
                        assert.isNotNull(event.server);
                        assert.equal(event.type, EVENT2.type);
                        assert.equal(event.message, EVENT2.message);

                        event2 = event;

                        callback();
                    }
                );
            },
        // Get all activities
            (callback) => {
                seneca.act(
                    {
                        role: 'eventlog',
                        cmd: 'get_events' 
                    },
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            }
        ], done);
    });
});