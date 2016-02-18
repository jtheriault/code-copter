'use strict';
describe('JSCS analyzer', function describeJscsAnalyzer () {
    var jscsAnalyzer = require('./jscs'),
        Analyzer = require('../Analyzer'),
        Analysis = require('../Analysis');

    it('should export an analyzer', function shouldExportAnalyzer () {
        expect(jscsAnalyzer).toEqual(jasmine.any(Analyzer));
    });

    it('should produce an analysis', function analyze () {
        expect(jscsAnalyzer.analyze('')).toEqual(jasmine.any(Analysis));
    });
});
