let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';

import { SystemEventV1 } from '../../../src/data/version1/SystemEventV1';
import { EventLogTypeV1 } from '../../../src/data/version1/EventLogTypeV1';
import { EventLogSeverityV1 } from '../../../src/data/version1/EventLogSeverityV1';
import { EventLogMemoryPersistence } from '../../../src/persistence/EventLogMemoryPersistence';
import { EventLogController } from '../../../src/logic/EventLogController';
import { EventLogRestServiceV1 } from '../../../src/services/version1/EventLogRestServiceV1';

let restConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

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

suite('EventLogRestServiceV1', ()=> {
    let service: EventLogRestServiceV1;

    let rest: any;

    suiteSetup((done) => {
        let persistence = new EventLogMemoryPersistence();
        let controller = new EventLogController();

        service = new EventLogRestServiceV1();
        service.configure(restConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-eventlog', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-eventlog', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-eventlog', 'service', 'rest', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    test('CRUD Operations', (done) => {
        let event1;
        let event2;

        async.series([
        // Create one activity
            (callback) => {
                rest.post('/eventlog/write',
                    {
                        event: EVENT1
                    },
                    (err, req, res, event) => {
                        assert.isNull(err);

                        assert.isObject(event);
                        assert.isNotNull(event.time);
                        assert.equal(event.type, EVENT1.type);
                        assert.equal(event.message, EVENT1.message);

                        event1 = event;

                        callback();
                    }
                );
            },
        // Create another activity
            (callback) => {
                rest.post('/eventlog/write',
                    {
                        event: EVENT2
                    },
                    (err, req, res, event) => {
                        assert.isNull(err);

                        assert.isObject(event);
                        assert.isNotNull(event.time);
                        assert.equal(event.type, EVENT2.type);
                        assert.equal(event.message, EVENT2.message);

                        event2 = event;

                        callback();
                    }
                );
            },
        // Get all activities
            (callback) => {
                rest.post('/eventlog/read',
                    {},
                    (err, req, res, page) => {
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