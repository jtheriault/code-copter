'use strict';
var analyzers = require('./src').analyzers,
    codeCopter = require('./src').codeCopter;

module.exports = codeCopter;
module.exports.analyzers = analyzers;
