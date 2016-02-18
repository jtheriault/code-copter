'use strict';
var assert = require('assert');

class Analyzer {
    /* jscs:disable */
    constructor (parameters) {
        assert(parameters, 'A value for parameters must be provided');
        assert(parameters.analyze, 'An implementation for analyze must be provided');
        assert(parameters.name, 'A name must be provided');

        this.analyze = parameters.analyze;
        this.name = parameters.name;

        Object.seal(this);
    }
}

module.exports = Analyzer;
