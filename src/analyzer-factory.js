'use strict';
var analyzers = require('./analyzers'),
    Analyzer = require('./Analyzer');

exports.create = create;

function create (name, config) {
    return createPlugin(name) ||
        createPackaged(name, config) || 
        createInline(name, config);
}

function createInline (name, inline) {
    var analyzer = null;

    if (typeof inline === 'function') {
        analyzer = new Analyzer({ analyze: inline });
    }
    
    return analyzer;
}

function createPackaged (name, enabled) {
    return enabled !== false ? analyzers[name] : null;
}

function createPlugin (name) {
    var plugin = require('./plugin-factory').create('analyzer', name);

    if (plugin) {
        try {
            return plugin instanceof Analyzer ? plugin : new Analyzer(plugin);
        }
        catch (e) {
            console.warn(`Module found for "${name}" is not a code-copter analyzer plugin`);
        }
    }

    return null;
}
