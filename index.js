'use strict';
var analyzers = require('./src').analyzers,
    codeCopter = require('./src').codeCopter;

codeCopter.configure({
    jscs: true,
    jshint: true
});

module.exports = codeCopter;
module.exports.analyzers = analyzers;
