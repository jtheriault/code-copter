'use strict';
var codeCopter = require('../');

/**
 * A pretty harsh analyzer that passes NO files for the reason that "it sucks" starting on line 1.
 *
 * @param {FileSourceData} fileSourceData - The file source data to analyze.
 * @returns {Object} An object consistent with a code-copter Analysis object bearing the inevitable message that the code in the analyzed file sucks.
 */
function itSucks (fileSourceData) {
    var errors = [];

    for (let sample of fileSourceData) {
        errors.push({
            line: sample.line,
            message: 'This code sucks: ' + sample.text
        });
    }

    return {
        // Too noisy to display every sucky line.
        // It all sucks, so just say the sucking starts with the first one
        //
        //errors: errors,
        errors: [{
            line: errors.shift().line,
            message: 'It sucks. Starting here.'
        }],
        pass: false
    };
}

codeCopter.configure({
    analyzers: {
        itSucks: itSucks
    }
});

describe('Inline Analyzer Example', codeCopter);
