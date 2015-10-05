'use strict';
module.exports = toOnlyRequirePeers;

/**
 * 
 */
function toOnlyRequirePeers () {
    return {
        compare: function compare (actual, expected) {
            var result = { pass: true },
                errors;

            errors = 
                // All local file requires
                (actual.match(/require\((['"])\..*?\1\)/g) || [])
                // Catch any up/down-directory requires
                .filter(fileRequire => fileRequire.match(/\./g).length > 1 || fileRequire.match(/\//g).length > 1)
                .map(statement => `Requiring non-peer, non-package module: ${statement}`);
                
            result.pass = errors.length === 0;

            if (result.pass) {
                result.message = 'Expected source to require peer modules';
            }
            else {
                result.message = errors
                //.map(error => `line ${error.line}:\t${error.message}`)
                    .join('\n');
            }

            return result;
        }
    };
}
