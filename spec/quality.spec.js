'use strict';
var codeCopter = require('../');

codeCopter.configure({
    analyzers: {
        jscs: true,
        jshint: true
    },
    exclude: ['coverage', 'node_modules']
});

describe('Code quality', codeCopter);
