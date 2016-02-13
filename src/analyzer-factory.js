'use strict';
var analyzers = require('./analyzers'),
    Analyzer = require('./Analyzer');

exports.create = create;

function create (name, enabled) {
    if (enabled !== false) {
        return createPlugin.apply(null, arguments) ||
            createPackaged.apply(null, arguments) || 
            createInline.apply(null, arguments);
    }

    return null;
}

function createInline (name, inline) {
    var analyzer = null;

    if (typeof inline === 'function') {
        analyzer = new Analyzer({ analyze: inline });
    }
    
    return analyzer;
}

function createPackaged (name) {
    return analyzers[name];
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
