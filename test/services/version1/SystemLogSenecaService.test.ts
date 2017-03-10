let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { SenecaAddon } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';

import { SystemLogMemoryPersistence } from '../../../src/persistence/SystemLogMemoryPersistence';
import { SystemLogController } from '../../../src/logic/SystemLogController';
import { SystemLogSenecaService } from '../../../src/services/version1/SystemLogSenecaService';

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

suite('SystemLogSenecaService', ()=> {        
    let db = new SystemLogMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new SystemLogController();
    ctrl.configure(new ComponentConfig());

    let service = new SystemLogSenecaService();
    service.configure(new ComponentConfig());

    let seneca = new SenecaAddon();
    seneca.configure(new ComponentConfig());

    let components = ComponentSet.fromComponents(db, ctrl, service, seneca);

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        seneca.getSeneca().close(() => {
            LifeCycleManager.close(components, done);
        });
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('CRUD Operations', (done) => {
        var activity1, activity2;

        async.series([
        // Create one activity
            (callback) => {
                seneca.getSeneca().act(
                    {
                        role: 'syslog',
                        cmd: 'log_system_activity',
                        activity: ACTIVITY1
                    },
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
                seneca.getSeneca().act(
                    {
                        role: 'syslog',
                        cmd: 'log_system_activity',
                        activity: ACTIVITY2
                    },
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
        // Get all activities
            (callback) => {
                seneca.getSeneca().act(
                    {
                        role: 'syslog',
                        cmd: 'get_system_activities' 
                    },
                    (err, activities) => {
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