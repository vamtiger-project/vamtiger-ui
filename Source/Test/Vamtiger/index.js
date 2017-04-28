'use strict';

describe('Vamtiger should', function () {
    it('exists as a global variable', function (done) {
        expect(Vamtiger).to.be.ok;
        expect(vamtiger).to.be.ok;
        
        done();
    });
});