'use strict';
var codeCopter = require('../');

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

describe('Inline Analayzer Example', codeCopter);
