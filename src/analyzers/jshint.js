'use strict';
var fs = require('fs'),
    jshintrcPath = process.cwd() + '/.jshintrc',
    jshintrc,
    jshint = require('jshint').JSHINT;

module.exports = analyze;

/**
 * Gets the object representation of the configuration in .jshintrc in the 
 * project root.
 */
function getJshintrc () {
    if (!jshintrc) {
        try {
            jshintrc = JSON.parse(fs.readFileSync(jshintrcPath, 'utf8'));
        }
        catch (error) {
            throw new Error(`Expected to find JSHint configuration ${jshintrcPath}; saw error ${error.message}`, error);
        }
    }

    return jshintrc;
}

function analyze (actual) {
    var config = getJshintrc(),
        result = { pass: true };

    jshint(actual, jshintrc);
    result.pass = jshint.errors.length === 0;

    result.errors = jshint.errors
        .map(error => ({ line: error.line, message: error.raw }));

    return result;
}
