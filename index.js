'use strict';
var Analysis = require('./src').Analysis,
    Analyzer = require('./src').Analyzer,
    analyzers = require('./src').analyzers,
    codeCopter = require('./src').codeCopter,
    configuration = require('./src').configuration,
    Report = require('./src').Report,
    Reporter = require('./src').Reporter;

// API
module.exports = codeCopter;
module.exports.configure = configuration.set;

// SDK
module.exports.Analysis = Analysis;
module.exports.Analyzer = Analyzer;
module.exports.Report = Report;
module.exports.Reporter = Reporter;
