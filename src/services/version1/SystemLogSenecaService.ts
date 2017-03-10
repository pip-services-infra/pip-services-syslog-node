let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { SenecaService } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';

import { ISystemLogBusinessLogic } from '../../logic/ISystemLogBusinessLogic';

export class SystemLogSenecaService extends SenecaService {       
	/**
	 * Unique descriptor for the SystemLogSenecaService component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Services, "pip-services-syslog", "seneca", "1.0"
	);

    private _logic: ISystemLogBusinessLogic;

    constructor() {
        super(SystemLogSenecaService.Descriptor);
    }
    
	public link(components: ComponentSet): void {
		this._logic = <ISystemLogBusinessLogic>components.getOnePrior(
			this, new ComponentDescriptor(Category.BusinessLogic, "pip-services-syslog", "*", "*")
		);

		super.link(components);		

        this.registerCommands('syslog', this._logic.getCommands());
	}

}
