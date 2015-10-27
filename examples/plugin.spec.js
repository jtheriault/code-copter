'use strict';
/*
 * This example demonstrates a separate module which has installed the 
 * shortrequire plugin.
 * 
 * npm install --save-dev code-copter-analyzer-shortrequire
 */
var codeCopter = require('../');

codeCopter.configure({
    shortrequire: true
});

describe('Plugin Example', codeCopter);
