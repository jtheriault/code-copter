'use strict';
var analyzers = {
    jshint: require('./jshint'),
    jscs: require('./jscs'),
    requirePeers: require('./require-peers')
};

module.exports = analyzers; 
