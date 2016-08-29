'use strict';
var assert = require('assert'),
    fs = require('fs'),
    path = require('path'),
    walk = require('walk');

class FileSystemSourceRepository {
    // Awaiting resolution of https://github.com/jscs-dev/node-jscs/issues/1890
    // jscs:disable disallowAnonymousFunctions
    constructor (configuration) {
        this.exclude = (configuration && configuration.exclude) ? configuration.exclude : [];
        this.include = ['.js'];
        this.sources = null;

        assert(Array.isArray(this.exclude), 'Configuration for exclude must be an array if it is provided');
    }

    // Awaiting resolution of https://github.com/jscs-dev/node-jscs/issues/1890
    // jscs:disable disallowAnonymousFunctions
    getAll () {
        if (this.sources === null) {
            this.sources = [];

            walk.walkSync('.', { 
                filters: this.exclude,
                listeners: {
                    file: appendSourceFile.bind(this)
                }
            });
        }

        return this.sources;
    }
}

function appendSourceFile (root, stats, next) {
    /*jshint validthis:true */
    var filePath = path.join(root, stats.name);
    
    if (this.include.indexOf(path.extname(stats.name)) !== -1) {
        this.sources.push({
            getLines: function getLines () {
                return fs.readFileSync(this.location, 'utf8');
            },
            location: filePath
        });
    }

    next();
}

module.exports = FileSystemSourceRepository;
