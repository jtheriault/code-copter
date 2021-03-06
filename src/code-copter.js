'use strict';
var sourceRepositoryFactory = require('./source-repository-factory'),
    reporterFactory = require('./reporter-factory'),
    analyzerFactory = require('./analyzer-factory'),
    configuration = require('./configuration'),
    Analysis = require('code-copter-sdk').Analysis,
    FileSourceData = require('code-copter-sdk').FileSourceData,
    Report = require('code-copter-sdk').Report;

module.exports = main;

function analyzeSource (source) {
    /* jshint validthis:true */
    var analysis = new Analysis({
            target: source.location
        }),
        fileSourceData;

    fileSourceData  = new FileSourceData({
        text: source.getLines()
    });

    for (let analyzer of this.analyzers) {
        let result = analyzer.analyze(fileSourceData);

        for (let error of result.errors) {
            analysis.addError({
                line: error.line,
                message: `${error.message} [${analyzer.name}]`
            });
        }
    }

    return analysis;
}

function analyzeSourceList (context) {
    var report = new Report();

    for (let source of context.sourceList) {
        report.addAnalysis(analyzeSource.call(context, source));
    }

    return report;
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

function report (analysisReport) {
    /* jshint validthis:true */
    this.reporter.report(analysisReport);
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
            analyzeSourceList,
            report
        ].reduce((val, task) => task.bind(context)(val), context);
    }
    catch (error) {
        console.error('Could not run code copter analysis due to error', error);
    }
}
