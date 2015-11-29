'use strict';
var walk = require('walk'),
    path = require('path'),
    fs = require('fs');

class FileSystemSourceRepository {
    // jscs:disable
    constructor (configuration) {
        this.exclude = configuration.exclude;
        this.include = ['.js'];
        this.sources = null;
    }

    // TODO: Make this private
    // jscs:disable
    appendSourceFile (root, stats, next) {
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

    // jscs:disable
    getAll () {
        if (this.sources === null) {
            this.sources = [];

            // TODO: Handle errors
            walk.walkSync('.', { 
                filters: this.exclude,
                listeners: {
                    file: this.appendSourceFile.bind(this)
                }
            });
        }

        return this.sources;
    }
}

module.exports = FileSystemSourceRepository;
