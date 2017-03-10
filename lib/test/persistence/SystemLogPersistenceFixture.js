"use strict";
var async = require('async');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
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
var SystemLogPersistenceFixture = (function () {
    function SystemLogPersistenceFixture(db) {
        assert.isNotNull(db);
        this._db = db;
    }
    SystemLogPersistenceFixture.prototype.testCrudOperations = function (done) {
        var _this = this;
        var activity1, activity2;
        async.series([
            // Create one activity
            function (callback) {
                _this._db.createSystemActivity(null, ACTIVITY1, function (err, activity) {
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
                _this._db.createSystemActivity(null, ACTIVITY2, function (err, activity) {
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
            // Get all system activities
            function (callback) {
                _this._db.getSystemActivities(null, pip_services_runtime_node_1.FilterParams.fromValue({ type: 'restart' }), new pip_services_runtime_node_2.PagingParams(), function (err, activities) {
                    assert.isNull(err);
                    assert.isObject(activities);
                    assert.lengthOf(activities.data, 2);
                    callback();
                });
            }
        ], done);
    };
    return SystemLogPersistenceFixture;
}());
exports.SystemLogPersistenceFixture = SystemLogPersistenceFixture;
