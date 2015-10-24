'use strict';
var analyzers = {
    jscs: require('./jscs'),
    jshint: require('./jshint'),
    requirePeers: require('./require-peers')
};

module.exports = analyzers; 
