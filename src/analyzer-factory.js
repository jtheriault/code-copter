'use strict';
var Analyzer = require('code-copter-sdk').Analyzer,
    analyzers = require('./analyzers');

exports.create = create;

function create (name, config) {
    var analyzer;
    
    if (config !== false) {
        analyzer = createInline(name, config) ||
            createPlugin(name) ||
            createPackaged(name, config);
    }

    try {
        if (analyzer) {
            analyzer.configure(config);
        }
    }
    catch (error) {
        console.warn(`Not loading analyzer "${name}" because ${error.message}`);
        analyzer = null;
    }

    return analyzer;
}

function createInline (name, inline) {
    var analyzer = null;

    if (typeof inline === 'function') {
        analyzer = new Analyzer({ 
            analyze: inline,
            name: inline.name
        });
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
