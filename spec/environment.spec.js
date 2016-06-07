'use strict';
var fs = require('fs');

describe('Environment', function describeEnvironment () {
    it('should use a node version matching .nvmrc', function itShouldUseNvmrc () {
        var nvmrcVersion = fs.readFileSync('.nvmrc').toString().match(/\w+/)[0];

        expect(process.version).toMatch(nvmrcVersion);
    });
});
