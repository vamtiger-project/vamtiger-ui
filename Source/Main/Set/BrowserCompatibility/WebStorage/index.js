'use strict';

class BrowserCompatibilityWebStorage {
    constructor() {
        this.result = {
            feature: 'Web Storage'
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
                        const supported = window.sessionStorage && window.localStorage;
                        
                        if (supported)
                            resolve();
                        else
                            reject(new Error('Web Storage is not supported'));
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
        return Promise.reject(error);
    }
}

export default parameters => new BrowserCompatibilityWebStorage(parameters).main;