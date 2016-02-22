'use strict';
var assert = require('assert'),
    os = require('os');

class FileSourceData {
    /* jscs:disable disallowAnonymousFunctions */
    constructor (parameters) {
        assert(parameters, 'File source data parameters are required');
        assert(parameters.text, 'File source data text is required');

        this.lineStart = parameters.lineStart || 1;
        this.text = parameters.text;

        this[Symbol.iterator] = function iterator () {
            return new FileSourceDataSampleIterator(this);
        };

        Object.seal(this);
    }
}

class FileSourceDataSampleIterator {
    constructor (data) {
        this.data = data;
        this.lines  = this.data.text.split(os.EOL);

        this.current = 0;
    }

    /* jscs:disable disallowAnonymousFunctions */
    next () {
        var result = {
            done: this.current >= this.lines.length,
            value: {
                line: this.current + this.data.lineStart,
                text: this.lines[this.current]
            }
        };

        this.current++;

        return result;
    }
}

module.exports = FileSourceData;
