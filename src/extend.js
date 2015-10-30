'use strict';
var extend = require('extend');

exports.deeply = deep;

/**
 * Creates a new object which contains a copy of all properties of the base
 * object overwritten with any colliding values (at the deepest point of
 * comparison).
 *
 * @param {Object} base - The object which is the basis of the extension.
 * @param {Object} extension - The superceding object of the extension.
 * @return {Object} - A new object representing the extension.
 */
function deep (base, extension) {
    return extend(true, {}, base, extension);
}
