'use strict';
var walk = require('walk'),
    path = require('path'),
    fs = require('fs'),
    analyzerFactory = require('./analyzer-factory'),
    configuration = require('./configuration');

module.exports = main;

function analyzeFiles (context) {
    function analyzeFile (root, stats, next) {
        var filePath;

        if (path.extname(stats.name) !== '.js') {
            next();
        }
        else {
            filePath = path.join(root, stats.name);

            describe(filePath, function describeFileQuality () {
                beforeEach(function addMatchers () {
                    jasmine.addMatchers(context.analyzers);
                });

                it('should meet source quality standards', function shouldPassMatchers () {
                    var source = fs.readFileSync(filePath, 'utf8');

                    for (let toPassMatcher in context.analyzers) {
                        expect(source)[toPassMatcher]();
                    }

                    next();
                });
            });
        }
    }

    walk.walkSync('.', { 
        filters: context.configuration.exclude,
        listeners: {
            file: analyzeFile
        }
    });
}

function loadAnalyzers (context) {
    var analyzers = [];

    for (let analyzerName in context.configuration.analyzers) {
        let analyzer = analyzerFactory.create(analyzerName, context.configuration.analyzers[analyzerName]);
        
        if (analyzer) {
            analyzers.push(analyzer);
        }
    }

    context.analyzers = analyzers;

    return context;
}

function loadConfiguration (context) {
    context.configuration = configuration.get();

    return context;
}

function main () {
    var context,
        tasks;

    context = {};

    tasks = [
        loadConfiguration,
        loadAnalyzers,
        analyzeFiles
    ].reduce((val, task) => task(val), context);
}
