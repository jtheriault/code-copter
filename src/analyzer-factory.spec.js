'use strict';
var proxyquire = require('proxyquire');

describe('Analyzer factory', function describeAnalyzerFactory () {
    var factory,
        fakeAnalyzers,
        pluginFactory = require('./plugin-factory'),
        Analyzer = require('./Analyzer');

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

        expect(result).toEqual(jasmine.any(Analyzer));
        expect(result.analyze).toBe(fakeAnalyzer);
    });

    describe('creating plugins', function describeCreatePlugin () {
        var testAnalyzerName,
            testAnalyzerParameters;

        beforeEach(function prepareTestData () {
            testAnalyzerName = 'Sigmund';
            testAnalyzerParameters = {
                analyze: function analyze () {}
            };
        });

        it('should return an analyzer plugin (and not a packaged analyzer)', function create () {
            var fakeAnalyzer,
                result;

            fakeAnalyzers[testAnalyzerName] = {};

            fakeAnalyzer = new Analyzer(testAnalyzerParameters);
            pluginFactory.create.and.returnValue(fakeAnalyzer);

            result = factory.create(testAnalyzerName);

            expect(pluginFactory.create).toHaveBeenCalledWith('analyzer', testAnalyzerName);
            expect(result).toBe(fakeAnalyzer);
        });

        it('should return a plugin with the correct analyzer parameters', function create () {
            var result;

            pluginFactory.create.and.returnValue(testAnalyzerParameters);

            result = factory.create(testAnalyzerName);
            
            expect(result).toEqual(jasmine.any(Analyzer));
            expect(result).toEqual(jasmine.objectContaining(testAnalyzerParameters));
        });

        it('should not return a plugin which is not an analyzer', function create () {
            var result;

            pluginFactory.create.and.returnValue({});

            result = factory.create(testAnalyzerName, true);

            expect(result).toEqual(null);
        });
    });
});
