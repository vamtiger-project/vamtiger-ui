'use strict';

class PolyfillUrl {
    constructor({feature}) {
        this.feature = feature;
    }

    get _main() {
        const main = this._polyfillUrl;

        return main;
    }

    get _polyfillUrl() {
        const polyfillUrl = 'Js/Polyfill/' + this.feature.replace(' ', '') + '/index.js';

        return polyfillUrl;
    }
}

export default parameters => new PolyfillUrl(parameters)._main;