# 2.0 (hard)
Update examples
* reporter plugin is object with methods
* clear/common output
* subpackages for greater accuracy
* etc
Performance tuning
What happened to watch:test?
Unit tests of everything
Remove skipped tests
README
Upgrade dependencies
Set code coverage limit: 100%
Put env vars in package.json config

# 2.0 (soft)
Fail if no analyzers are configured/loaded (can just be reported by the reporter)
Fail if no reporter is configured/loaded (have to throw an exception?)
order errors by line number
Handle errors when walking
Instantiate default JSCS checker once
DRY out reporter and analyzer factories
Integration test from inline analyzer to inline reporter
Revisit main path 
* CQRS style
* separate steps to be more granular (e.g. separate reporting from analyzing)
* have a single instance for worker/command handler
Infer dependencies better
* let the factories know about discovery -- hide impls outside main folder
* the problem with configuration is the confusion of c-c as module and utility
* most configuration is "which," some will be how and needs to get stored with the dependency instance  
jsdocs?

# Roadmap
## Post 2.0
githubio pages

# 2.1
getLines as stream?

# 2.x
Stand-alone executable

## Wish list
* detect analyzers
* detect reporter
* create logger
* working folder
** parent-root
** configure
* configure logger
* configure analzyers
** configuration JSON
** config file names
* Allow analysis of directories (i.e. name, contents)
