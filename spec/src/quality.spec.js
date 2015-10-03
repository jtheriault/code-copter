'use strict';
var walk = require('walk'),
    omittedPaths = ['node_modules'],
    path = require('path'),
    fs = require('fs'),
    fileMatchers = require('./file-matchers');

/**
 * Assures the quality of the specified file using available file matchers with
 * the Jasmine testing framework.
 *
 * @param {String} root - The folder path of the file.
 * @param {Object } stats - The "fs" stats of the file to quality check.
 * @param {Function} next - The callback to continue to exit and proceed.
 */
function assureFileQuality (root, stats, next) {
    var filePath;

    if (path.extname(stats.name) !== '.js') {
        next();
    }
    else {
        filePath = path.join(root, stats.name);

        describe(filePath, function describeFileQuality () {
            beforeEach(function addFileMatchers () {
                jasmine.addMatchers(fileMatchers);
            });

            it('should meet source quality standards', function shouldPassSourceMatchers () {
                var source = fs.readFileSync(filePath, 'utf8');

                for (let toPassFileMatcher in fileMatchers) {
                    expect(source)[toPassFileMatcher]();
                }

                next();
            });
        });
    }
}

walk.walkSync('.', { 
    filters: omittedPaths,
    listeners: {
        file: assureFileQuality
    }
});
