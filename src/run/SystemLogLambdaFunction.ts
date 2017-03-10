import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { LambdaFunction } from 'pip-services-runtime-node';

import { SystemLogMicroservice } from '../run/SystemLogMicroservice';
import { ISystemLogBusinessLogic } from '../logic/ISystemLogBusinessLogic';

export class SystemLogLambdaFunction extends LambdaFunction {
    private _logic: ISystemLogBusinessLogic;

    constructor() {
        super(new SystemLogMicroservice());
    }

    public link(components: ComponentSet) {
		this._logic = <ISystemLogBusinessLogic>components.getOneOptional(
			new ComponentDescriptor(Category.BusinessLogic, "pip-services-syslog", "*", "*")
		);

        super.link(components);        

        this.registerCommands(this._logic.getCommands());
    }
    
}