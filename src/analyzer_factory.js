'use strict';
var analyzers = require('./analyzers');

exports.create = create;

function create (name, config) {
    return createPackaged.apply(null, arguments) || createPassThrough.apply(null, arguments);
}

function createPackaged (name, config) {
    return config === true ? analyzers[name] : null;
}

function createPassThrough (name, config) {
    return typeof config === 'function' ? config : null;
}
