'use strict';
var proxyquire = require('proxyquire');

describe('Reporter factory', function describeReporterFactory () {
    var factory,
        fakeReporters;

    beforeEach(function prepareDepencencies () {
        fakeReporters = {};

        factory = proxyquire('./reporter-factory', {
            './reporters': fakeReporters
        });
    });

    it('should return a packaged reporter', function create () {
        var testReporterName,
            testReporter,
            result;            

        testReporterName = 'be-awesome';
        testReporter = { be: 'awesome' };

        fakeReporters[testReporterName] = testReporter;

        result = factory.create(testReporterName);

        expect(result).toBe(testReporter);
    });

    it('should return a custom reporter', function create () {
        var testConfiguration,
            result;

        function fakeReporter () {}
        
        result = factory.create(fakeReporter);

        expect(result).toBe(fakeReporter);
    });

    describe('creating plugins', function describeCreatePlugin () {
        var pluginFactory,
            testReporterName;

        beforeEach(function prepareTestData () {
            testReporterName = 'Greenwald';
        });

        beforeEach(function spyPluginFactory () {
            pluginFactory = require('./plugin-factory');

            spyOn(pluginFactory, 'create');
        });

        it('should return a plugin', function create () {
            var fakeReporter,
                result;

            fakeReporter = {
                report: function report () {}
            };

            pluginFactory.create.and.returnValue(fakeReporter);

            // Packaged reporters should be ignored
            fakeReporters[testReporterName] = {};

            result = factory.create(testReporterName);

            expect(pluginFactory.create).toHaveBeenCalledWith('reporter', testReporterName);
            expect(result).toBe(fakeReporter);
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
