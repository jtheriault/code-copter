'use strict';
var fileMatchers = [
    require('./jshint'),
    require('./jscs'),
    require('./require-peers')
];

/**
 * Gets file matchers as an object map of the names to their functions.
 */
function getFileMatcherObjectMap () {
    return fileMatchers.reduce(
        (prev, current) => { 
            prev[current.name] = current; 
            return prev; 
        },
        {}
    );
}

module.exports = getFileMatcherObjectMap(); 
