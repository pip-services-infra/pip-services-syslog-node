let _ = require('lodash');
let assert = require('chai').assert;

let pluginOptions = {
    'pip-services-eventlog': {
        logs: {
            level: 'debug'
        },
        persistence: {
            type: 'memory'
        },
        services: {
            connection: {
                type: 'none'
            }
        }
    }
};

suite('EventLogSenecaPlugin', ()=> {
    let seneca;

    suiteSetup((done) => {
        seneca = require('seneca')();

        // Load Seneca plugin
        let plugin = require('../../src/container/EventLogSenecaPlugin');
        seneca.use(plugin);

        seneca.ready(done);
    });

    suiteTeardown((done) => {
        seneca.close(done);
    });

    test.skip('Ping', (done) => {
        seneca.act(
            {
                role: 'eventlog',
                cmd: 'get_events' 
            },
            (err, page) => {
                assert.isNull(err);
                assert.isObject(page);
                done();
            }
        );
    });
});