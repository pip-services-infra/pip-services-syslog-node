import { Descriptor } from 'pip-services-commons-node';
import { CommandableLambdaFunction } from 'pip-services-aws-node';
import { DefaultNetFactory } from 'pip-services-net-node';
import { DefaultOssFactory } from 'pip-services-oss-node';

import { EventLogServiceFactory } from '../build/EventLogServiceFactory';

export class EventLogLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("eventlog", "System event logging function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-eventlog', 'controller', 'default', '*', '*'));
        this._factories.add(new EventLogServiceFactory());
        this._factories.add(new DefaultNetFactory);
        this._factories.add(new DefaultOssFactory);
    }
}

export const handler = new EventLogLambdaFunction().getHandler();