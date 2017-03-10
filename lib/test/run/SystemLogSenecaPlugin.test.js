"use strict";
var _ = require('lodash');
var assert = require('chai').assert;
var SystemLogSenecaPlugin_1 = require('../../src/run/SystemLogSenecaPlugin');
var buildConfig = {
    logs: {
        descriptor: {
            type: 'console'
        }
    },
    persistence: {
        descriptor: {
            type: 'memory'
        }
    },
    controllers: {
        descriptor: {
            type: '*'
        }
    },
    services: {
        descriptor: {
            type: 'seneca'
        }
    }
};
suite('SystemLogSenecaPlugin', function () {
    var seneca;
    var plugin = new SystemLogSenecaPlugin_1.SystemLogSenecaPlugin();
    suiteSetup(function (done) {
        seneca = require('seneca')();
        seneca.use(plugin.entry(buildConfig));
        done();
    });
    suiteTeardown(function (done) {
        seneca.close(done);
    });
    test('Ping', function (done) {
        seneca.act({
            role: 'syslog',
            cmd: 'get_system_activities'
        }, function (err, activities) {
            assert.isNull(err);
            assert.isObject(activities);
            done();
        });
    });
});
