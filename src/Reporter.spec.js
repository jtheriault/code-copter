'use strict';
describe('Reporter type', function describeReporterType () {
    var Reporter = require('./Reporter'),
        reporter,
        validParameters;

    function instantiateReporter () {
        reporter = new Reporter(validParameters);
    }

    beforeEach(function prepareTestData () {
        validParameters = {
            report: jasmine.createSpy('report')
        };
    });

    it('should be exported', function shouldBeExported () {
        expect(Reporter).toBeDefined();
        expect(Reporter).toEqual(jasmine.any(Function));
    });

    it('should instantiate with required parameters', function constructor () {
        expect(instantiateReporter).not.toThrow();
        expect(reporter).toEqual(jasmine.objectContaining(validParameters));
    });

    it('should require instantiation', function constructor () {
        expect(function callReporter () {
            /* jshint newcap:false */
            Reporter(validParameters);
        }).toThrow();
    });

    it('should not allow modification of structure', function shouldBeSealed () {
        instantiateReporter();

        expect(function monkeyPatchReporter () {
            reporter.whatever = 'I want';
        }).toThrow();
    });

    it('should require parameters', function constructor () {
        validParameters = undefined;

        expect(instantiateReporter).toThrow();
    });

    it('should require report function parameter', function constructor () {
        delete validParameters.report;

        expect(instantiateReporter).toThrow();
    });
});
