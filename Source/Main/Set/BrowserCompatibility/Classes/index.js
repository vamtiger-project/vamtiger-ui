'use strict';

class Classes {
    constructor() {
        this.result = {
            feature: 'ES 6 Classes'
        };

        this._script = null;

        this._result = null;
    }
    
    get main() {
        const main = this.loadTest
            .then(() => this._result = this._script.dataset)
            .then(() => this._result)
            .catch(this._handleError);

        return main;
    }

    get loadTest() {
        return new Promise((resolve, reject) => {
            let script = document.createElement('script');

            script.dataset.vamtiger = true;
            script.dataset.feature = this.result.feature;
            script.dataset.classification = 'Browser Compatibility';
            script.dataset.browserCompatibility = false;
            
            script.innerHTML = `{
                class Es6ClassCompatibility {
                    constructor() {
                        this._selector = 'script[data-classification="${script.dataset.classification}"][data-feature="${this.result.feature}"]';
                    }
                    
                    main() {
                        const element = this._element,
                            loadEvent = new Event('load');
                        
                        if (element)
                            element.dataset.browserCompatibility = true;

                        element.dispatchEvent(loadEvent);
                    }

                    get _element() {
                        const element = document.querySelector(this._selector);

                        return element
                    }
                }

                const test = new Es6ClassCompatibility();

                test.main();
            }`;

            this._script = script;

            vamtiger.load.script({
                script,
                resolve,
                reject
            });
        });
    }

    _handleError(error) {
        return Promise.reject(error);
    }
}

export default parameters => new Classes(parameters).main;