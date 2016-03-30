'use strict';
var Analysis = require('../Analysis'),
    Analyzer = require('../Analyzer'),
    fs = require('fs'),
    jshintrc,
    jshint = require('jshint');

module.exports = new Analyzer({
    analyze: analyze,
    configure: configure,
    name: 'JSHint'
});

function analyze (fileSourceData) {
    var analysis = new Analysis();

    jshint.JSHINT(fileSourceData.text, jshintrc);
    
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

function configure (configuration) {
    if (configuration === false) {
        throw new Error('JSHint configuration has been disabled');
    }
    else if (configuration === true) {
        jshintrc = getJshintrc();
    }
    else {
        jshintrc = configuration;
    }
}

/**
 * Gets the object representation of the configuration in .jshintrc in the 
 * project root.
 */
function getJshintrc () {
    var jshintrcPath = process.cwd() + '/.jshintrc';

    try {
        jshintrc = JSON.parse(fs.readFileSync(jshintrcPath, 'utf8'));
    }
    catch (error) {
        throw new Error(`Expected to find JSHint configuration ${jshintrcPath}; saw error ${error.message}`, error);
    }

    return jshintrc;
}
