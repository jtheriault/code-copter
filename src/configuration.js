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
    exclude: ['node_modules']
};

function get () {
    return configuration;
}

/**
 * @deprecated - Support for legacy analyzers-only config param format will be removed in next major version
 *
 * Sets the configuration of how code-copter operates.
 *
 * @param {Object} config - Configuration container. 
 * @param {String[]} config.exclude - Array of file/folder names to exclude from analysis.
 * @param {Object} config.analyzers - Keys of analyzer names; values of enabled boolean or custom implementation.
 */
function set (config) {
    var analyzers,
        configObj = {};

    if (config.exclude) {
        configObj.exclude = config.exclude;
    }

    if (config.analyzers) {
        configObj.analyzers =  config.analyzers;
    }

    configuration = extend.deeply(configuration, configObj);
}
