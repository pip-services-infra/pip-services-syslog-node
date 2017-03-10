import { Microservice } from 'pip-services-runtime-node';

import { SystemLogFactory } from '../build/SystemLogFactory';

/**
 * Syslog microservice class.
 * 
 * @author Sergey Seroukhov
 * @version 1.0
 * @since 2016-06-09
 */
export class SystemLogMicroservice extends Microservice {
	/**
	 * Creates instance of syslog microservice.
	 */
	constructor() {
		super("pip-services-syslog", SystemLogFactory.Instance);
	}
}
