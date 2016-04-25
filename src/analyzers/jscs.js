'use strict';
var Analysis = require('code-copter-sdk').Analysis,
    Analyzer = require('code-copter-sdk').Analyzer,
    configuration,
    fs = require('fs'),
    Jscs = require('jscs');

module.exports = new Analyzer({
    analyze: analyze,
    configure: configure,
    name: 'JSCS'
});

function analyze (fileSourceData) {
    var analysis = new Analysis(),
        jscs = new Jscs();

    jscs.registerDefaultRules();

    jscs.configure(configuration);

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

function configure (config) {
    if (config === false) {
        throw new Error('JSHint configuration has been disabled');
    }
    else if (config === true) {
        configuration = getJscsrc();
    }
    else {
        configuration = config;
    }
}

/**
 * Get the object representation of the configuration in .jscsrc in the project
 * root.
 */
function getJscsrc () {
    var jscsrcPath = process.cwd() + '/.jscsrc';

    try {
        return JSON.parse(fs.readFileSync(jscsrcPath, 'utf8'));
    }
    catch (error) {
        throw new Error(`Expected to find JSCS configuration ${jscsrcPath}; saw error "${error.message}". Cannot run JSCS analysis.`, error);
    }
}
