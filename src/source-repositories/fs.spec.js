'use strict';
var fs = require('fs'),
    path = require('path'),
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
    });

    it('should fail if exclude is not an array', function constructor () {
        var testConfiguration;

        testConfiguration = {
            exclude: 'it\'s bad!'
        };

        expect(function createRepository () {
            new Repository(testConfiguration);
        }).toThrow();
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

    it('should read files when getting source lines', function getLines () {
        var mockLines,
            repository,
            result,
            testLocation;

        mockLines = 'file contents';
        testLocation = testSourceValid.filename;

        spyOn(fs, 'readFileSync').and.returnValue(mockLines);

        repository = new Repository({});
        result = repository.getAll();

        expect(result[0].getLines()).toEqual(mockLines);
        expect(fs.readFileSync).toHaveBeenCalledWith(jasmine.stringMatching(testLocation), 'utf8');
    });

    it('should ignore non-js files', function getAll () {
        var repository,
            result;

        testSources.push({
            directory: testSourceValid.directory,
            filename: 'perfectly-safe-script.sh'
        });

        repository = new Repository();
        result = repository.getAll();

        expect(result.some(r => r.location.match(/.sh$/))).toBeFalsy();
    });
});
