import { YamlConfigReader } from 'pip-services-commons-node';

import { EventLogMongoDbPersistence } from '../../src/persistence/EventLogMongoDbPersistence';
import { EventLogPersistenceFixture } from './EventLogPersistenceFixture';

suite('EventLogMongoDbPersistence', ()=> {
    let persistence: EventLogMongoDbPersistence;
    let fixture: EventLogPersistenceFixture;

    setup((done) => {
        let config = YamlConfigReader.readConfig(null, './config/test_connections.yaml');
        let dbConfig = config.getSection('mongodb');

        persistence = new EventLogMongoDbPersistence();
        persistence.configure(dbConfig);

        fixture = new EventLogPersistenceFixture(persistence);

        persistence.open(null, (err: any) => {
            persistence.clear(null, (err) => {
                done(err);
            });
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });
});