'use strict';
var sourceRepositoryFactory = require('./source-repository-factory'),
    reporterFactory = require('./reporter-factory'),
    analyzerFactory = require('./analyzer-factory'),
    configuration = require('./configuration'),
    Analysis = require('./Analysis');

module.exports = main;

function analyzeSourceList (context) {
    context.sourceList.forEach(analyzeSource.bind(context));
}

function analyzeSource (source) {
    /* jshint validthis:true */
    var analysis = new Analysis({
            target: source.location
        });

    for (let analyzer of this.analyzers) {
        let result = analyzer.analyze(source.getLines());

        for (let error of result.errors) {
            analysis.addError({
                line: error.line,
                message: `${error.message} [${analyzer.name}]`
            });
        }
    }

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
