'use strict';
var proxyquire = require('proxyquire');

describe('Source repository factory', function describeSourceRepositoryFactory () {
    var factory,
        mockRepositories,
        repository,
        testType,
        testConfig;

    function createType () {
        proxyquire.noPreserveCache();

        factory = proxyquire('./source-repository-factory', {
            './source-repositories': mockRepositories
        });

        proxyquire.preserveCache();
        
        repository = factory.create(testType, testConfig);
    }

    beforeEach(function prepareDependencies () {
        mockRepositories = {};
    });

    describe('success', function describeSuccess () {
        var MockRepository;

        beforeEach(function prepareMockRepositories () {
            testType = 'stereotype';
            MockRepository = jasmine.createSpy('Source repository class');
            mockRepositories[testType] = MockRepository;
        });

        it('should return the named source repository', function create () {
            createType(testType);

            expect(repository).toEqual(jasmine.any(MockRepository));
        });

        it('should instantiate the source repository using config', function create () {
            testConfig = 'whatever';

            createType(testType, testConfig);

            expect(MockRepository).toHaveBeenCalledWith(testConfig);
        });
    });

    it('should throw an error for an unknown type', function create () {
        testType = '¯\_(ツ)_/¯';

        expect(createType).toThrow();
    });
});
