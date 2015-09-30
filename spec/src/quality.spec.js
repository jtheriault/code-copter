'use strict';
var walk = require('walk'),
    omittedPaths = ['node_modules'],
    path = require('path'),
    fs = require('fs'),
    fileMatchers = require('./file-matchers');

function assureFileQuality (root, stats, next) {
    var filePath;
    
    if(path.extname(stats.name) !== '.js') {
        next();
    }
    else {
        filePath = path.join(root, stats.name);

        describe(filePath, function describeFileQuality () {
            beforeEach(function addFileMatchers () {
                jasmine.addMatchers(fileMatchers);
            });

            it('should meet source quality standards', function () {
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
