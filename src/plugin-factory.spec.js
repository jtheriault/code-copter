'use strict';
describe('Plugin factory', function describePluginFactory () {
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

        factory = proxyquire('./plugin-factory', {
            'parent-require': parentRequireSpy
        });
    });

    it('should return null for an unknown plugin', function create () {
        var plugin;

        parentRequireSpy.and.throwError('what you talkin bout?');

        plugin = factory.create('possibly unknown type', 'unknown plugin');

        expect(plugin).toBe(null);
    });

    it('should return an exact match name module from the parent', function create () {
        expectedPluginName = testPluginName;
        
        plugin = factory.create('ignore me', testPluginName);

        expect(parentRequireSpy).toHaveBeenCalledWith(expectedPluginName);
        expect(plugin).toBe(fakeModule);
    });

    it('should prefer a prefixed name match from the parent', function create () {
        var testPluginType = 'test';

        expectedPluginName = `code-copter-${testPluginType}-${testPluginName}`;

        plugin = factory.create(testPluginType, testPluginName);

        expect(parentRequireSpy).toHaveBeenCalledWith(expectedPluginName);
        expect(parentRequireSpy.calls.count()).toEqual(1);
        expect(plugin).toBe(fakeModule);
    });
});
