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

    describe('creating packaged analyzers', function describeCreatePackagedAnalyzer () {
        var fakeAnalyzer,
            testAnalyzerName;

        beforeEach(function prepareTestData () {
            testAnalyzerName = 'awesome';
            fakeAnalyzer = new Analyzer({ 
                analyze: function analyze () {},
                name: 'awesome'
            });
            fakeAnalyzers[testAnalyzerName] = fakeAnalyzer;
        });

        it('should return packaged analyzers ', function create () {
            var result;
                
            result = factory.create(testAnalyzerName);

            expect(result).toBe(fakeAnalyzer);
        });

        it('should configure analyzer', function create () {
            var testConfig;

            testConfig = {
                be: 'awesome!'
            };

            spyOn(fakeAnalyzer, 'configure');

            factory.create(testAnalyzerName, testConfig);

            expect(fakeAnalyzer.configure).toHaveBeenCalledWith(testConfig);
        });

        it('should return null if configuring throws an error', function create () {
            var result;

            spyOn(fakeAnalyzer, 'configure').and.throwError();

            result = factory.create(testAnalyzerName);

            expect(result).toEqual(null);
            expect(fakeAnalyzer.configure).toHaveBeenCalled();
        });
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
        var fakeAnalyzer,
            testAnalyzerName,
            testAnalyzerParameters;

        beforeEach(function prepareTestData () {
            testAnalyzerName = 'Sigmund';
            testAnalyzerParameters = {
                analyze: function analyze () {},
                name: 'test plugin analyzer'
            };

            fakeAnalyzer = new Analyzer(testAnalyzerParameters);
            pluginFactory.create.and.returnValue(fakeAnalyzer);
        });

        it('should return an analyzer plugin (and not a packaged analyzer)', function create () {
            var result;

            fakeAnalyzers[testAnalyzerName] = {};

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

        it('should configure analyzer', function create () {
            var testConfig;

            testConfig = {
                be: 'awesome!'
            };

            spyOn(fakeAnalyzer, 'configure').and.throwError();

            factory.create(testAnalyzerName, testConfig);

            expect(fakeAnalyzer.configure).toHaveBeenCalledWith(testConfig);
        });

        it('should return null if configuring throws an error', function create () {
            var result;

            spyOn(fakeAnalyzer, 'configure').and.throwError();

            result = factory.create(testAnalyzerName);

            expect(result).toEqual(null);
            expect(fakeAnalyzer.configure).toHaveBeenCalled();
        });
    });
});
