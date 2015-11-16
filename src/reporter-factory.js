'use strict';
var reporters = require('./reporters');

exports.create = create;

function create () {
    return createPackaged.apply(null, arguments) || 
        createPassThrough.apply(null, arguments) ||
        createPlugin.apply(null, arguments);
}

function createPackaged (name) {
    return reporters[name] || null;
}

function createPassThrough (custom) {
    return typeof custom === 'function' ? custom : null;
}

function createPlugin (name) {
    return require('./plugin-factory').create('reporter', name);
}
