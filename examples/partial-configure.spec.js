'use strict';
var codeCopter = require('../');

// Disable jscs, but leave jshint enabled
codeCopter.configure({ 
    analyzers: {
        jscs: false 
    }
});

describe('Partial Configuration Example', codeCopter);
