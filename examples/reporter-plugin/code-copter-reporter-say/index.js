'use strict';
var Reporter = require('code-copter').Reporter,
    say = require('say');

module.exports = new Reporter({
    report: report
});

function report (analysis) {
    var speech;

    if (analysis.pass) {
        speech = 'Congratulations! Your code passes code copter analysis.';
    }
    else {
        speech = `There were ${analysis.errors.length} errors in ${analysis.target}`;

        for (let error of analysis.errors) {
            speech += `On line ${error.line}, ${error.message}`;
        }
    }

    say.speak(speech);
}
