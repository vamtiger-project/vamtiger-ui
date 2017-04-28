'use strict';

class BrowserCompatibilityWithCustomElements {
    constructor() {
        this.result = {
            feature: 'Custom Elements'
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
                const selector = 'script[data-classification="${script.dataset.classification}"][data-feature="${this.result.feature}"]',
                    element = document.querySelector(selector),
                    loadEvent = new Event('load');

                test()
                    .then(() => element.dataset.browserCompatibility = true)
                    .catch(error => element.dataset.browserCompatibilityError = error.message)
                    .then(() => element.dispatchEvent(loadEvent));

                function test() {
                    return new Promise((resolve, reject) => {
                        const supported = window.customElements && window.customElements.define ? true : false;
                        
                        if (supported)
                            resolve();
                        else
                            reject(new Error('Custom Elements V1 is not supported'));
                    });
                }
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
        throw error;
    }
}

export default parameters => new BrowserCompatibilityWithCustomElements(parameters).main;