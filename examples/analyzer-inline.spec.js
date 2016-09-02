'use strict';
var codeCopter = require('../');

/**
 * A pretty harsh analyzer that passes NO files for the reason that "it sucks" starting on line 1.
 *
 * @param {FileSourceData} fileSourceData - The file source data to analyze.
 * @returns {Object} An object consistent with a code-copter Analysis object bearing the inevitable message that the code in the analyzed file sucks.
 */
function itSucks (fileSourceData) {
    // OPTIMIZATION: Skip analysis loop and just tell them their code sucks.
    //
    //for (let sample of fileSourceData) {
    //  // TODO: Test sample.text to see if it sucks, add error message for sample.line
    //}

    return {
        errors: [{
            line: 1,
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
