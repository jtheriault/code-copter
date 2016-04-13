'use strict';
var Analysis = require('./Analysis'),
    assert = require('assert');

class Report {
    /* jscs:disable disallowAnonymousFunctions */
    constructor () {
        this.analyses = [];
        this.pass = true;

        Object.seal(this);
    }

    /* jscs:disable disallowAnonymousFunctions */
    addAnalysis (analysis) {
        assert(analysis, 'An analysis must be provided');
        assert(analysis instanceof Analysis, 'The analysis must be of type Analysis');

        this.analyses.push(analysis);

        this.pass = this.pass && analysis.pass;
    }
}

module.exports = Report;
