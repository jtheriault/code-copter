'use strict';
var Analyzer = require('code-copter').Analyzer;

module.exports = new Analyzer({
    analyze: analyze
});

function analyze (sourceFileText) {
    var lineSaysHelloWorld,
        errors,
        result;
    
    lineSaysHelloWorld = sourceFileText.split('\n').map(saysHelloWorld);

    errors = [];

    lineSaysHelloWorld.forEach(function appendErrorLine (isError, lineNumber) {
        if (isError) {
            errors.push({
                line: lineNumber + 1,
                message: 'At least make it look like you didn\'t copy the demo code!'
            });
        }
    });

    result = {
        errors: errors,
        pass: errors.length === 0
    };

    return result;
}

function saysHelloWorld(text) {
    return text.match(/\Whello world\W/i) !== null;
}
