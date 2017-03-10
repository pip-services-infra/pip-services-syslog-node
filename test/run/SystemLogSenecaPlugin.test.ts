let _ = require('lodash');
let assert = require('chai').assert;

import { SystemLogSenecaPlugin } from '../../src/run/SystemLogSenecaPlugin';

let buildConfig = {
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

suite('SystemLogSenecaPlugin', ()=> {    
    let seneca;
    let plugin = new SystemLogSenecaPlugin();

    suiteSetup((done) => {
        seneca = require('seneca')();
        seneca.use(plugin.entry(buildConfig));
        done();
    });
    
    suiteTeardown((done) => {
        seneca.close(done);
    });
                
    test('Ping', (done) => {
        seneca.act(
            {
                role: 'syslog',
                cmd: 'get_system_activities' 
            },
            (err, activities) => {
                assert.isNull(err);
                assert.isObject(activities);                
                done();
            }
        );
    });
});