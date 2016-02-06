# Find in files
egrep -nr '\W+TODO\W+.*$' src/

# Bugs:
Instantiate default JSCS checker once

# 2.0 (hard)
Fail if no analyzers are configured/loaded (can just be reported by the reporter)
Fail if no reporter is configured/loaded (have to throw an exception?)
Make custom interfaces consistent with plugins?
Remove TODOs
Update examples
* plugins are objects with methods
* etc
README
Upgrade dependencies

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

# 2.2
Stand-alone executable


# TODO
create logger
working folder
* parent-root
* configure
configure logger
configure analzyers
* configuration JSON
* config file names
Allow analysis of directories (i.e. name, contents)


Features
* jsdocs?
