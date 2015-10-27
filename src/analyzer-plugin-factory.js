'use strict';
var prequire = require('parent-require');

exports.create = create;

function create (name) {
    // TODO: log inability to load named module
    return createPrefixed(name) || createLiteral(name);
}

function createPrefixed (name) {
    try {
        return prequire('code-copter-analyzer-' + name);
    }
    catch (ignore) {
        return null;
    }
}

function createLiteral (name) {
    try {
        return prequire(name);
    }
    catch (ignore) {
        return null;
    }
}
