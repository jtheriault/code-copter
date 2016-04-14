'use strict';
describe('Jasmine reporter', function describeJasmineReporter () {
    var Analysis = require('../../Analysis'),
        bdd = require('./jasmine'),
        beforeEachTarget,
        describeTarget,
        matcher,
        targetShouldPass,
        Report = require('../../Report'),
        reporter = require('.'),
        testAnalysis,
        testReport;

    function reportTestReport () {
        reporter.report(testReport);

        describeTarget();
        beforeEachTarget();
        targetShouldPass();
    }

    beforeEach(function prepareTests () {
        testAnalysis = new Analysis();
        testReport = new Report();
        
        testReport.addAnalysis(testAnalysis);

        spyOn(bdd, 'describe').and.callFake(function captureDescribe (target, callback) { describeTarget = callback; });
        spyOn(bdd, 'beforeEach').and.callFake(function captureBeforeEach (callback) { beforeEachTarget = callback; });
        spyOn(bdd, 'addMatchers').and.callFake(function captureMatcher (obj) { matcher = obj.toPassCodeCopterAnalysis(); });
        spyOn(bdd, 'it').and.callFake(function captureIt(message, callback) { targetShouldPass = callback; });
        spyOn(bdd, 'expect').and.returnValue({ 
            toPassCodeCopterAnalysis: jasmine.createSpy('toPassCodeCopterAnalysis') 
        });
    });

    it('should require a report object?');

    it('should report analysis', function report () {
        reportTestReport();

        expect(bdd.expect).toHaveBeenCalledWith(testAnalysis);
    });

    it('should report multiple analyses');

    describe('matcher', function describeMatcher () {
        it('should be added before each target is tested', function report () {
            reportTestReport();

            expect(bdd.addMatchers).toHaveBeenCalledWith({ toPassCodeCopterAnalysis: jasmine.any(Function) });
        });

        it('should return a passing result for a passing analysis', function compare () {
            var result;

            reportTestReport();
            result = matcher.compare(testAnalysis);

            expect(result.pass).toBe(true);
            expect(result.message).toMatch(/not to pass/);
        });

        it('should return a failing result for a failing analysis', function compare () {
            var result,
                testErrorMessage = 'you dun bad';

            testAnalysis.addError({ 
                line: 0,
                message: testErrorMessage
            });

            reportTestReport();
            result = matcher.compare(testAnalysis);

            expect(result.pass).toBe(false);
            expect(result.message).toMatch(testErrorMessage);
        });
    });
});
