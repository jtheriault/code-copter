'use strict';
var codeCopter = require('../');

codeCopter.configure({
    jscs: false,
    jshint: true
});

describe('Enable-Disable Example', codeCopter);
