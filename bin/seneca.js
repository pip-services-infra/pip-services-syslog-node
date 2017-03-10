/**
 * @file System log seneca plugin
 * @copyright Digital Living Software Corp. 2014-2016
 */

var SystemLogSenecaPlugin = require('../lib/src/run/SystemLogSenecaPlugin').SystemLogSenecaPlugin;
var plugin = new SystemLogSenecaPlugin();

module.exports = plugin.entry();