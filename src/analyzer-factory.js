'use strict';
var analyzers = require('./analyzers');

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
    return typeof inline === 'function' ? inline : null;
}

function createPackaged (name) {
    return analyzers[name];
}

function createPlugin (name) {
    var plugin = require('./plugin-factory').create('analyzer', name);

    if (plugin && plugin.analyze) {
        return plugin;
    }

    console.warn(`Module found for "${name}" is not a code-copter analyzer plugin`);

    return null;
}
