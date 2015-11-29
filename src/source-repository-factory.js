'use strict';
var sourceRepositories = require('./source-repositories');

exports.create = create;

function create (type, config) {
    var Repository = sourceRepositories[type];

    if (Repository === undefined) {
        throw new Error(`Unknown source type ${type}`);
    }

    return new Repository(config);
}
