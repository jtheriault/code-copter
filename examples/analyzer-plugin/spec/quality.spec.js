'use strict';
var codeCopter = require('code-copter');

codeCopter.configure({
    analyzers: {
        'hell-no-world': true,
        jscs: false,
        jshint: false
    }
});

describe('Analyzer plugin quality', codeCopter);
