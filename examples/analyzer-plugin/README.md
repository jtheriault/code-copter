# Analyzer Plugin
An example of an analyzer plugin which fails for "Hello world" programs and a
host project which uses it.

This module makes use of file path dependencies in package.json to treat local
directories (i.e. code-copter itself and the plugin example) as node modules.

## Running
Install jasmine, code-copter and the plugin

    npm install

Run the "Hello world!" demonstration 

    npm start

Run the example analyzer as a part of the test

    npm test

## Contents
### Host Project (analyzer-plugin)
This node module implements a "Hello world" demonstration and has a jasmine 
spec to check quality with code-copter using the "hell-no-world" plugin.

### code-copter-analyzer-hell-no-world
This node module implements an analyzer plugin which produces an error if it
encounters the phrase "Hello world."

It depends on code-copter for the Analysis and Analyzer types, although these
are not required, to ease implementation.
