'use strict';
var Analysis = require('../Analysis'),
    Analyzer = require('../Analyzer'),
    fs = require('fs'),
    jshintrcPath = process.cwd() + '/.jshintrc',
    jshintrc,
    jshint = require('jshint').JSHINT;

module.exports = new Analyzer({
    analyze: analyze,
    name: 'JSHint'
});

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

function analyze (fileSourceData) {
    var config = getJshintrc(),
        analysis = new Analysis();

    jshint(fileSourceData.text, jshintrc);
    
    jshint.errors
        .forEach(error => {
            analysis.addError({ 
                line: (error.line + fileSourceData.lineStart) - 1, 
                message: error.raw 
            });
        });

    return analysis;
}
