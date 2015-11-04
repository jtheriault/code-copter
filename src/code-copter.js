'use strict';
var walk = require('walk'),
    path = require('path'),
    fs = require('fs'),
    report = require('./jasmine'),
    analyzerFactory = require('./analyzer-factory'),
    configuration = require('./configuration');

module.exports = main;

function analyzeFiles (context) {
    // TODO: Un-nest this function
    function analyzeFile (root, stats, next) {
        var filePath = path.join(root, stats.name),
            analysis;
        
        if (path.extname(stats.name) !== '.js') {
            next();
        }
        else {
            analysis = analyzeSource(filePath, context.analyzers);

            report(analysis, next);
        }
    }

    // TODO: Handle errors
    walk.walkSync('.', { 
        filters: context.configuration.exclude,
        listeners: {
            file: analyzeFile
        }
    });
}

function analyzeSource (filePath, analyzers) {
    var source = fs.readFileSync(filePath, 'utf8'),
        analysis = {
            errors: [],
            filePath: filePath,
            pass: true
        };

    for (let analyzer in analyzers) {
        // TODO: Break out of Jasmine idioms
        let result = analyzers[analyzer]().compare(source);

        if (!result.pass) {
            analysis.errors.push({
                line: 1,
                message: result.message
            });
        }
    }

    analysis.pass = analysis.errors.length === 0;

    return analysis;
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

    try {
        tasks = [
            loadConfiguration,
            loadAnalyzers,
            analyzeFiles
        ].reduce((val, task) => task(val), context);
    }
    catch (error) {
        console.error('Could not run code copter analysis due to error', error);
    }
}
