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

    it('should return an inline analyzer', function create () {
        var testConfiguration,
            result;

        function fakeAnalyzer () {}
        
        result = factory.create('whatever', fakeAnalyzer);

        expect(result).toBe(fakeAnalyzer);
    });

    describe('creating plugins', function describeCreatePlugin () {
        var testAnalyzerName;

        beforeEach(function prepareTestData () {
            testAnalyzerName = 'Sigmund';
        });

        it('should return a plugin', function create () {
            var fakeAnalyzer,
                result;

            fakeAnalyzer = {
                analyze: function analyze () {}
            };

            pluginFactory.create.and.returnValue(fakeAnalyzer);
            
            // Packaged analyzers should be ignored
            fakeAnalyzers[testAnalyzerName] = {};

            result = factory.create(testAnalyzerName, true);
            
            expect(pluginFactory.create).toHaveBeenCalledWith('analyzer', testAnalyzerName);
            expect(result).toBe(fakeAnalyzer);
        });

        it('should not return a plugin which is not an analyzer', function create () {
            var result;

            pluginFactory.create.and.returnValue({});

            result = factory.create(testAnalyzerName, true);

            expect(pluginFactory.create).toHaveBeenCalledWith('analyzer', testAnalyzerName);
            expect(result).toEqual(null);
        });
    });
});
