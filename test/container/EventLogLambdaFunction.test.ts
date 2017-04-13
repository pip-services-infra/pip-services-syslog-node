let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { SenecaInstance } from 'pip-services-net-node';

import { SystemEventV1 } from '../../src/data/version1/SystemEventV1';
import { EventLogTypeV1 } from '../../src/data/version1/EventLogTypeV1';
import { EventLogSeverityV1 } from '../../src/data/version1/EventLogSeverityV1';
import { EventLogMemoryPersistence } from '../../src/persistence/EventLogMemoryPersistence';
import { EventLogController } from '../../src/logic/EventLogController';
import { EventLogLambdaFunction } from '../../src/container/EventLogLambdaFunction';

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

suite('EventLogLambda', ()=> {
    let lambda: EventLogLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services-commons:logger:console:default:1.0',
            'persistence.descriptor', 'pip-services-eventlog:persistence:memory:default:1.0',
            'controller.descriptor', 'pip-services-eventlog:controller:default:default:1.0'
        );

        lambda = new EventLogLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('CRUD Operations', (done) => {
        let event1;
        let event2;

        async.series([
        // Create one activity
            (callback) => {
                lambda.act(
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
                lambda.act(
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
                lambda.act(
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