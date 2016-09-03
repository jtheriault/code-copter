# 2.0 (hard)
Remove skipped tests

# Wish List
Documentation
* Update README
* Code coverage

Logging
* Trace with timestamps to allow performance tuning
* Configure logging verbosity
* Log important events
* Squelch some of the noise that is leaking through right now

Testing
* Increase code coverage
* Integration test from inline analyzer to inline reporter

Build
* Publish from Travis

Error-handling
* Fail if no analyzers are configured/loaded (can just be reported by the reporter)
* Fail if no reporter is configured/loaded (have to throw an exception?)
* Handle errors when walking

Maintenance
* Update node dependencies
* Upgrade to current node LTS

Refactor
* Put env vars in package.json config
* DRY out reporter and analyzer factories
* Break up main execution code
* Enable async execution if reporter and analyzers allow
* Detect analyzers
* Detect reporter

Stand-alone executable

Allow analysis of directories (i.e. name, contents)
