'use strict';
describe('JSCS analyzer', function describeJscsAnalyzer () {
    var jscsAnalyzer = require('./jscs'),
        Analyzer = require('../Analyzer');

    it('should export an analyzer', function shouldExportAnalyzer () {
        expect(jscsAnalyzer).toEqual(jasmine.any(Analyzer));
    });
});
