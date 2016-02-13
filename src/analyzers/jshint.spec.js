'use strict';
describe('JSHint analyzer', function describeJshintAnalyzer () {
    var jshintAnalyzer = require('./jshint'),
        Analyzer = require('../Analyzer');

    it('should export an analyzer', function shouldExportAnalyzer () {
        expect(jshintAnalyzer).toEqual(jasmine.any(Analyzer));
    });
});
