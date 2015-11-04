'use strict';
module.exports = reportAnalysis;

function toBePassingCodeCopterAnalysis() {
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

function reportAnalysis (analysis, callback) {
    describe(analysis.filePath, function describeFileQuality () {
        beforeEach(function addMatchers () {
            jasmine.addMatchers({
                toBePassingCodeCopterAnalysis: toBePassingCodeCopterAnalysis
            });
        });

        it('should pass code copter analysis', function shouldPassMatchers () {
            expect(analysis).toBePassingCodeCopterAnalysis();

            callback();
        });
    });
}
