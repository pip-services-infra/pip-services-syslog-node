"use strict";
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var SystemLogFilePersistence_1 = require('../../src/persistence/SystemLogFilePersistence');
var SystemLogPersistenceFixture_1 = require('./SystemLogPersistenceFixture');
var config = pip_services_runtime_node_2.ComponentConfig.fromValue({
    descriptor: {
        type: 'file'
    },
    options: {
        path: './data/syslog.test.json',
        data: []
    }
});
suite('SystemLogFilePersistence', function () {
    var db, fixture;
    setup(function (done) {
        db = new SystemLogFilePersistence_1.SystemLogFilePersistence();
        db.configure(config);
        fixture = new SystemLogPersistenceFixture_1.SystemLogPersistenceFixture(db);
        db.link(new pip_services_runtime_node_1.ComponentSet());
        db.open(done);
    });
    teardown(function (done) {
        db.close(done);
    });
    test('CRUD Operations', function (done) {
        fixture.testCrudOperations(done);
    });
});
