'use strict';

import BrowserCompatibilityWithClasses from './Classes/index.js';
import BrowserCompatibilityWithCustomElements from './CustomElements/index.js';
import BrowserCompatibilityWebStorage from './WebStorage/index.js';
import BrowserCompatibilityWithMutationObserver from './MutationObserver/index.js';

class BrowserCompatibility {
    constructor() {
        this._results = null;
    }
    
    get main() {
        const main = this._testBrowserCompatibility
            .then(vamtiger.remove.browserCompatibilityScripts)
            .then(() => this._setBrowserCompatibility)
            .catch(this._handleError);

        return main;
    }

    get _testBrowserCompatibility() {
        let setBrowserCompatibility = Promise.all([
            BrowserCompatibilityWithClasses(),
            BrowserCompatibilityWebStorage(),
            BrowserCompatibilityWithMutationObserver(),
            BrowserCompatibilityWithCustomElements()
        ]);

        setBrowserCompatibility = setBrowserCompatibility
            .then(results => this._results = results)
            .catch(this._handleError);

        return setBrowserCompatibility;
    }

    get results() {
        return this._results;
    }

    get _setBrowserCompatibility() {
        this.results.forEach(result => vamtiger.set.metaData(result));
    }

    _handleError(error) {
        return Promise.reject(error);
    }
}

export default parameters => new BrowserCompatibility(parameters).main;