'use strict';
var fs = require('fs'),
    jscsrcPath = process.cwd() + '/.jscsrc',
    jscsrc,
    Jscs = require('jscs');

module.exports = analyze;

/**
 * Get the object representation of the configuration in .jscsrc in the project
 * root.
 */
function getJscsrc () {
    if (!jscsrc) {
        try {
            jscsrc = JSON.parse(fs.readFileSync(jscsrcPath, 'utf8'));
        }
        catch (error) {
            throw new Error(`Expected to find JSCS configuration ${jscsrcPath}; saw error ${error.message}`, error);
        }
    }

    return jscsrc;
}

function analyze (actual, expected) {
    // TODO: Don't instantiate and configure default every time
    var jscs = new Jscs(),
        config = expected || getJscsrc(),
        errors,
        result = { pass: true };

    jscs.registerDefaultRules();
    jscs.configure(config);

    errors = jscs.checkString(actual).getErrorList();
    result.pass = errors.length === 0;

    result.errors = errors.map(error => ({ line: error.line, message: error.message }));

    return result;
}
