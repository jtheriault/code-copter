[![Build Status](https://travis-ci.org/jtheriault/code-copter.svg)](https://travis-ci.org/jtheriault/code-copter)

## Summary
Code-Copter provides a Jasmine description function which tests each .js file (outside node_modules) and expects it will pass rules:
* configured in .jshintrc
* configured in .jscsrc
* mandating any module loaded via require be referenced as a sibling (e.g. './module-name) or as a global dependency (e.g. 'module-name')

