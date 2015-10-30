'use strict';
var prequire = require('parent-require'),
    prefix = 'code-copter-analyzer-';

exports.create = create;

function create (name) {
    var plugin = createPrefixed(name) || createLiteral(name);

    if (plugin === null) {
        console.warn(`No plugin found for "${name}" or "${prefix}${name}"`);
    }

    return plugin;
}

function createPrefixed (name) {
    try {
        return prequire(prefix + name);
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
