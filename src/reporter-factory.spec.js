'use strict';
var proxyquire = require('proxyquire');

describe('Reporter factory', function describeReporterFactory () {
    var factory,
        fakeReporters,
        Reporter = require('code-copter-sdk').Reporter;

    beforeEach(function prepareDepencencies () {
        fakeReporters = {};

        factory = proxyquire('./reporter-factory', {
            './reporters': fakeReporters
        });
    });

    it('should return a packaged reporter', function create () {
        var testReporterName,
            fakeReporter,
            result;            

        testReporterName = 'be-awesome';
        fakeReporter = new Reporter({ 
            report: function report () {}
        });

        fakeReporters[testReporterName] = fakeReporter;

        result = factory.create(testReporterName);

        expect(result).toBe(fakeReporter);
    });

    it('should return an inline reporter', function create () {
        var testConfiguration,
            result;

        function fakeReporter () {}
        
        result = factory.create(fakeReporter);

        expect(result).toEqual(jasmine.any(Reporter));
        expect(result.report).toBe(fakeReporter);
    });

    describe('creating plugins', function describeCreatePlugin () {
        var pluginFactory = require('./plugin-factory'),
            testReporterName,
            testReporterParameters;

        beforeEach(function prepareTestData () {
            testReporterName = 'Greenwald';
            testReporterParameters = {
                report: function report () {}
            };
            
            spyOn(pluginFactory, 'create');
        });

        it('should return a plugin', function create () {
            var fakeReporter,
                result;

            // Packaged reporters should be ignored
            fakeReporters[testReporterName] = {};

            fakeReporter = new Reporter(testReporterParameters);
            pluginFactory.create.and.returnValue(fakeReporter);

            result = factory.create(testReporterName);

            expect(pluginFactory.create).toHaveBeenCalledWith('reporter', testReporterName);
            expect(result).toEqual(fakeReporter);
        });

        it('should return a plugin with the correct reporter parameters', function create () {
            var result;

            pluginFactory.create.and.returnValue(testReporterParameters);

            result = factory.create(testReporterName);

            expect(result).toEqual(jasmine.any(Reporter));
            expect(result).toEqual(jasmine.objectContaining(testReporterParameters));
        });

        it('shoud not return a plugin which is not a reporter', function create () {
            var result;

            pluginFactory.create.and.returnValue({});

            result = factory.create(testReporterName);
            
            expect(pluginFactory.create).toHaveBeenCalledWith('reporter', testReporterName);
            expect(result).toBe(null);
        });
    });
});
