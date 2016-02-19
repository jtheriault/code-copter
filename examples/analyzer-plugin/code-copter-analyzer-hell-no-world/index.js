'use strict';
var Analysis = require('code-copter').Analysis,
    Analyzer = require('code-copter').Analyzer;

module.exports = new Analyzer({
    analyze: analyze,
    name: 'Hell(n)o World!'
});

function analyze (sourceFileText) {
    var lineSaysHelloWorld,
        analysis = new Analysis();
    
    lineSaysHelloWorld = sourceFileText.split('\n').map(saysHelloWorld);

    lineSaysHelloWorld.forEach(function appendErrorLine (isError, lineNumber) {
        if (isError) {
            analysis.addError({
                line: lineNumber + 1,
                message: 'At least make it look like you didn\'t copy the demo code!'
            });
        }
    });

    return analysis;
}

function saysHelloWorld(text) {
    return text.match(/\Whello world\W/i) !== null;
}
