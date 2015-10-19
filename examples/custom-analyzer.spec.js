'use strict';
var codeCopter = require('../');

function itSucks () {
    return {
        compare: function compare (actual) {
            return {
                pass: false,
                message: 'Expected actual code not to suck'
            };
        }
    };
}

codeCopter.configure({
    itSucks: itSucks
});

describe('My code', codeCopter);
