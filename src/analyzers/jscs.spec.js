'use strict';
describe('JSCS analyzer', function describeJscsAnalyzer () {
    var Analyzer = require('../Analyzer'),
        Analysis = require('../Analysis'),
        FileSourceData = require('../FileSourceData'),
        fs = require('fs'),
        Jscs = require('jscs'),
        jscsAnalyzer = require('./jscs');

    it('should export an analyzer', function shouldExportAnalyzer () {
        expect(jscsAnalyzer).toEqual(jasmine.any(Analyzer));
    });

    it('should produce an analysis from file source data', function analyze () {
        var testFileSourceData;

        testFileSourceData = new FileSourceData({
            text: 'test'
        }); 

        expect(jscsAnalyzer.analyze(testFileSourceData)).toEqual(jasmine.any(Analysis));
    });

    describe('configuration', function describeConfiguration () {
        var fakeCheckStringResult,
            testConfiguration;

        beforeEach(function prepareTestData () {
            fakeCheckStringResult = {
                getErrorList: jasmine.createSpy('getErrorList').and.returnValue([])
            };

            testConfiguration = {
                fakeData: 'oh yeah'
            };

            spyOn(Jscs.prototype, 'configure');
            spyOn(Jscs.prototype, 'checkString').and.returnValue(fakeCheckStringResult);

            spyOn(fs, 'readFileSync');
        });

        it('should use the provided configuration', function configure () {
            jscsAnalyzer.configure(testConfiguration);
            jscsAnalyzer.analyze({});

            expect(Jscs.prototype.configure).toHaveBeenCalledWith(testConfiguration);
        });
        
        it('should error if provided configuration is false', function configure () {
            expect(function callConfigure () {
                jscsAnalyzer.configure(false);
            }).toThrow();
        });
        
        it('should use the configuration from jscsrc', function configure () {
            var mockCwd = '/house/luser',
                expectedPath = mockCwd + '/.jscsrc';

            spyOn(process, 'cwd').and.returnValue(mockCwd);
            fs.readFileSync.and.returnValue(JSON.stringify(testConfiguration));

            jscsAnalyzer.configure(true);
            jscsAnalyzer.analyze({});

            expect(fs.readFileSync).toHaveBeenCalledWith(expectedPath, 'utf8');
            expect(Jscs.prototype.configure).toHaveBeenCalledWith(testConfiguration);
        });

        it('should use default configuration if no file is found', function configure () {
            spyOn(console, 'warn');

            fs.readFileSync.and.throwError();
            
            jscsAnalyzer.configure(true);
            jscsAnalyzer.analyze({});

            expect(console.warn).toHaveBeenCalledWith(jasmine.stringMatching(/.jscsrc/));
            expect(Jscs.prototype.configure).not.toHaveBeenCalled();
        });
    });
});
