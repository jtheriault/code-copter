'use strict';
var analyzers = require('./src')['analyzers'],
    codeCopter = require('./src')['code-copter'];

codeCopter.configure({
    jshint: true,
    jscs: true
});

module.exports = codeCopter;
module.exports.analyzers = analyzers;
