'use strict';
var codeCopter = require('../');

/**
 * A pretty harsh analyzer that passes NO files for the reason that "it sucks" starting on line 1.
 *
 * @returns {Object} An object consistent with a code-copter Analysis object bearing the inevitable message that the code in the analyzed file sucks.
 */
function itSucks () {
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
