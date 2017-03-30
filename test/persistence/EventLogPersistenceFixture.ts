let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';

import { IEventLogPersistence } from '../../src/persistence/IEventLogPersistence';
import { SystemEventV1 } from '../../src/data/version1/SystemEventV1';
import { EventLogTypeV1 } from '../../src/data/version1/EventLogTypeV1';
import { EventLogSeverityV1 } from '../../src/data/version1/EventLogSeverityV1';

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

export class EventLogPersistenceFixture {
    private _persistence: IEventLogPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }
                
    public testCrudOperations(done) {
        let event1;
        let event2;

        async.series([
        // Create one event
            (callback) => {
                this._persistence.create(
                    null,
                    EVENT1,
                    (err, event) => {
                        assert.isNull(err);

                        assert.isObject(event);
                        assert.isNotNull(event.id);
                        assert.isNotNull(event.time);
                        assert.equal(event.type, EVENT1.type);
                        assert.equal(event.severity, EVENT1.severity);
                        assert.equal(event.message, EVENT1.message);

                        event1 = event;

                        callback();
                    }
                );
            },
        // Create another event
            (callback) => {
                this._persistence.create(
                    null,
                    EVENT2,
                    (err, event) => {
                        assert.isNull(err);

                        assert.isObject(event);
                        assert.isNotNull(event.id);
                        assert.isNotNull(event.time);
                        assert.equal(event.type, EVENT2.type);
                        assert.equal(event.severity, EVENT2.severity);
                        assert.equal(event.message, EVENT2.message);

                        event2 = event;

                        callback();
                    }
                );
            },
        // Get all system events
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromTuples('source', 'test'),
                    new PagingParams(),
                    (err, events) => {
                        assert.isNull(err);

                        assert.isObject(events);
                        assert.lengthOf(events.data, 2);

                        callback();
                    }
                );
            }
        ], done);
    }
}
