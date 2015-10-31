'use strict';
var analyzers = require('./src').analyzers,
    codeCopter = require('./src').codeCopter,
    configuration = require('./src').configuration;

module.exports = codeCopter;
module.exports.analyzers = analyzers;
module.exports.configure = configuration.set;
