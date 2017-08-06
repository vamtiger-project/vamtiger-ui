'use strict';

class SetPolyfills {
    constructor() {
        this._unsupportedFeatures = null;
    }
    
    get _main() {
        const main = this._setUnsupportedFeatures
            .then(this._setPolyfillMetaData)
            .then(vamtiger.load.polyfills)
            .catch(this._handleError);

        return main;
    }

    get _setUnsupportedFeatures() {
        return new Promise((resolve, reject) => {
            const unsupportedFeatures = vamtiger.get.unsupportedFeatures();

            this._unsupportedFeatures = unsupportedFeatures;

            resolve();
        });
    }

    get _setPolyfillMetaData() {
        const polyfillParameters = this._unsupportedFeatures
            .map(this._polyfillParams);

        polyfillParameters.forEach(parameters => vamtiger.set.metaData(parameters));
    }

    _polyfillParams(feature) {
        const parameters = {
            classification: 'Browser Polyfill',
            feature,
            state: "initial",
            url: vamtiger.get.polyfillUrl({feature})
        };

        return parameters;
    }

    _handleError(error) {
        return Promise.reject(error);
    }
}

export default parameters => new SetPolyfills(parameters)._main;