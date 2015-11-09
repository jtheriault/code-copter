'use strict';
var proxyquire = require('proxyquire');

describe('Analyzer factory', function describeAnalyzerFactory () {
    var factory,
        fakeAnalyzers;

    beforeEach(function prepareDepencencies () {
        fakeAnalyzers = {};

        factory = proxyquire('./analyzer-factory', {
            './analyzers': fakeAnalyzers
        });
    });

    describe('returning packaged analyzers', function describePackagedAnalyzer () {
        var testAnalyzerName,
            testAnalyzer;

        beforeEach(function addTestAnalyzer () {
            testAnalyzerName = 'be-awesome';
            testAnalyzer = { be: 'awesome' };

            fakeAnalyzers[testAnalyzerName] = testAnalyzer;
        });

        it('should succeed', function create () {
            var result;

            result = factory.create(testAnalyzerName, true);

            expect(result).toBe(testAnalyzer);
        });

        it('should return null for a false configuration', function create () {
            var result;

            result = factory.create(testAnalyzerName, false);

            expect(result).toBe(null);
        });
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
            pluginFactory = require('./analyzer-plugin-factory');

        spyOn(pluginFactory, 'create');

        factory.create(testAnalyzerName, true);

        expect(pluginFactory.create).toHaveBeenCalledWith(testAnalyzerName);
    });
});
