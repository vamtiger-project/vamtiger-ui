'use strict';

class PolyfillMetaElement {
    get _main() {
        const main = this._polyfillMetaElement;

        return main;
    }

    get _polyfillMetaElement() {
        const polyfillMetaElement = this._vamtigerMetaElement.querySelector(this._selector);

        return polyfillMetaElement;
    }

    get _vamtigerMetaElement() {
        return vamtiger.get.vamtigerMetaElement();
    }

    get _selector() {
        const selector = '[data-classification="Browser Polyfill"]';

        return selector;
    }
}

export default parameters => new PolyfillMetaElement()._main;