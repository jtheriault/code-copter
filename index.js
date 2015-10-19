'use strict';
var analyzers = require('./src')['analyzers'],
    codeCopter = require('./src')['code-copter'];

codeCopter.configure({
    jshint: analyzers.jshint,
    jscs: analyzers.jscs
});

module.exports = codeCopter;
module.exports.analyzers = analyzers;
