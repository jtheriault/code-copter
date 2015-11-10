'use strict';
var prequire = require('parent-require'),
    prefix = 'code-copter';

exports.create = create;

function create (type, name) {
    var plugin = createPrefixed(type, name) || createLiteral(name);

    if (plugin === null) {
        console.warn(`No ${type} plugin found for "${name}"`);
    }

    return plugin;
}

function createPrefixed (type, name) {
    try {
        return prequire(`${prefix}-${type}-${name}`);
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
