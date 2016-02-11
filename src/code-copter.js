'use strict';
var sourceRepositoryFactory = require('./source-repository-factory'),
    reporterFactory = require('./reporter-factory'),
    analyzerFactory = require('./analyzer-factory'),
    configuration = require('./configuration');

module.exports = main;

function analyzeSourceList (context) {
    context.sourceList.forEach(analyzeSource.bind(context));
}

function analyzeSource (source) {
    var analysis = {
            errors: [],
            pass: true,
            source: source.location
        };

    /* jshint validthis:true */
    for (let i in this.analyzers) {
        /* jshint validthis:true */
        let result = this.analyzers[i](source.getLines());

        if (!result.pass) {
            analysis.errors.push.apply(analysis.errors, result.errors);
        }
    }

    analysis.pass = analysis.errors.length === 0;

    this.reporter(analysis);

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

function loadReporter (context) {
    context.reporter = reporterFactory.create(context.configuration.reporter);

    return context;
}

function loadSourceList (context) {
    context.sourceList = context.sourceRepository.getAll();

    if (context.sourceList.length === 0) {
        throw new Error('No source found');
    }

    return context;
}

function loadSourceRepository (context) {
    var type = context.configuration.source.type,
        config = context.configuration.source;

    context.sourceRepository = sourceRepositoryFactory.create(type, config);

    return context;
}

function main () {
    var context,
        tasks;

    context = {};

    try {
        tasks = [
            loadConfiguration,
            loadSourceRepository,
            loadReporter,
            loadAnalyzers,
            loadSourceList,
            analyzeSourceList
        ].reduce((val, task) => task(val), context);
    }
    catch (error) {
        console.error('Could not run code copter analysis due to error', error);
    }
}
