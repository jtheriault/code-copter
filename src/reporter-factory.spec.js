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

    it('should return a plugin', function create () {
        var testReporterName = 'Sigmund',
            pluginFactory = require('./plugin-factory');

        spyOn(pluginFactory, 'create');

        factory.create(testReporterName);

        expect(pluginFactory.create).toHaveBeenCalledWith('reporter', testReporterName);
    });
});
