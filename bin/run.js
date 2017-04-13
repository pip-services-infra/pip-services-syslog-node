let EventLogProcess = require('../obj/src/container/EventLogProcess').EventLogProcess;

try {
    new EventLogProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
