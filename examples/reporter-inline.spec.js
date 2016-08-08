'use strict';
var codeCopter = require('../');

/**
 * A pretty harsh reporter. 
 * It tells you in no uncertain terms that code that doesn't pass analysis could
 * use improvement (and isn't especially kind about passing code either).
 *
 * @param {Report|Object} report - A code-copter report (see code-copter-sdk)
 */
function itSucks (report) {
    if (report.pass) {
        console.log(`Your code looks good. Wanna cookie or something? This is what's supposed to happen!`);
    }
    else {
        for (let analysis of report.analyses) {
            if (!analysis.pass) {
                console.warn(`Your code in ${analysis.target} sucks!`);
                console.warn(analysis.errors
                    .map((error, index) => `Reason #${index + 1} it sucks: ${error.message} (line ${error.line})`)
                    .join('\n'));
            }
        }
    }
}

codeCopter.configure({
    reporter: itSucks
});

codeCopter();
