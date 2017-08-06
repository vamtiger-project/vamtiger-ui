'use strict';

class PolyfillMetaElements {
    get _main() {
        const main = this._polyfillMetaElements;

        return main;
    }

    get _polyfillMetaElements() {
        let polyfillMetaElements = this._polyfillMetaElement;
        
        if (polyfillMetaElements && this._polyfillMetaElement.childNodes)
            polyfillMetaElements = Array.from(polyfillMetaElements.childNodes);
        else
            polyfillMetaElements = [];

        return polyfillMetaElements;
    }

    get _polyfillMetaElement() {
        const polyfillMetaElement = vamtiger.get.polyfillMetaElement();

        return polyfillMetaElement;
    }
}

export default parameters => new PolyfillMetaElements()._main;