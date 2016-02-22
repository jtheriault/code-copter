'use strict';
var Analysis = require('code-copter').Analysis,
    Analyzer = require('code-copter').Analyzer;

module.exports = new Analyzer({
    analyze: analyze,
    name: 'Hell(n)o World!'
});

/**
 * Analyze file source data for the case-insensitive phrase "Hello world."
 *
 * @param {FileSourceData} fileSourceData
 * @returns {Analysis}
 */
function analyze (fileSourceData) {
    var analysis = new Analysis();
        
    for (let sample of fileSourceData) {
        if (saysHelloWorld(sample.text)) {
            analysis.addError({
                line: sample.line,
                message: 'At least try to look like you didn\'t copy the demo code!'
            });
        }
    }

    return analysis;
}

/**
 * Determines whether a string contains the case-insentive phrase "Hello world."
 *
 * @param {String} text - The text to check
 * @returns {Boolean} - True if the text contains "Hello world;" otherwise false.
 */
function saysHelloWorld(text) {
    return text.match(/\Whello world\W/i) !== null;
}
