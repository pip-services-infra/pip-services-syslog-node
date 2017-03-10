let _ = require('lodash');
let assert = require('chai').assert;

import { MicroserviceConfig } from 'pip-services-runtime-node';
import { SystemLogLambdaFunction } from '../../src/run/SystemLogLambdaFunction';

let buildConfig = MicroserviceConfig.fromValue({
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
    }
});

suite('SystemLogLambdaFunction', ()=> {    
    let lambda = new SystemLogLambdaFunction();

    suiteSetup((done) => {
        lambda.setConfig(buildConfig);
        lambda.start(done);
        //done();
    });
    
    suiteTeardown((done) => {
        lambda.stop(done);
    });
                
    test('Ping', (done) => {
        lambda.getHandler()(
            {
                cmd: 'get_system_activities' 
            },
            {
                done: (err, activities) => {
                    assert.isNull(err);
                    
                    assert.isObject(activities);

                    done();
                }
            }
        );
    });
});