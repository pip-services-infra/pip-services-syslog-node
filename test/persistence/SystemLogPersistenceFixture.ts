let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { ISystemLogPersistence } from '../../src/persistence/ISystemLogPersistence';

let ACTIVITY1 = {
    type: 'restart',
    details: 'test #1',
    severity: 500
};
let ACTIVITY2 = {
    type: 'restart',
    details: 'test #2',
    severity: 500
};

export class SystemLogPersistenceFixture {
    private _db: ISystemLogPersistence;
    
    constructor(db) {
        assert.isNotNull(db);
        this._db = db;
    }
                
    testCrudOperations(done) {
        let activity1, activity2;

        async.series([
        // Create one activity
            (callback) => {
                this._db.createSystemActivity(
                    null,
                    ACTIVITY1,
                    (err, activity) => {
                        assert.isNull(err);

                        assert.isObject(activity);
                        assert.isNotNull(activity.time);
                        assert.isNotNull(activity.server);
                        assert.equal(activity.type, ACTIVITY1.type);
                        assert.equal(activity.details, ACTIVITY1.details);

                        activity1 = activity;

                        callback();
                    }
                );
            },
        // Create another activity
            (callback) => {
                this._db.createSystemActivity(
                    null,
                    ACTIVITY2,
                    (err, activity) => {
                        assert.isNull(err);

                        assert.isObject(activity);
                        assert.isNotNull(activity.time);
                        assert.isNotNull(activity.server);
                        assert.equal(activity.type, ACTIVITY2.type);
                        assert.equal(activity.details, ACTIVITY2.details);

                        activity2 = activity;

                        callback();
                    }
                );
            },
        // Get all system activities
            (callback) => {
                this._db.getSystemActivities(
                    null,
                    FilterParams.fromValue({ type: 'restart' }),
                    new PagingParams(),
                    (err, activities) => {
                        assert.isNull(err);

                        assert.isObject(activities);
                        assert.lengthOf(activities.data, 2);

                        callback();
                    }
                );
            }
        ], done);
    }
}
