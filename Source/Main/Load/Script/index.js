'use strict';

class VamtigerLoad {
    constructor({script, resolve, reject}) {
        this.script = script;
        this.resolve = resolve;
        this.reject = reject;

        this._scriptType = null;
        this._lastElementSelector = null;
        this._lastElement = null;
    }

    get _main() {
        const main = this._setScriptType
            .then(() => this._setLastElementSelector)
            .then(() => this._setLastElement)
            .then(() => this._setSourceUrl)
            .then(() => this._loadScript)
            .catch(this._handleError);

        this.script.dataset.vamtiger = true;

        return main;
    }

    get _setScriptType() {
        return new Promise((resolve, reject) => {
            if (this.script.localName === 'script')
                this._scriptType = 'script';
            else if (this.script.localName === 'link' && this.script.rel === 'stylesheet')
                this._scriptType = 'stylesheet';

            if (this._scriptType)
                resolve();
            else
                reject(new Error('Script type not set'));
        });
    }

    get _setLastElementSelector() {
        const selectors = new Set();

        let selector;

        if (this.script.dataset.classification) {
            selectors.add(`[data-classification="${this.script.dataset.classification}"]:last-of-type`);
            selectors.add(`[data-classification]:last-of-type`);
        }

        selectors.add(`${this.script.localName}:last-of-type`);

        selector = Array
            .from(selectors)
            .join(',\n');

        this._lastElementSelector = selector;
    }

    get _setLastElement() {
        const lastElement = document.head.querySelector(this._lastElementSelector);

        this._lastElement = lastElement;
    }

    get _setSourceUrl() {
        let sourceUrl = this.script.src,
            setSourceUrlToDataUrl = !sourceUrl && this.script.dataset.url;
        
        if (setSourceUrlToDataUrl)
            this.script.src = this.script.dataset.url;
    }

    get _loadScript() {
        const parent = this._lastElement.parentElement,
            referenceElement = this._lastElement.nextElementSibling;

        this.script.addEventListener('load', event => this.resolve(this.script));
        this.script.addEventListener('error', error => this.reject({
            error,
            script: this.script
        }));

        parent.insertBefore(
            this.script,
            referenceElement
        );
    }

    _handleError(error) {
        return Promise.reject(error);
    }
}

export default parameters => new VamtigerLoad(parameters)._main;