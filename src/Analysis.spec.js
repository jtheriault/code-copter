'use strict';
describe('Analysis', function describeAnalysis () {
    var Analysis = require('./Analysis'),
        analysis,
        validErrorParameters;

    beforeEach(function instantiateAnalysis () {
        analysis = new Analysis();

        validErrorParameters = {
            message: 'Epsilon Rho Rho'
        };
    });

    it('should add an error', function addError () {
        analysis.addError(validErrorParameters);

        expect(analysis.errors[0]).toEqual(jasmine.objectContaining(validErrorParameters));
    });

    it('should require parameters when adding an error', function addError () {
        expect(function addInvalidError () {
            analysis.addError();
        }).toThrow();
    });

    it('should require a message when adding an error', function addError () {
        delete validErrorParameters.message;

        expect(function addInvalidError () {
            analysis.addError(validErrorParameters);
        }).toThrow();
    });

    it('should pass if there are no errors', function pass () {
        expect(analysis.pass).toEqual(true);
    });

    it('should not pass if there are errors', function pass () {
        analysis.addError(validErrorParameters);

        expect(analysis.pass).toEqual(false);
    });

    xit('should return errors ordered by line', function errors () {
        for (let line = 10; line > 0; line--) {
            analysis.addError({ line: line, message: 'order! order!' });
        }
        
        for (let line = 1; line <= 10; line++) {
            expect(analysis.errors[line].line).toEqual(line);
        }
    });
    
    xit('should reference context');

    xit('should not allow modification of structure');
});
