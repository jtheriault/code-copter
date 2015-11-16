'use strict';
/*
 * This example demonstrates using a hypothetical plugin for Microsoft's
 * Visual Studio Test Tools Unit Testing framework to report Code-Copter's
 * analysis.
 * 
 * npm install --save-dev code-copter-reporter-vstest
 */
var codeCopter = require('../');

codeCopter.configure({
    reporter: 'vstest'
});

codeCopter();
