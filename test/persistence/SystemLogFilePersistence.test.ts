import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';

import { SystemLogFilePersistence } from '../../src/persistence/SystemLogFilePersistence';
import { SystemLogPersistenceFixture } from './SystemLogPersistenceFixture';

let config = ComponentConfig.fromValue({
    descriptor: {
        type: 'file'
    },
    options: {
        path: './data/syslog.test.json',
        data: []
    }
});

suite('SystemLogFilePersistence', ()=> {
    let db, fixture;
    
    setup((done) => {
        db = new SystemLogFilePersistence();
        db.configure(config);

        fixture = new SystemLogPersistenceFixture(db);
        
        db.link(new ComponentSet());
        db.open(done);
    });
    
    teardown((done) => {
        db.close(done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });
});