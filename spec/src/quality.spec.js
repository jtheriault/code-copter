'use strict';
describe('Code quality', function describeCodeQuality () {
    var walk = require('walk'),
        path = require('path'),
        fs = require('fs'),
        jshintrcPath = process.cwd() + '/.jshintrc',
        jshintrc, 
        jshint = require('jshint').JSHINT,
        fileMatchers;

    fileMatchers = {
        toPassJshint: function toPassJshint (util, customEqualityTesters) {
            return {
                compare: function compare (actual, expected) {
                    var config = expected || jshintrc,
                        result = { pass: true };

                    jshint(actual, jshintrc);
                    result.pass = jshint.errors.length === 0;

                    if (result.pass) {
                        result.message = 'Expected source not to pass JSHint';
                    }
                    else {
                        result.message = jshint.errors
                            .map(error => `line ${error.line}:\t${error.raw}`)
                            .join('\n');
                    }

                    return result;
                }
            };
        }
    };

    beforeAll(function loadJshintrc (done) {
        fs.readFile(jshintrcPath, 'utf8', function parseJshintrc (error, jshintrcString) {
            if (!error) {
                jshintrc = JSON.parse(jshintrcString);
            }

            done();
        });
    });

    beforeEach(function addFileMatchers () {
        jasmine.addMatchers(fileMatchers);
    });

    it('should meet configured JSHint standards', function shouldPassJsHint (done) {
        var self = this,
            omittedPaths = ['node_modules'],
            walker = walk.walk('.', { filters: omittedPaths });

        walker.on('end', done);
        walker.on('file', function validateFile (root, stats, next) {
            var filePath;
            
            if(path.extname(stats.name) !== '.js') {
                next();
            }
            else {
                filePath = path.join(root, stats.name);

                fs.readFile(filePath, 'utf8', function validateFileSource (error, source) {
                    expect(source).toPassJshint();
                    next();
                });
            }
        });
    });
});
