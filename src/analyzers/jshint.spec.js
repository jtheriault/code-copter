'use strict';
describe('JSHint analyzer', function describeJshintAnalyzer () {
    var jshintAnalyzer = require('./jshint'),
        Analyzer = require('../Analyzer'),
        Analysis = require('../Analysis');

    it('should export an analyzer', function shouldExportAnalyzer () {
        expect(jshintAnalyzer).toEqual(jasmine.any(Analyzer));
    });

    it('should produce an analysis', function analyze () {
        expect(jshintAnalyzer.analyze()).toEqual(jasmine.any(Analysis));
    });
});
