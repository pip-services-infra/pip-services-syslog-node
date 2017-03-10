let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';

import { SystemLogMemoryPersistence } from '../../../src/persistence/SystemLogMemoryPersistence';
import { SystemLogController } from '../../../src/logic/SystemLogController';
import { SystemLogRestService } from '../../../src/services/version1/SystemLogRestService';

let restConfig = ComponentConfig.fromTuples(
    'endpoint.host', 'localhost',  
    'endpoint.port', 3000
);

let ACTIVITY1 = {
    type: 'restart',
    details: 'test #1'
};
let ACTIVITY2 = {
    type: 'restart',
    details: 'test #2'
};

suite('SystemLogRestService', ()=> {    
    let db = new SystemLogMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new SystemLogController();
    ctrl.configure(new ComponentConfig());

    let service = new SystemLogRestService();
    service.configure(restConfig);

    let components = ComponentSet.fromComponents(db, ctrl, service);

    let url = restConfig.getEndpoint().getUri();
    let rest = restify.createJsonClient({ url: url, version: '*' });

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        LifeCycleManager.close(components, done);
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('CRUD Operations', (done) => {
        var activity1, activity2;

        async.series([
        // Create one activity
            (callback) => {
                rest.post('/syslog',
                    ACTIVITY1,
                    (err, req, res, activity) => {
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
                rest.post('/syslog', 
                    ACTIVITY2,
                    (err, req, res, activity) => {
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
        // Get all activities
            (callback) => {
                rest.get('/syslog',
                    (err, req, res, activities) => {
                        assert.isNull(err);

                        assert.isObject(activities);
                        assert.lengthOf(activities.data, 2);

                        callback();
                    }
                );
            }
        ], done);
    });
});