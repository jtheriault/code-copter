'use strict';
var proxyquire = require('proxyquire');

describe('Analyzer factory', function describeAnalyzerFactory () {
    var factory,
        fakeAnalyzers,
        pluginFactory = require('./plugin-factory');

    beforeEach(function prepareDepencencies () {
        fakeAnalyzers = {};

        spyOn(pluginFactory, 'create');

        factory = proxyquire('./analyzer-factory', {
            './analyzers': fakeAnalyzers
        });
    });

    it('should return packaged analyzers ', function create () {
        var testAnalyzerName,
            testAnalyzer,
            result;

        testAnalyzerName = 'be-awesome';
        testAnalyzer = { be: 'awesome' };
        fakeAnalyzers[testAnalyzerName] = testAnalyzer;
            
        result = factory.create(testAnalyzerName, true);

        expect(result).toBe(testAnalyzer);
    });

    it('should return the configuration', function create () {
        var testConfiguration,
            result;

        function fakeAnalyzer () {}
        
        result = factory.create('whatever', fakeAnalyzer);

        expect(result).toBe(fakeAnalyzer);
    });

    it('should return a plugin', function create () {
        var testAnalyzerName = 'Sigmund',
            fakeAnalyzer,
            result;

        fakeAnalyzer = {
            analyze: function () {}
        };

        pluginFactory.create.and.returnValue(fakeAnalyzer);
        
        // Packaged analyzers should be ignored
        fakeAnalyzers[testAnalyzerName] = {};

        result = factory.create(testAnalyzerName, true);
        
        expect(pluginFactory.create).toHaveBeenCalledWith('analyzer', testAnalyzerName);
        expect(result).toBe(fakeAnalyzer);
    });
});
