'use strict';
var Analysis = require('../Analysis'),
    Analyzer = require('../Analyzer'),
    fs = require('fs'),
    jscsrcPath = process.cwd() + '/.jscsrc',
    jscsrc,
    Jscs = require('jscs');

module.exports = new Analyzer({
    analyze: analyze,
    name: 'JSCS'
});

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

function analyze (fileSourceData) {
    var jscs = new Jscs(),
        config = getJscsrc(),
        analysis;

    analysis = new Analysis();

    jscs.registerDefaultRules();
    jscs.configure(config);

    jscs.checkString(fileSourceData.text)
        .getErrorList()
        .forEach(error => {
            analysis.addError({ 
                line: (error.line + fileSourceData.lineStart) - 1, 
                message: error.message 
            });
        });

    return analysis;
}
