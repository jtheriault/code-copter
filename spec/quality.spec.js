'use strict';
var codeCopter = require('../');

codeCopter.configure({
    jscs: true,
    jshint: true
});

describe('Code quality', codeCopter);
