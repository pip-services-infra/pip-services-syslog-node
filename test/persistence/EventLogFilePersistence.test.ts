import { ConfigParams } from 'pip-services-commons-node';

import { EventLogFilePersistence } from '../../src/persistence/EventLogFilePersistence';
import { EventLogPersistenceFixture } from './EventLogPersistenceFixture';

suite('EventLogFilePersistence', ()=> {
    let persistence: EventLogFilePersistence;
    let fixture: EventLogPersistenceFixture;
    
    setup((done) => {
        persistence = new EventLogFilePersistence('./data/eventlog.test.json');

        fixture = new EventLogPersistenceFixture(persistence);
        
        persistence.open(null, (err) => {
            if (err) done(err);
            else persistence.clear(null, done);
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });
});