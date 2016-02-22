'use strict';
describe('JSCS analyzer', function describeJscsAnalyzer () {
    var jscsAnalyzer = require('./jscs'),
        Analyzer = require('../Analyzer'),
        Analysis = require('../Analysis'),
        FileSourceData = require('../FileSourceData');

    it('should export an analyzer', function shouldExportAnalyzer () {
        expect(jscsAnalyzer).toEqual(jasmine.any(Analyzer));
    });

    it('should produce an analysis from file source data', function analyze () {
        var testFileSourceData;

        testFileSourceData = new FileSourceData({
            text: 'test'
        }); 

        expect(jscsAnalyzer.analyze(testFileSourceData)).toEqual(jasmine.any(Analysis));
    });
});
