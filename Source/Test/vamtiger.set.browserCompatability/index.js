'use strict';

describe('vamtiger.set.browserCompatability should check compatibility for', function () {
    it('ES6 Classes', function (done) {
        const selector = `
                [data-classification="Browser Compatibility"]
                    [data-feature="ES 6 Classes"]
            `
            metaElement = document.querySelector(selector);

        expect(metaElement).to.be.ok;

        done();
    });

    it('Web Storage', function (done) {
        const selector = `
                [data-classification="Browser Compatibility"]
                    [data-feature="Web Storage"]
            `
            metaElement = document.querySelector(selector);

        expect(metaElement).to.be.ok;

        done();
    });

    it('Mutation Observer', function (done) {
        const selector = `
                [data-classification="Browser Compatibility"]
                    [data-feature="Mutation Observer"]
            `
            metaElement = document.querySelector(selector);

        expect(metaElement).to.be.ok;

        done();
    });

    it('Custom Elements', function (done) {
        const selector = `
                [data-classification="Browser Compatibility"]
                    [data-feature="Custom Elements"]
            `
            metaElement = document.querySelector(selector);

        expect(metaElement).to.be.ok;

        done();
    });
});