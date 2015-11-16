'use strict';
var codeCopter = require('../');

codeCopter.configure({
    analyzers: {
        jscs: false,
        jshint: true
    }
});

describe('Toggle Analyzer Example', codeCopter);
