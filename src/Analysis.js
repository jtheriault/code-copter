'use strict';
var assert = require('assert');

class Analysis {
    /* jscs:disable disallowAnonymousFunctions */
    constructor () {
        this.errors = [];
    }

    /* jscs:disable disallowAnonymousFunctions */
    addError (error) {
        assert(error, 'An error must be provided');
        assert(error.message, 'An error message must be provided');
        
        this.errors.push(error);
    }

    get pass () {
        return this.errors.length === 0;
    }
}

module.exports = Analysis;
