# Code-Copter

[![Build Status](https://travis-ci.org/jtheriault/code-copter.svg)](https://travis-ci.org/jtheriault/code-copter)
[![Dependencies](https://david-dm.org/jtheriault/code-copter.svg)](https://david-dm.org/jtheriault/code-copter)
[![Downloads](https://img.shields.io/npm/dt/code-copter.svg)](https://npmjs.com/package/code-copter)
[![Current Version](https://img.shields.io/npm/v/code-copter.svg)](https://npmjs.com/package/code-copter)

## Summary
Code-Copter is a pluggable framework for analyzing code and reporting problems.

Out of the box this allows you to **run JSHint and JSCS in a single pass and report the results through a jasmine test suite**.

More powerfully it allows you to apply custom rules through [plugins](https://npmjs.com/search?q=code-copter-analyzer) or analyzers you supply in-line within your project.

## Usage
Everything described here can be seen in action within the examples folder. 
After browsing the code, to see them run use the following command (requires bash):

    npm run examples

### Integrating JSHint and/or JSCS with Jasmine

To quickly get started using JSHint and JSCS with the Jasmine, ensure you have
.jshintrc and .jscsrc files in your project root then require Code-Copter into 
a spec file and pass it as the callback to a describe function call:

    var codeCopter = require('code-copter');

    describe('Code style', codeCopter);

How to use JSHint or JSCS can be overriden by configuring Code-Copter before 
passing it to the describe function:

    var codeCopter = require('code-copter');

    codeCopter.configure({
        analyzers: {
            // Disable the JSCS analyzer
            jscs: false,

            // Explicitly enable the JSHint analyzer
            jshint: true
        }
    });

Objects configuring the individual analyzer (e.g. the contents of .jscsrc) as
well as a toggling boolean can be passed.  See the section on 
[Configuration](#Configuration) for more details.

**Relevant examples**:

* [simple](examples/simple.spec.js) - Default configuration, integrated with Jasmine
* [partial-configure](examples/partial-configure.spec.js) - Overriding specific defaults
* [analyzer-toggle](examples/analyzer-toggle.spec.js) - Overriding defaults for analyzers
* [reporter-named](examples/reporter-named.spec.js) - Expliciting specifying reporter


### Integrating an analyzer plugin

**Relevant examples**:

* [analyzer-plugin demo](examples/analyzer-plugin/spec/quality.spec.js) - Spec in a demo project configuring code-copter to use a custom analyzer plugin

### Integrating a reporter plugin

**Relevant examples**:

* [reporter-plugin demo](examples/reporter-plugin/scripts/code-copter.js) - Script in a demo project configuring code-copter to use a custom reporter plugin

### Defining a custom analyzer

**Relevant examples**:

* [analyzer-inline](examples/analyzer-inline.spec.js) - Providing a function to include in analysis and reporting

### Defining a custom reporter

**Relevant examples**:

* [reporter-inline](examples/reporter-inline.spec.js) - Providing a function to handle reporting instead

### Writing an analyzer plugin

**Relevant examples**:

* [analyzer-plugin](examples/analyzer-plugin/README.md) - Analyzer plugin and a demonstration project

### Writing a reporter plugin

**Relevant examples**:

* [reporter-plugin](examples/reporter-plugin/README.md) - Reporter plugin and a demonstration project

## Configuration

Code-Copter accepts configuration choosing analyzers, choosing a reporter and
excluding files and folders from analysis.

## Contributing

This is the core project, and the aim is to keep as much analyzing, reporting 
(and eventually source-loading) specifics out and focus on the engine that ties
them all together.

* check the issues, file it
* comment on the issue
* pull request in a topic branch

### Plugins

If there is an analyzer or reporter you would like to add, create a plugin
and make it discoverable with the keyword *code-copter-analyzer* or 
*code-copter-reporter*.  Don't forget to name code-copter v2 as a peer
dependency in your package.json.

Plugins which implement one of a few of the most popular analyzers or reporters
are welcome as dependencies of the core project. Those must use the
[code-copter-sdk](https://github.com/jtheriault/code-copter-sdk) and should
follow the contriubtion procedure above.

## I just want to see if my JSHint, JSCS, etc rules are being applied

Then you don't really need Code-Copter.

If you only want to check one ruleset with a pre-existing tool and fail your
test run, execute following command (replace jshint for jscs or eslint if
appropriate):

    npm install --save-dev jshint
    
and add the following to the scripts block of your package.json

    "pretest": "jshint"

Now your tests won't even run if the code doesn't pass linting first.

### Thank you

You're welcome.

When you decide there's a rule you'd like that those tools don't cover, I hope
you'll come back and give code-copter a try.
 
