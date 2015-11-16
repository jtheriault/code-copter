'use strict';
var analyzers = require('./analyzers');

exports.create = create;

function create (name, enabled) {
    if (enabled !== false) {
        return createPackaged.apply(null, arguments) || 
            createCustom.apply(null, arguments) || 
            createPlugin.apply(null, arguments);
    }

    return null;
}

function createPackaged (name) {
    return analyzers[name];
}

function createCustom (name, custom) {
    return typeof custom === 'function' ? custom : null;
}

function createPlugin (name) {
    return require('./plugin-factory').create('analyzer', name);
}
