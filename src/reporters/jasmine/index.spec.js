'use strict';
describe('Jasmine reporter', function describeJasmineReporter () {
    var Analysis = require('../../Analysis'),
        bdd = require('./jasmine'),
        reporter = require('.');

    it('should report analysis', function report () {
        var describeTarget,
            targetShouldPass,
            testAnalysis;

        spyOn(bdd, 'describe').and.callFake(function captureDescribe (target, callback) { describeTarget = callback; });
        spyOn(bdd, 'it').and.callFake(function captureIt(message, callback) { targetShouldPass = callback; });

        spyOn(bdd, 'expect').and.returnValue({ 
            toPassCodeCopterAnalysis: jasmine.createSpy('toPassCodeCopterAnalysis') 
        });

        testAnalysis = new Analysis();

        reporter.report(testAnalysis);
        describeTarget();
        targetShouldPass();

        expect(bdd.expect).toHaveBeenCalledWith(testAnalysis);
    });

    it('should blah blah blah verify the matcher');
});
