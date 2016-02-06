'use strict';
var reporters = require('./reporters');

exports.create = create;

function create () {
    return createPackaged.apply(null, arguments) || 
        createCustom.apply(null, arguments) ||
        createPlugin.apply(null, arguments);
}

function createCustom (custom) {
    return typeof custom === 'function' ? custom : null;
}

function createPackaged (name) {
    return reporters[name] || null;
}

function createPlugin (name) {
    var plugin = require('./plugin-factory').create('reporter', name);

    if (plugin && plugin.report) {
        return plugin;
    }

    console.warn(`Plugin found for ${name} is not a reporter`);

    return null;
}
