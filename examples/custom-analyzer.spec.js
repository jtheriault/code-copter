'use strict';
var codeCopter = require('../');

function itSucks () {
    return {
        compare: function compare () {
            return {
                message: 'Expected actual code not to suck',
                pass: false
            };
        }
    };
}

codeCopter.configure({
    itSucks: itSucks
});

describe('Custom Analayzer Example', codeCopter);
