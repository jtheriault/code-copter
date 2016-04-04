'use strict';
var assert = require('assert');

class Analyzer {
    /* jscs:disable disallowAnonymousFunctions */
    constructor (parameters) {
        assert(parameters, 'A value for parameters must be provided');
        assert(parameters.analyze, 'An analyze function must be provided');
        assert(parameters.name, 'A name must be provided');

        this.analyze = parameters.analyze;
        this.configure = parameters.configure || configure;
        this.name = parameters.name;

        Object.seal(this);
    }
}

function configure (enabled) {
    assert(enabled !== false, 'Analyzer must be configured to be enabled');
}

module.exports = Analyzer;
