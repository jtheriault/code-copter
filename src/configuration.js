'use strict';
var extend = require('./extend'),
    configuration;

module.exports.get = get;
module.exports.set = set;

configuration = {
    analyzers: {
        jscs: true,
        jshint: true
    },
    reporter: 'jasmine',
    source: {
        exclude: ['coverage', 'node_modules'],
        type: 'fs'
    }
};

function get () {
    return configuration;
}

/**
 * Sets the configuration of how code-copter operates.
 *
 * @param {Object} config - Configuration container. 
 * @param {String[]} config.exclude - Array of file/folder names to exclude from analysis.
 * @param {Object} config.analyzers - Keys of analyzer names; values of enabled boolean or inline implementation.
 * @param {String|Function} config.reporter - Name of packaged or plugin reporter, or inline function to use.
 */
function set (config) {
    var analyzers;

    configuration = extend.deeply(configuration, config);
}
