'use strict';
var fileMatchers = [
    require('./jshint'),
    require('./jscs')
];

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
