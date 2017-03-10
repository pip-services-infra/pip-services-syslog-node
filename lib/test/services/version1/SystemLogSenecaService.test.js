"use strict";
var _ = require('lodash');
var async = require('async');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var SystemLogMemoryPersistence_1 = require('../../../src/persistence/SystemLogMemoryPersistence');
var SystemLogController_1 = require('../../../src/logic/SystemLogController');
var SystemLogSenecaService_1 = require('../../../src/services/version1/SystemLogSenecaService');
var ACTIVITY1 = {
    type: 'restart',
    details: 'test #1',
    severity: 500
};
var ACTIVITY2 = {
    type: 'restart',
    details: 'test #2',
    severity: 500
};
suite('SystemLogSenecaService', function () {
    var db = new SystemLogMemoryPersistence_1.SystemLogMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new SystemLogController_1.SystemLogController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var service = new SystemLogSenecaService_1.SystemLogSenecaService();
    service.configure(new pip_services_runtime_node_2.ComponentConfig());
    var seneca = new pip_services_runtime_node_3.SenecaAddon();
    seneca.configure(new pip_services_runtime_node_2.ComponentConfig());
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, ctrl, service, seneca);
    suiteSetup(function (done) {
        pip_services_runtime_node_4.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        seneca.getSeneca().close(function () {
            pip_services_runtime_node_4.LifeCycleManager.close(components, done);
        });
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('CRUD Operations', function (done) {
        var activity1, activity2;
        async.series([
            // Create one activity
            function (callback) {
                seneca.getSeneca().act({
                    role: 'syslog',
                    cmd: 'log_system_activity',
                    activity: ACTIVITY1
                }, function (err, activity) {
                    assert.isNull(err);
                    assert.isObject(activity);
                    assert.isNotNull(activity.time);
                    assert.isNotNull(activity.server);
                    assert.equal(activity.type, ACTIVITY1.type);
                    assert.equal(activity.details, ACTIVITY1.details);
                    activity1 = activity;
                    callback();
                });
            },
            // Create another activity
            function (callback) {
                seneca.getSeneca().act({
                    role: 'syslog',
                    cmd: 'log_system_activity',
                    activity: ACTIVITY2
                }, function (err, activity) {
                    assert.isNull(err);
                    assert.isObject(activity);
                    assert.isNotNull(activity.time);
                    assert.isNotNull(activity.server);
                    assert.equal(activity.type, ACTIVITY2.type);
                    assert.equal(activity.details, ACTIVITY2.details);
                    activity2 = activity;
                    callback();
                });
            },
            // Get all activities
            function (callback) {
                seneca.getSeneca().act({
                    role: 'syslog',
                    cmd: 'get_system_activities'
                }, function (err, activities) {
                    assert.isNull(err);
                    assert.isObject(activities);
                    assert.lengthOf(activities.data, 2);
                    callback();
                });
            }
        ], done);
    });
});
