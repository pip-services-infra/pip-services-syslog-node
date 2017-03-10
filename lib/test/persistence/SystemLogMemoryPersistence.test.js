"use strict";
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var SystemLogMemoryPersistence_1 = require('../../src/persistence/SystemLogMemoryPersistence');
var SystemLogPersistenceFixture_1 = require('./SystemLogPersistenceFixture');
suite('SystemLogMemoryPersistence', function () {
    var db, fixture;
    setup(function (done) {
        db = new SystemLogMemoryPersistence_1.SystemLogMemoryPersistence();
        db.configure(new pip_services_runtime_node_2.ComponentConfig());
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
