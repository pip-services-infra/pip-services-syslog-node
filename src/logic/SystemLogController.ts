import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { AbstractController } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';

import { ISystemLogPersistence } from '../persistence/ISystemLogPersistence';
import { ISystemLogBusinessLogic } from './ISystemLogBusinessLogic';
import { SystemLogCommandSet } from './SystemLogCommandSet';

export class SystemLogController extends AbstractController implements ISystemLogBusinessLogic {
	/**
	 * Unique descriptor for the SystemLogController component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Controllers, "pip-services-syslog", "*", "*"
	);
    
	private _db: ISystemLogPersistence;
    
    constructor() {
        super(SystemLogController.Descriptor);
    }
    
    public link(components: ComponentSet): void {
        // Locate reference to quotes persistence component
        this._db = <ISystemLogPersistence>components.getOneRequired(
        	new ComponentDescriptor(Category.Persistence, "pip-services-syslog", '*', '*')
    	);
        
        super.link(components);

        // Add commands
        let commands = new SystemLogCommandSet(this);
        this.addCommandSet(commands);
    }
    
    public getSystemActivities(correlationId: string, filter: FilterParams, paging: PagingParams, callback) {
        callback = this.instrument(correlationId, 'syslog.get_system_activities', callback);
        this._db.getSystemActivities(correlationId, filter, paging, callback);
    }

    public logSystemActivity(correlationId: string, activity, callback) {
        callback = this.instrument(correlationId, 'syslog.log_system_activity', callback);
        this._db.createSystemActivity(correlationId, activity, callback);
    }
    
}
