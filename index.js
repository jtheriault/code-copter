'use strict';
var Analyzer = require('./src').Analyzer,
    analyzers = require('./src').analyzers,
    codeCopter = require('./src').codeCopter,
    configuration = require('./src').configuration;

// API
module.exports = codeCopter;
module.exports.configure = configuration.set;

// SDK
module.exports.Analyzer = Analyzer;
