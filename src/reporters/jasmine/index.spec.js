'use strict';
describe('Jasmine reporter', function describeJasmineReporter () {
    var Analysis = require('../../Analysis'),
        bdd = require('./jasmine'),
        describeTarget,
        targetShouldPass,
        reporter = require('.'),
        testAnalysis;

    beforeEach(function captureCallbacks () {
        testAnalysis = new Analysis();

        spyOn(bdd, 'describe').and.callFake(function captureDescribe (target, callback) { describeTarget = callback; });
        spyOn(bdd, 'it').and.callFake(function captureIt(message, callback) { targetShouldPass = callback; });
    });

    it('should report analysis', function report () {
        spyOn(bdd, 'expect').and.returnValue({ 
            toPassCodeCopterAnalysis: jasmine.createSpy('toPassCodeCopterAnalysis') 
        });

        reporter.report(testAnalysis);
        describeTarget();
        targetShouldPass();

        expect(bdd.expect).toHaveBeenCalledWith(testAnalysis);
    });

    describe('matcher', function describeMatcher () {
        var beforeEachTarget,
            matcher;

        beforeEach(function captureCallbacks () {
            spyOn(bdd, 'beforeEach').and.callFake(function captureBeforeEach (callback) { beforeEachTarget = callback; });
            spyOn(bdd, 'addMatchers').and.callFake(function captureMatcher (obj) { matcher = obj.toPassCodeCopterAnalysis(); });
            spyOn(bdd, 'expect').and.returnValue({ 
                toPassCodeCopterAnalysis: jasmine.createSpy('toPassCodeCopterAnalysis') 
            });
        });

        it('should be added before each target is tested', function report () {
            describeTarget();
            beforeEachTarget();

            expect(bdd.addMatchers).toHaveBeenCalledWith({ toPassCodeCopterAnalysis: jasmine.any(Function) });
        });

        it('should return a passing result for a passing analysis', function compare () {
            var result;

            reporter.report(testAnalysis);
            describeTarget();
            beforeEachTarget();
            targetShouldPass();

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

            reporter.report(testAnalysis);
            describeTarget();
            beforeEachTarget();
            targetShouldPass();

            result = matcher.compare(testAnalysis);

            expect(result.pass).toBe(false);
            expect(result.message).toMatch(testErrorMessage);
        });
    });
});
