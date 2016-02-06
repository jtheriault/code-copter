# Find in files
egrep -nr '\W+TODO\W+.*$' src/

# Bugs:
Instantiate default JSCS checker once

# 2.0 (hard)
Prefer plugins over packaged implementations (allow people to get away from stale JSCS, Jasmine, JSHint versions)
* reporters
Fail if no analyzers are configured/loaded
Fail if no reporter is configured/loaded
README
Upgrade dependencies
Remove TODOs
Update examples
* plugins are objects with methods
* etc

# 2.0 (soft)
order errors by line number
Handle errors when walking
Put env vars in package.json config
Infer dependencies better
* let the factories know about discovery -- hide impls outside main folder
* the problem with configuration is the confusion of c-c as module and utility
* most configuration is "which," some will be how and needs to get stored with the dependency instance  
DRY out reporter and analyzer factories
Defined architecture

## Testing
Unit tests of everything
Set code coverage limit: 100%
Integration test from custom analyzer to custom reporter

Plan these (in case they would cause breaking changes)
* detect analyzers
* detect reporter

# Post 2.0
githubio pages

# 2.1
getLines as stream?


# TODO
create logger
working folder
* parent-root
* configure
configure logger
configure analzyers
* configuration JSON
* config file names
Directory checking
Clean up analyzer factory (feels clunky)


Features
* jsdocs?
