'use strict';
module.exports = toOnlyRequirePeers;

/**
 * 
 */
function toOnlyRequirePeers () {
    return {
        compare: function compare (actual) {
            var result = { pass: true },
                errors;

            // TODO: Capture line number
            errors = (actual.match(/require\((['"])\..*?\1\)/g) || [])
                .filter(fileRequire => fileRequire.match(/\./g).length > 1 || fileRequire.match(/\//g).length > 1)
                .map(statement => `Requiring non-peer, non-package module: ${statement}`);
                
            result.pass = errors.length === 0;

            if (result.pass) {
                result.message = 'Expected source to require peer modules';
            }
            else {
                result.message = errors
                    .join('\n');
            }

            return result;
        }
    };
}
