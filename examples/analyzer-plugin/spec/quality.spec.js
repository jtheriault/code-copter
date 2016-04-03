'use strict';
var codeCopter = require('code-copter');

codeCopter.configure({
    analyzers: {
        'hell-no-world': /Hello cruel world/,
        jscs: false,
        jshint: false
    }
});

describe('Analyzer plugin quality', codeCopter);
