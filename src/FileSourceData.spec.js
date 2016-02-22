'use strict';
var proxyquire = require('proxyquire');

describe('File source data', function describeFileSourceData () {
    var FileSourceData,
        fakeEOL,
        validParameters;

    beforeEach(function prepareTestData () {
        fakeEOL = '[BREAK]';

        validParameters = {
            text: `line 1 text${fakeEOL}line 2 text${fakeEOL}line 3 text`
        };

        FileSourceData = proxyquire('./FileSourceData', {
            os: {
                EOL: fakeEOL
            }
        });
    });

    it('should require instantiation', function constructor () {
        expect(function callFileSourceData () {
            /* jshint newcap:false */
            FileSourceData(validParameters);
        }).toThrow();
    });

    it('should instantiate with required parameters', function constructor () {
        var data;

        expect(function instantiateFileSourceData () {
            data = new FileSourceData(validParameters);
        }).not.toThrow();

        expect(data).toEqual(jasmine.objectContaining(validParameters));
    });

    it('should not allow modification of its structure', function shouldBeSealed () {
        var data = new FileSourceData(validParameters);

        expect(function monkeyPatchFileSourceData () {
            data.canBeChanged = false;
        }).toThrow();
    });

    it('should require parameters', function constructor () {
        expect(function instantiateFileSourceData () {
            new FileSourceData();
        }).toThrow();
    });

    it('should require text', function constructor () {
        delete validParameters.text;

        expect(function instantiateFileSourceData () {
            new FileSourceData(validParameters);
        }).toThrow();
    });

    it('should provide line samples on iteration', function iterator () {
        var data,
            expectedSamples,
            foundSample,
            sampleCount = 0;

        expectedSamples = validParameters.text.split(fakeEOL);

        data = new FileSourceData(validParameters);

        for (let sample of data) {
            // Only record the first one for a predictable line number
            foundSample = foundSample || sample;

            expect(sample.text).toEqual(expectedSamples[sampleCount]);

            sampleCount++;
        }

        expect(foundSample).toEqual({
            line: 1,
            text: jasmine.any(String)
        });
        expect(sampleCount).toEqual(expectedSamples.length);
    });

    it('should offset sample line based on line parameter', function iterator () {
        var data,
            foundSample,
            testLineStart;

        testLineStart = 42;

        validParameters.lineStart = testLineStart;

        data = new FileSourceData(validParameters);

        for (let sample of data) {
            foundSample = sample;

            // Only record the first one for a predictable line number
            break;
        }

        expect(foundSample.line).toEqual(testLineStart);
    });
});
