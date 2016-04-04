# Reporter Plugin
An example of a reporter plugin which speaks any errors (or overall success) 
and an example host project which uses it.

This module makes use of file path dependencies in package.json to treat local
directories (i.e. code-copter itself and the plugin example) as node modules.

## Dependencies
This uses the [say](https://www.npmjs.com/package/say) npm module which itself
depends on certain OS features for speech sythesis. For full instructions on
enabling those OS features, look at the *say* documentation.

The short version as of this writing that OS X and Windows require no action,
but Linux requires Festival be installed with a command such as:

    sudo apt-get install festival festvox-kallpc16k

## Running
Install code-copter and the plugin

    npm install

Run the "Hello world!" demonstration 

    npm start

Run the code-copter posttest script to analyze and report on the code

    npm test

Feel free to modify [server.js](server.js) to fail JSHint (e.g. remove the
semi-colon) to hear an error message.

## Contents
### Host Project (reporter-plugin)
This node module implements a "Hello world" demonstration and a script to
check code quality with code-copter and report it using the "say" plugin.

* The "Hello world" demonstration is [server.js](server.js)
* The script which runs code-copter is [scripts/code-copter.js](scripts/code-copter.js)

### code-copter-reporter-say
This node module implements an reporter plugin which verbally congratulates you
if your code passes analysis. Otherwise it reads each error aloud.

It depends on code-copter for the Reporter type, although it is not required, to 
ease implementation.
