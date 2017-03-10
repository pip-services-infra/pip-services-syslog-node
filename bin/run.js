/**
 * @file System log process launcher
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global */

'use strict';

var _ = require('lodash');
var SystemLogProcessRunner = require('../lib/src/run/SystemLogProcessRunner').SystemLogProcessRunner;

var runner = new SystemLogProcessRunner();

runner.startWithDefaultConfig('../config/config.json');