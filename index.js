'use strict';
var Analyzer = require('./src').Analyzer,
    analyzers = require('./src').analyzers,
    codeCopter = require('./src').codeCopter,
    configuration = require('./src').configuration;

module.exports = codeCopter;
module.exports.Analyzer = Analyzer;
module.exports.analyzers = analyzers;
module.exports.configure = configuration.set;
