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

To integrate an analyzer plugin with Code-Copter, install it as a dependency of your project:

    npm install --save-dev code-copter-analyzer-example

and then enable it by name, excluding the prefix, when configuring Code-Copter:

    codeCopter.configure({
        analyzers: {
            example: true
        }
    });

In this example, the default analyzers will still be enabled.

**Relevant examples**:

* [analyzer-plugin demo](examples/analyzer-plugin/spec/quality.spec.js) - Spec in a demo project configuring code-copter to use a custom analyzer plugin

### Integrating a reporter plugin

To integrate a reporter plugin with Code-Copter, install it as a dependency of your project:

    npm install --save-dev code-copter-reporter-example

and then enable it by name, excluding the prefix, when configuring Code-Copter:

    codeCopter.configure({
        reporter: 'example'
    });

How Code-Copter is run then depends on the reporter. For example, the default Jasmine reporter
expects Jasmine to manage executing the tests, so Code-Copter is passed as a callback to a 
Jasmine describe function. 

However a reporter may be invoked by Code-Copter directly. In cases like that, you would simply call
Code-Copter as a function:

    codeCopter();

**Relevant examples**:

* [reporter-plugin demo](examples/reporter-plugin/scripts/code-copter.js) - Script in a demo project configuring code-copter to use a custom reporter plugin

### Defining a custom analyzer

A defining a custom analyzer is as simple as writing a single function.

An analyzer function takes a [FileSourceData](https://github.com/jtheriault/code-copter-sdk#filesourcedata) object which 
can be iterated over to get samples of each line with their text and line number:

    function noTodo (fileSourceData) {
        var errors = [];
        
        for (let sample of fileSourceData) {
            let line = sample.line,
                text = sample.text;
            
            // ...
        }
    }

with this information, you can perform whatever analysis you need on the lines of all included code files:
    
    if (text.indexOf('// TODO:') !== -1) {
        // ...
    }

accumulate any errors that you find:

    errors.push({
        line: line,
        message: 'Found work to do: ' + text
    });

and return an object with your errors array:

    return {
        errors: errors
    };

Finally you have to configure Code-Copter to use your custom analyzer:

    codeCopter.configure({
        analyzers: {
            disallowTodo: noTodo
        }
    });

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

If there is an improvement you would like to make, or seen made, please:

1. check the [existing issues](https://github.com/jtheriault/code-copter/issues), and file one if you don't find it
1. if there is some activity you would like to see on an issue, whether to endorse it or claim it, please leave a comment
1. if you've addressed an issue, submit a pull request from a topic branch

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
 
