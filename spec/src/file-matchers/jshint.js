'use strict';
var fs = require('fs'),
    jshintrcPath = process.cwd() + '/.jshintrc',
    jshintrc,
    jshint = require('jshint').JSHINT;

module.exports = toPassJSHint;

function getJshintrc () {
    if (!jshintrc) {
        jshintrc = JSON.parse(fs.readFileSync(jshintrcPath, 'utf8'));
    }

    return jshintrc;
}

function toPassJSHint (util, customEqualityTesters) {
    return {
        compare: function compare (actual, expected) {
            var config = expected || getJshintrc(),
                result = { pass: true };

            jshint(actual, jshintrc);
            result.pass = jshint.errors.length === 0;

            if (result.pass) {
                result.message = 'Expected source not to pass JSHint';
            }
            else {
                result.message = jshint.errors
                    .map(error => `line ${error.line}:\t${error.raw}`)
                    .join('\n');
            }

            return result;
        }
    };
}
