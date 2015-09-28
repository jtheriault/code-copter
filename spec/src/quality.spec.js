describe('Code quality', function describeCodeQuality () {
    var walk = require('walk'),
        path = require('path'),
        fs = require('fs'),
        jshintrcPath = process.cwd() + '/.jshintrc',
        jshintrc, 
        jshint = require('jshint').JSHINT;

    beforeAll(function loadJshintrc (done) {
        fs.readFile(jshintrcPath, 'utf8', function parseJshintrc (error, jshintrcString) {
            if (!error) {
                jshintrc = JSON.parse(jshintrcString);
            }

            done();
        });
    });

    it('should meet configured JSHint standards', function shouldPassJsHint (done) {
        var self = this,
            omittedPaths = ['node_modules'],
            walker = walk.walk('.', { filters: omittedPaths });

        walker.on('end', done);
        walker.on('file', function validateFile (root, stats, next) {
            var filePath;
            
            if(path.extname(stats.name) !== '.js') {
                next();
            }
            else {
                filePath = path.join(root, stats.name);

                fs.readFile(filePath, 'utf8', function validateFileSource (error, source) {
                    jshint(source, jshintrc);
                    jshint.errors.forEach(function expectNoError (error) {
                        // TODO: Custom matcher https://jasmine.github.io/2.0/custom_matcher.html
                        expect(error).not.toBeDefined();
                    });

                    next();
                });
            }
        });
    });
});
