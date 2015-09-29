'use strict';
describe('Code quality', function describeCodeQuality () {
    var walk = require('walk'),
        path = require('path'),
        fs = require('fs'),
        fileMatchers = require('./file-matchers');

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
                    expect(source).toPassJSHint();
                    next();
                });
            }
        });
    });
});
