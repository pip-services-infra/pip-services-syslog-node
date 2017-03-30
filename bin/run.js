let EventLogProcess = require('../obj/src/container/EventLogProcess').EventLogProcess;

try {
    new EventLogProcess().runWithArguments(process.argv);
} catch (ex) {
    console.error(ex);
}
