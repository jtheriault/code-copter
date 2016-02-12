'use strict';
var reporters = require('./reporters');

exports.create = create;

function create () {
    return createPlugin.apply(null, arguments) || 
        createPackaged.apply(null, arguments) ||
        createInline.apply(null, arguments);
}

function createInline (inline) {
    return typeof inline === 'function' ? inline : null;
}

function createPackaged (name) {
    return reporters[name] || null;
}

function createPlugin (name) {
    var plugin = require('./plugin-factory').create('reporter', name);

    if (plugin && plugin.report) {
        return plugin;
    }

    console.warn(`Module found for "${name}" is not a code-copter reporter plugin`);

    return null;
}
