'use strict';
var analyzers = require('./src').analyzers,
    codeCopter = require('./src').codeCopter,
    configuration = require('./src').configuration;

// API
module.exports = codeCopter;
module.exports.configure = configuration.set;
