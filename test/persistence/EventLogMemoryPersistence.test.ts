import { EventLogMemoryPersistence } from '../../src/persistence/EventLogMemoryPersistence';
import { EventLogPersistenceFixture } from './EventLogPersistenceFixture';

suite('EventLogMemoryPersistence', ()=> {
    let persistence: EventLogMemoryPersistence;
    let fixture: EventLogPersistenceFixture;
    
    setup((done) => {
        persistence = new EventLogMemoryPersistence();
        fixture = new EventLogPersistenceFixture(persistence);
        
        persistence.open(null, done);
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});