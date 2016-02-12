'use strict';
var walk = require('walk'),
    path = require('path'),
    fs = require('fs');

class FileSystemSourceRepository {
    // Awaiting resolution of https://github.com/jscs-dev/node-jscs/issues/1890
    // jscs:disable
    constructor (configuration) {
        this.exclude = configuration.exclude;
        this.include = ['.js'];
        this.sources = null;
    }

    // Awaiting resolution of https://github.com/jscs-dev/node-jscs/issues/1890
    // jscs:disable
    getAll () {
        if (this.sources === null) {
            this.sources = [];

            // TODO: Handle errors
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
