'use strict';
var walk = require('walk'),
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
    exclude: ['node_modules']
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

/**
 * @deprecated - Support for legacy analyzers-only config param format will be removed in next major version
 *
 * Sets the configuration of how code-copter operates.
 *
 * @param {Object} config - Configuration container. 
 * @param {String[]} config.exclude - Array of file/folder names to exclude from analysis.
 * @param {Object} config.analyzers - Keys of analyzer names; values of enabled boolean or custom implementation.
 */
function configure (config) {
    var analyzers,
        configObj = {};

    if (config.exclude) {
        configObj.exclude = config.exclude;
    }

    if (config.analyzers) {
        configObj.analyzers =  config.analyzers;
    }

    configuration = extend.deeply(configuration, configObj);

    matchers = [];

    for (let analyzerName in configuration.analyzers) {
        let analyzer = analyzerFactory.create(analyzerName, configuration.analyzers[analyzerName]);
        
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
        filters: configuration.exclude,
        listeners: {
            file: assureFileQuality
        }
    });
}
