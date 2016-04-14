'use strict';
var bdd = require('./jasmine'),
    Reporter = require('../../Reporter');

module.exports = new Reporter({
    report: reportAnalyses
});

function toPassCodeCopterAnalysis() {
    return {
        compare: function compare (analysis) {
            var result = {};
            
            result.pass = analysis.pass;

            if (result.pass) {
                result.message = 'Expected code copter analysis not to pass';
            }
            else {
                result.message = analysis.errors
                    .map(error => `line ${error.line}:\t${error.message}`)
                    .join('\n');
            }

            return result;
        }
    };
}

function reportAnalyses (report) {
    report.analyses.forEach(analysis => reportAnalysis(analysis));
}

function reportAnalysis (analysis) {
    bdd.describe(analysis.target, function describeFileQuality () {
        bdd.beforeEach(function addMatchers () {
            bdd.addMatchers({
                toPassCodeCopterAnalysis: toPassCodeCopterAnalysis
            });
        });

        bdd.it('should pass code copter analysis', function shouldPassMatchers () {
            bdd.expect(analysis).toPassCodeCopterAnalysis();
        });
    });
}
