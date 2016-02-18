'use strict';
describe('Analyzer type', function describeAnalyzerType () {
    var Analyzer = require('./Analyzer'),
        validParameters;

    beforeEach(function prepareTestData () {
        validParameters = {
            analyze: jasmine.createSpy('analyze'),
            name: 'test analyzer'
        };
    });

    it('should be exported', function shouldBeExported () {
        expect(Analyzer).toBeDefined();
        expect(Analyzer).toEqual(jasmine.any(Function));
    });

    it('should instantiate with required parameters', function constructor () {
        var analyzer;

        expect(function instantiateAnalyzer () {
            analyzer = new Analyzer(validParameters);
        }).not.toThrow();

        expect(analyzer).toEqual(jasmine.objectContaining(validParameters));
    });

    it('should require instantiation', function constructor () {
        expect(function callAnalyzer () {
            /* jshint newcap:false */
            Analyzer(validParameters);
        }).toThrow();
    });

    it('should not allow modification of structure', function shouldBeSealed () {
        var analyzer = new Analyzer(validParameters);
        
        expect(function monkeyPatchAnalyzer () {
            analyzer.isAwesome = true;
        }).toThrow();
    });

    it('should require parameters', function constructor () {
        expect(function instantiateAnalyzer () {
            new Analyzer();
        }).toThrow();
    });

    it('should require analyze function parameter', function constructor () {
        delete validParameters.analyze;

        expect(function instantiateAnalayzer () {
            new Analyzer(validParameters);
        }).toThrow();
    });

    it('should require name parameter', function constructor () {
        delete validParameters.name;

        expect(function instantiateAnalayzer () {
            new Analyzer(validParameters);
        }).toThrow();
    });
});
