import { Factory } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
export declare class EventLogFactory extends Factory {
    static Descriptor: Descriptor;
    static MemoryPersistenceDescriptor: Descriptor;
    static FilePersistenceDescriptor: Descriptor;
    static MongoDbPersistenceDescriptor: Descriptor;
    static ControllerDescriptor: Descriptor;
    static SenecaServiceDescriptor: Descriptor;
    static RestServiceDescriptor: Descriptor;
    constructor();
}
