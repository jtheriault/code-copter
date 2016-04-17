'use strict';
var Analysis = require('../Analysis'),
    Analyzer = require('../Analyzer'),
    configuration,
    fs = require('fs'),
    jshint = require('jshint');

module.exports = new Analyzer({
    analyze: analyze,
    configure: configure,
    name: 'JSHint'
});

function analyze (fileSourceData) {
    var analysis = new Analysis();

    jshint.JSHINT(fileSourceData.text, configuration);
    
    jshint.JSHINT.errors
        .filter(error => error !== null)
        .forEach(error => {
            analysis.addError({ 
                line: (error.line + fileSourceData.lineStart) - 1, 
                message: error.raw 
            });
        });

    return analysis;
}

function configure (config) {
    if (config === false) {
        throw new Error('JSHint configuration has been disabled');
    }
    else if (config === true) {
        configuration = getJshintrc();
    }
    else {
        configuration = config;
    }
}

/**
 * Gets the object representation of the configuration in .jshintrc in the 
 * project root.
 */
function getJshintrc () {
    var jshintrcPath = process.cwd() + '/.jshintrc';

    try {
        return JSON.parse(fs.readFileSync(jshintrcPath, 'utf8'));
    }
    catch (error) {
        console.warn(`Expected to find JSHint configuration ${jshintrcPath}. Using default JSHint configuration`);
        return undefined;
    }
}
