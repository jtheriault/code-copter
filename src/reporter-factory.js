'use strict';
var reporters = require('./reporters');

module.exports.create = create;

function create (name) {
    return reporters[name] || null;
}
