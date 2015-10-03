'use strict';
var fs = require('fs'),
    jscsrcPath = process.cwd() + '/.jscsrc',
    jscsrc,
    Jscs = require('jscs');

module.exports = toPassJSCS;

/**
 * Get the object representation of the configuration in .jscsrc in the project
 * root.
 */
function getJscsrc () {
    if (!jscsrc) {
        // TODO: Provide error when parsing fails
        jscsrc = JSON.parse(fs.readFileSync(jscsrcPath, 'utf8'));
    }

    return jscsrc;
}

/**
 * Jasmine matcher function to perform the comparison of actual source code to
 * the expected JSCS configuration.
 */
function toPassJSCS () {
    return {
        compare: function compare (actual, expected) {
            // TOOD: Don't instantiate and configure default every time
            var jscs = new Jscs(),
                config = expected || getJscsrc(),
                errors,
                result = { pass: true };

            jscs.registerDefaultRules();
            jscs.configure(config);

            errors = jscs.checkString(actual).getErrorList();
            result.pass = errors.length === 0;

            if (result.pass) {
                result.message = 'Expected source not to pass JSCS';
            }
            else {
                result.message = errors.map(error => `line ${error.line}:\t${error.message}`)
                    .join('\n');
            }

            return result;
        }
    };
}
