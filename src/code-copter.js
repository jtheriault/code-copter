'use strict';
var walk = require('walk'),
    omittedPaths = ['node_modules'],
    path = require('path'),
    fs = require('fs'),
    analyzerFactory = require('./analyzer-factory'),
    extend = require('./extend'),
    configuration,
    matchers;

module.exports = describeSource;
module.exports.configure = configure;

configuration = {
    analyzers: {
        jscs: true,
        jshint: true
    },
    exclude: omittedPaths
};

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
                jasmine.addMatchers(matchers);
            });

            it('should meet source quality standards', function shouldPassSourceMatchers () {
                var source = fs.readFileSync(filePath, 'utf8');

                for (let toPassFileMatcher in matchers) {
                    expect(source)[toPassFileMatcher]();
                }

                next();
            });
        });
    }
}

function configure (config) {
    var analyzers,
        configObj = {};

    configObj.exclude = config.exclude ? config.exclude : omittedPaths;
    configObj.analyzers = config.analyzers ? config.analyzers : config;

    configuration = extend.deeply(configuration, configObj);

    omittedPaths = configuration.exclude;
    analyzers = configuration.analyzers;

    matchers = [];

    for (let analyzerName in analyzers) {
        let analyzer = analyzerFactory.create(analyzerName, analyzers[analyzerName]);
        
        if (analyzer) {
            matchers.push(analyzer);
        }
    }
}

/**
 * Walk all included paths and assure the quality of the source based on the
 * configured matchers.
 */
function describeSource () {
    walk.walkSync('.', { 
        filters: omittedPaths,
        listeners: {
            file: assureFileQuality
        }
    });
}
