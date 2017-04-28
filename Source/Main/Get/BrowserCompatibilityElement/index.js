'use strict';

class BrowserCompatibilityElement {
    get _main() {
        const main = this._browserCompatibilityElement;

        return main;
    }

    get _browserCompatibilityElement() {
        const parent = this._parent,
            selector = this._selector,
            browserCompatibilityElement = parent.querySelector(selector);

        return browserCompatibilityElement
    }

    get _parent() {
        const parent = vamtiger.get.vamtigerMetaElement();
        
        return parent;
    }

    get _selector() {
        const selector = 'meta[data-classification="Browser Compatibility"]';

        return selector;
    }
}

export default parameters => new BrowserCompatibilityElement(parameters)._main;