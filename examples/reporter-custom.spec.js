'use strict';
var codeCopter = require('../');

function itSucks (analysis) {
    if (analysis.pass) {
        console.log(`${analysis.source} looks good. Wanna cookie or something? This is what's supposed to happen!`);
    }
    else {
        console.warn(`Your code in ${analysis.source} sucks!`);
        console.warn(analysis.errors
            .map((error, index) => `Reason #${index + 1} it sucks: ${error.message} (line ${error.line})`)
            .join('\n'));
    }
}

codeCopter.configure({
    reporter: itSucks
});

codeCopter();
