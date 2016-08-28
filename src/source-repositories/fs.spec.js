'use strict';
var path = require('path'),
    walk = require('walk');

describe('File system source repository', function describeFsSourceRepository () {
    var mockNext,
        Repository = require('./fs'),
        testSourceValid,
        testSources;

    beforeEach(function setupWalkCallback () {
        testSourceValid = {
            directory: '/usr/remote/bin',
            filename: 'rm-rf-root.js'
        };
        testSources = [testSourceValid];

        mockNext = jasmine.createSpy('next');
        
        spyOn(walk, 'walkSync').and.callFake(function fakeWalk (path, options) {
            for (let source of testSources) {
                options.listeners.file(source.directory, { name: source.filename }, mockNext);
            }
        });
    });

    it('should instantiate with defaults', function constructor () {
        var repository = new Repository();

        expect(repository).toEqual(jasmine.objectContaining({
            exclude: [],
            include: ['.js']
        }));
    });

    it('should configure exclude array on instantiation', function constructor () {
        var repository,
            testConfiguration;

        testConfiguration = {
            exclude: ['nothing bad!']
        };

        repository = new Repository(testConfiguration);

        expect(repository.exclude).toEqual(testConfiguration.exclude);

        // TODO: expect non array to fail
    });

    it('should look for all valid sources', function getAll () {
        var testConfiguration = {
                exclude: ['home']
            },
            repository,
            result;

        repository = new Repository(testConfiguration);
        result = repository.getAll();

        expect(walk.walkSync).toHaveBeenCalledWith('.', jasmine.objectContaining({
            filters: testConfiguration.exclude
        }));
    });

    it('should return valid sources', function getAll () {
        var fakeLocation = '/dev/null',
            repository,
            result;

        spyOn(path, 'join').and.returnValue(fakeLocation);

        repository = new Repository({});
        result = repository.getAll();
        
        expect(result.length).toEqual(testSources.length);
        expect(result[0].location).toEqual(fakeLocation);
    });

    xit('should read files when getting source lines', function getLines () {
        fail('untested');
    });

    xit('should ignore non-js files', function getAll () {
        fail('untested');
    });
});
