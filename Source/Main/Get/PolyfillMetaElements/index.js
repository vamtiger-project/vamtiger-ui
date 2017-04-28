'use strict';

class PolyfillMetaElements {
    get _main() {
        const main = this._polyfillMetaElements;

        return main;
    }

    get _polyfillMetaElements() {
        const polyfillMetaElements = Array
            .from(this._polyfillMetaElement.childNodes);

        return polyfillMetaElements;
    }

    get _polyfillMetaElement() {
        const polyfillMetaElement = vamtiger.get.polyfillMetaElement();

        return polyfillMetaElement;
    }
}

export default parameters => new PolyfillMetaElements()._main;