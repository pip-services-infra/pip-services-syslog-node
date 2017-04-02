let _ = require('lodash');
let assert = require('chai').assert;

let pluginOptions = {
    'pip-services-eventlog': {
        logger: {
            level: 'debug'
        },
        persistence: {
            type: 'memory'
        },
        service: {
            connection: {
                protocol: 'none'
            }
        }
    }
};

suite('EventLogSenecaPlugin', ()=> {
    let seneca;

    suiteSetup((done) => {
        seneca = require('seneca')({ strict: { result: false } });

        // Load Seneca plugin
        let plugin = require('../../src/container/EventLogSenecaPlugin');
        seneca.use(plugin, pluginOptions);

        seneca.ready(done);
    });

    suiteTeardown((done) => {
        seneca.close(done);
    });

    test('Ping', (done) => {
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