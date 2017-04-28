'use strict';

class VamtigerMetaElement {
    get _main() {
        const main = this._vamtigerMetaElement;

        return main;
    }

    get _vamtigerMetaElement() {
        let vamtigerMetaElement = vamtiger._selectedElements.vamtigerMetaElement;

        if (!vamtigerMetaElement) {
            vamtigerMetaElement = document.head.querySelector(this._selector);

            vamtiger._selectedElements.vamtigerMetaElement = vamtigerMetaElement;
        }

        return vamtigerMetaElement;
    }

    get _selector() {
        const selector = 'meta[data-vamtiger]';

        return selector;
    }
}

export default parameters => new VamtigerMetaElement(parameters)._main;