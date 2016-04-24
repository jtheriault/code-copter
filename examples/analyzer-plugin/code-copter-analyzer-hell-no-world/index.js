'use strict';
var Analysis = require('code-copter-sdk').Analysis,
    Analyzer = require('code-copter').Analyzer,
    matchExpression = /\Whello world\W/i;

module.exports = new Analyzer({
    analyze: analyze,
    configure: configure,
    name: 'Hell(n)o World!'
});

/**
 * Analyze file source data for the case-insensitive phrase "Hello world".
 *
 * @param {FileSourceData} fileSourceData - The file source data to analyze.
 * @returns {Analysis} - The analysis of the file source data.
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

function configure (config) {
    if (config !== true) {
        if (config.constructor.name !== 'RegExp') {
            throw new Error('Configuration must either be a match expression or a boolean true for the default.');
        }

        matchExpression = config;
    }
}

/**
 * Determines whether a string contains the case-insentive phrase "Hello world".
 *
 * @param {String} text - The text to check
 * @returns {Boolean} - True if the text contains "Hello world;" otherwise false.
 */
function saysHelloWorld(text) {
    return text.match(matchExpression) !== null;
}
