'use strict';
describe('Analyzer plugin factory', function describeAnalyzerPluginFactory () {
    var proxyquire = require('proxyquire'),
        factory,
        parentRequireSpy,
        fakeModule = { prop: 'value' },
        testPluginName = 'test plugin',
        expectedPluginName,
        plugin;

    beforeEach(function prepareFactory () {
        fakeModule = { prop: 'value' };
        testPluginName = 'test plugin';

        parentRequireSpy = jasmine.createSpy('parent-require').and.callFake(name => name === expectedPluginName ? fakeModule : null);

        factory = proxyquire('./analyzer-plugin-factory', {
            'parent-require': parentRequireSpy
        });
    });

    it('should return null for an unknown plugin', function create () {
        var plugin;

        parentRequireSpy.and.throwError('what you talkin bout?');

        plugin = factory.create('an unknown plugin');

        expect(plugin).toBe(null);
    });

    it('should return an exact match name module from the parent', function create () {
        expectedPluginName = testPluginName;
        
        plugin = factory.create(testPluginName);

        expect(parentRequireSpy).toHaveBeenCalledWith(expectedPluginName);
        expect(plugin).toBe(fakeModule);
    });

    it('should prefer a prefixed name match from the parent', function create () {
        expectedPluginName = 'code-copter-analyzer-' + testPluginName;

        plugin = factory.create(testPluginName);

        expect(parentRequireSpy).toHaveBeenCalledWith(expectedPluginName);
        expect(parentRequireSpy.calls.count()).toEqual(1);
        expect(plugin).toBe(fakeModule);
    });
});
