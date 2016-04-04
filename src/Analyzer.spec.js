'use strict';
describe('Analyzer type', function describeAnalyzerType () {
    var Analyzer = require('./Analyzer'),
        analyzer,
        validParameters;

    function instantiateAnalyzer () {
        analyzer = new Analyzer(validParameters);
    }

    beforeEach(function prepareTestData () {
        validParameters = {
            analyze: jasmine.createSpy('analyze'),
            configure: jasmine.createSpy('configure'),
            name: 'test analyzer'
        };
    });

    it('should be exported', function shouldBeExported () {
        expect(Analyzer).toBeDefined();
        expect(Analyzer).toEqual(jasmine.any(Function));
    });

    it('should instantiate with required parameters', function constructor () {
        expect(instantiateAnalyzer).not.toThrow();

        expect(analyzer).toEqual(jasmine.objectContaining(validParameters));
    });

    it('should require instantiation', function constructor () {
        expect(function callAnalyzer () {
            /* jshint newcap:false */
            Analyzer(validParameters);
        }).toThrow();
    });

    it('should not allow modification of structure', function shouldBeSealed () {
        instantiateAnalyzer();
        
        expect(function monkeyPatchAnalyzer () {
            analyzer.isAwesome = true;
        }).toThrow();
    });

    it('should require parameters', function constructor () {
        validParameters = undefined;

        expect(instantiateAnalyzer).toThrow();
    });

    it('should require analyze function parameter', function constructor () {
        delete validParameters.analyze;

        expect(instantiateAnalyzer).toThrow();
    });

    it('should require name parameter', function constructor () {
        delete validParameters.name;

        expect(instantiateAnalyzer).toThrow();
    });

    describe('default configuration', function describeConfiguration () {
        beforeEach(function instantiateDefaultConfiguredAnalyzer () {
            delete validParameters.configure;

            instantiateAnalyzer();
        });

        it('should not throw an error', function configure () {
            expect(analyzer.configure).not.toThrow();
        });

        it('should error if configuration is disabled', function configure () {
            expect(function disableConfiguration () {
                analyzer.configure(false);
            }).toThrow();
        });
    });
});
