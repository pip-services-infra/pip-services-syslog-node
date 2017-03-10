import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';

import { SystemLogMemoryPersistence } from '../../src/persistence/SystemLogMemoryPersistence';
import { SystemLogPersistenceFixture } from './SystemLogPersistenceFixture';

suite('SystemLogMemoryPersistence', ()=> {
    let db, fixture;
    
    setup((done) => {
        db = new SystemLogMemoryPersistence();
        db.configure(new ComponentConfig());
        
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