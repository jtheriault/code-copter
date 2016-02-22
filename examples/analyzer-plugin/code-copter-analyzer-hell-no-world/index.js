'use strict';
var Analysis = require('code-copter').Analysis,
    Analyzer = require('code-copter').Analyzer;

module.exports = new Analyzer({
    analyze: analyze,
    name: 'Hell(n)o World!'
});

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

function saysHelloWorld(text) {
    return text.match(/\Whello world\W/i) !== null;
}
