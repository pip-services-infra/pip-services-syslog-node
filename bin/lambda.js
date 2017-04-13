let EventLogLambdaFunction = require('../obj/src/container/EventLogLambdaFunction').EventLogLambdaFunction;

module.exports = new EventLogLambdaFunction().getHandler();