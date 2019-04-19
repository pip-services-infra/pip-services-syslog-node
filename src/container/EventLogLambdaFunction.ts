import { Descriptor } from 'pip-services3-commons-node';
import { CommandableLambdaFunction } from 'pip-services3-aws-node';

import { EventLogServiceFactory } from '../build/EventLogServiceFactory';

export class EventLogLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("eventlog", "System event logging function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-eventlog', 'controller', 'default', '*', '*'));
        this._factories.add(new EventLogServiceFactory());
    }
}

export const handler = new EventLogLambdaFunction().getHandler();