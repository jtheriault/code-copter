'use strict';
var assert = require('assert');

class Reporter {
    /* jscs:disable disallowAnonymousFunctions */
    constructor (parameters) {
        assert(parameters, 'A value for parameters must be provided');
        assert(typeof parameters.report === 'function', 'A report function must be provided');

        this.report = parameters.report;

        Object.seal(this);
    }
}

module.exports = Reporter;
