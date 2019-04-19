import { IStringIdentifiable } from 'pip-services3-commons-node';
import { StringValueMap } from 'pip-services3-commons-node';
import { EventLogSeverityV1 } from './EventLogSeverityV1';
export declare class SystemEventV1 implements IStringIdentifiable {
    constructor(correlationId: string, source: string, type: string, severity: EventLogSeverityV1, message: string, details?: StringValueMap);
    id: string;
    time: Date;
    correlation_id: string;
    source: string;
    type: string;
    severity: EventLogSeverityV1;
    message: string;
    details: StringValueMap;
}
