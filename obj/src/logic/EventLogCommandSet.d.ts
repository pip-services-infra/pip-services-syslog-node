import { CommandSet } from 'pip-services-commons-node';
import { IEventLogBusinessLogic } from './IEventLogBusinessLogic';
export declare class EventLogCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IEventLogBusinessLogic);
    private makeReadCommand();
    private makeWriteCommand();
}
