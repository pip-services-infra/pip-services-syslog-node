"use strict";
var _ = require('lodash');
var async = require('async');
var restify = require('restify');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var SystemLogMemoryPersistence_1 = require('../../../src/persistence/SystemLogMemoryPersistence');
var SystemLogController_1 = require('../../../src/logic/SystemLogController');
var SystemLogRestService_1 = require('../../../src/services/version1/SystemLogRestService');
var restConfig = pip_services_runtime_node_2.ComponentConfig.fromTuples('endpoint.host', 'localhost', 'endpoint.port', 3000);
var ACTIVITY1 = {
    type: 'restart',
    details: 'test #1'
};
var ACTIVITY2 = {
    type: 'restart',
    details: 'test #2'
};
suite('SystemLogRestService', function () {
    var db = new SystemLogMemoryPersistence_1.SystemLogMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new SystemLogController_1.SystemLogController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var service = new SystemLogRestService_1.SystemLogRestService();
    service.configure(restConfig);
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, ctrl, service);
    var url = restConfig.getEndpoint().getUri();
    var rest = restify.createJsonClient({ url: url, version: '*' });
    suiteSetup(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.close(components, done);
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('CRUD Operations', function (done) {
        var activity1, activity2;
        async.series([
            // Create one activity
            function (callback) {
                rest.post('/syslog', ACTIVITY1, function (err, req, res, activity) {
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
                rest.post('/syslog', ACTIVITY2, function (err, req, res, activity) {
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
                rest.get('/syslog', function (err, req, res, activities) {
                    assert.isNull(err);
                    assert.isObject(activities);
                    assert.lengthOf(activities.data, 2);
                    callback();
                });
            }
        ], done);
    });
});
