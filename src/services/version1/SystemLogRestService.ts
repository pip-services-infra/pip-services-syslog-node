let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { RestService } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';

import { ISystemLogBusinessLogic } from '../../logic/ISystemLogBusinessLogic';

export class SystemLogRestService extends RestService {       
	/**
	 * Unique descriptor for the SystemLogRestService component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Services, "pip-services-syslog", "rest", "1.0"
	);
    
	private _logic: ISystemLogBusinessLogic;

    constructor() {
        super(SystemLogRestService.Descriptor);
    }
    
	public link(components: ComponentSet): void {
		this._logic = <ISystemLogBusinessLogic>components.getOnePrior(
			this, new ComponentDescriptor(Category.BusinessLogic, "pip-services-syslog", "*", "*")
		);

		super.link(components);		
	}
    
    private getSystemActivities(req, res) {
        this._logic.getSystemActivities(
            req.params.correlation_id,
            new FilterParams(req.params),
            new PagingParams(req.params),
            this.sendResult(req, res)
        );
    }

    private logSystemActivity(req, res) {
        this._logic.logSystemActivity(
            req.params.correlation_id,
            req.body,
            this.sendResult(req, res)
        );
    }
        
    protected register() {
        this.registerRoute('get', '/syslog', this.getSystemActivities);
        this.registerRoute('post', '/syslog', this.logSystemActivity);
    }
}
