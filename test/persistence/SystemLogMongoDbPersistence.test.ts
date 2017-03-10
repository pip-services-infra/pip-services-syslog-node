import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';

import { SystemLogMongoDbPersistence } from '../../src/persistence/SystemLogMongoDbPersistence';
import { SystemLogPersistenceFixture } from './SystemLogPersistenceFixture';

let options = new DynamicMap(require('../../../config/config'));
let dbOptions = ComponentConfig.fromValue(options.getNullableMap('persistence'));

suite('SystemLogMongoDbPersistence', ()=> {
    // Skip test if mongodb is not configured
    if (dbOptions.getRawContent().getString('descriptor.type') != 'mongodb')
        return; 
    
    let db = new SystemLogMongoDbPersistence();
    db.configure(dbOptions);

    let fixture = new SystemLogPersistenceFixture(db);

    suiteSetup((done) => {
        db.link(new ComponentSet());
        db.open(done);
    });
    
    suiteTeardown((done) => {
        db.close(done);
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });
});