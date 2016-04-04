'use strict';
var Reporter = require('../Reporter');

module.exports = new Reporter({
    report: reportAnalysis
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

function reportAnalysis (analysis) {
    describe(analysis.target, function describeFileQuality () {
        beforeEach(function addMatchers () {
            jasmine.addMatchers({
                toPassCodeCopterAnalysis: toPassCodeCopterAnalysis
            });
        });

        it('should pass code copter analysis', function shouldPassMatchers () {
            expect(analysis).toPassCodeCopterAnalysis();
        });
    });
}
