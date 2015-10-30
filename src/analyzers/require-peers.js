'use strict';
/**
 * @deprecated - require-peers will not be a packaged analyzer after the next major release. Please use the code-copter-analyzer-shortrequire module (https://www.npmjs.com/package/code-copter-analyzer-shortrequire)
 */
module.exports = toOnlyRequirePeers;

// TODO: Clean and optimize this clumsy thing
function checkLine (line, lineIndex) {
    var status = {
            hasError: false,
            line: lineIndex + 1
        },
        requireStatement;

    requireStatement = line.match(/require\((['"])\..*?\1\)/);

    if (requireStatement !== null) {
        if (requireStatement[0].match('\\W\\.\\./') || requireStatement[0].match(/\//g).length > 1) {
            status.hasError = true;
            status.message = `${requireStatement[0]} references another directory`;
        }
    }

    return status;
}

/**
 * 
 */
function toOnlyRequirePeers () {
    return {
        compare: function compare (actual) {
            var result = { pass: true },
                errors;

            // TODO: Capture line number
            errors = actual.split('\n')
                .map(checkLine)
                .filter(status => status.hasError)
                .map(error => `line ${error.line}:\t${error.message}`);
                
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
