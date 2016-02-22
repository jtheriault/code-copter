'use strict';
describe('JSHint analyzer', function describeJshintAnalyzer () {
    var jshintAnalyzer = require('./jshint'),
        Analyzer = require('../Analyzer'),
        Analysis = require('../Analysis'),
        FileSourceData = require('../FileSourceData');

    it('should export an analyzer', function shouldExportAnalyzer () {
        expect(jshintAnalyzer).toEqual(jasmine.any(Analyzer));
    });

    it('should produce an analysis from file source data', function analyze () {
        var testFileSourceData;

        testFileSourceData = new FileSourceData({
            text: 'test'
        }); 

        expect(jshintAnalyzer.analyze(testFileSourceData)).toEqual(jasmine.any(Analysis));
    });
});
