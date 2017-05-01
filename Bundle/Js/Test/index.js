describe('Vamtiger should', function () {
    it('exists as a global variable', function (done) {
        expect(Vamtiger).to.be.ok;
        expect(vamtiger).to.be.ok;
        
        done();
    });
});

describe('vamtiger.set.browserCompatability should check compatibility for', function () {
    it('ES6 Classes', function (done) {
        const selector = `
                [data-classification="Browser Compatibility"]
                    [data-feature="ES 6 Classes"]
            `;
            metaElement = document.querySelector(selector);

        expect(metaElement).to.be.ok;

        console.log(metaElement);

        done();
    });

    it('Web Storage', function (done) {
        const selector = `
                [data-classification="Browser Compatibility"]
                    [data-feature="Web Storage"]
            `;
            metaElement = document.querySelector(selector);

        expect(metaElement).to.be.ok;

        console.log(metaElement);

        done();
    });

    it('Mutation Observer', function (done) {
        const selector = `
                [data-classification="Browser Compatibility"]
                    [data-feature="Mutation Observer"]
            `;
            metaElement = document.querySelector(selector);

        expect(metaElement).to.be.ok;

        console.log(metaElement);

        done();
    });

    it('Custom Elements', function (done) {
        const selector = `
                [data-classification="Browser Compatibility"]
                    [data-feature="Custom Elements"]
            `;
            metaElement = document.querySelector(selector);

        expect(metaElement).to.be.ok;

        console.log(metaElement);

        done();
    });
});

mocha.run();
