'use strict';
describe('Report', function describeReport () {
    var Analysis = require('./Analysis'),
        Report = require('./Report'),
        report;

    beforeEach(function instantiateAnalysis () {
        report = new Report();
    });

    it('should require instantiation', function constructor () {
        expect(function callReport () {
            /* jshint newcap:false */
            Report();
        }).toThrow();
    });

    it('should not allow modification of structure', function shouldBeSealed () {
        expect(function monkeyPatchReport () {
            report.everythingIsAwesome = true;
        }).toThrow();
    });

    describe('adding an analysis', function describeAddingAnalysis () {
        var testAnalysis;

        beforeEach(function prepareTestAnalysis () {
            testAnalysis = new Analysis();
        });

        it('should add an analysis', function addAnalysis () {
            report.addAnalysis(testAnalysis);

            expect(report.analyses[0]).toEqual(testAnalysis);
        });

        it('should require parameters', function addAnalysis () {
            expect(function addUndefinedAnalysis () {
                report.addAnalysis();
            }).toThrow();
        });

        it('should require an analysis', function addAnalysis () {
            var testAnalysisParameters;

            testAnalysisParameters = JSON.parse(JSON.stringify(testAnalysis));

            expect(function addReportAsAnalysis () {
                report.addAnalysis(testAnalysisParameters);
            }).toThrow();
        });
    });

    it('should pass if analyses pass', function pass () {
        expect(report.pass).toEqual(true);
    });

    it('should not pass if an analysis does not', function pass () {
        var testFailedAnalysis;

        testFailedAnalysis = new Analysis();
        testFailedAnalysis.addError({
            message: 'YOU SHALL NOT PASS!'
        });

        report.addAnalysis(testFailedAnalysis);

        expect(report.pass).toEqual(false);
    });
});

