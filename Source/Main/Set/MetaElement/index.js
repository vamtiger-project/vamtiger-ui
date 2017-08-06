'use strict';

class SetVamtigerMetaElement {
    constructor() {
        this._vamtigerMetaElement = null;
    }
    
    get _main() {
        const main = this._setVamtigerMetaElement
            .then(() => this._loadVamtigerMetaElement)
            .catch(this._handleError);

        return main;
    }

    get _setVamtigerMetaElement() {
        return new Promise((resolve, reject) => {
            let vamtigerMetaElement = document.head.querySelector(this._selector);

            if (!vamtigerMetaElement) {
                vamtigerMetaElement = this._newVamtigerMetaElement;

                this._vamtigerMetaElement = vamtigerMetaElement;
                
                resolve();
            }
        });
    }

    get _loadVamtigerMetaElement() {
        const vamtigerMetaElement = this._vamtigerMetaElement,
            lastMetaElement = vamtigerMetaElement ? this._lastMetaElement : null,
            referenceElement = lastMetaElement ? lastMetaElement.nextElementSibling : null,
            parent = document.head,
            vamtigerMetaElementShouldBeLoaded = vamtigerMetaElement ? true : false,
            vamtigerMetaElementShouldBeInserted = vamtigerMetaElementShouldBeLoaded && referenceElement ? true : false,
            vamtigerMetaElementShouldBeAppended = vamtigerMetaElementShouldBeLoaded && !referenceElement ? true : false;

        if (vamtigerMetaElementShouldBeInserted)
            parent.insertBefore(
                vamtigerMetaElement,
                referenceElement
            );
        else if (vamtigerMetaElementShouldBeAppended)
            parent.appendChild(vamtigerMetaElement);
    }

    get _newVamtigerMetaElement() {
        const newVamtigerMetaElement = document.createElement('meta');

        newVamtigerMetaElement.dataset.vamtiger = true;
        newVamtigerMetaElement.dataset.name = 'Vamtiger Meta Element';

        return newVamtigerMetaElement;
    }

    get _lastMetaElement() {
        const selector = 'meta:last-of-type',
            lastMetaElement = document.head.querySelector(selector);

        return lastMetaElement;
    }

    _handleError(error) {
        return Promise.reject(error);
    }
}

export default parameters => new SetVamtigerMetaElement(parameters)._main;