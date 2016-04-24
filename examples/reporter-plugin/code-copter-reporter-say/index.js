'use strict';
var Reporter = require('code-copter-sdk').Reporter,
    say = require('say');

module.exports = new Reporter({
    report: sayReport
});

function sayReport (report) {
    var errorCount = 0,
        speech;

    if (report.pass) {
        speech = 'Congratulations! Your code passes code copter analysis.';
    }
    else {
        for (let analysis of report.analyses) {
            if (!analysis.pass) {
                speech += `In ${analysis.target}, there were ${analysis.errors.length + 1} errors.`;

                for (let error of analysis.errors) {
                    errorCount++;

                    speech += `On line ${error.line}, ${error.message}.`;
                }
            }
        }

        speech = `Code Copter reports ${errorCount} errors` + speech;
    }

    say.speak(speech);
}
