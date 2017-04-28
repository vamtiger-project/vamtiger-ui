'use strict';

class BrowserCompatibilityScripts {
    get _main() {
        const main = this._removeBrowserCompatibilityScripts
            .catch(this._handleError);

        return main;
    }

    get _removeBrowserCompatibilityScripts() {
        return new Promise((resolve, reject) => {
            const removeScriptParams = Array
                .from(this._scripts)
                .map(script => Object({element: script}));

            removeScriptParams.forEach(vamtiger.remove.element);

            resolve();
        });
    }

    get _scripts() {
        const parent = this._parent,
            selector = this._selector,
            scripts = parent.querySelectorAll(selector);

        return scripts;
    }

    get _parent() {
        return document.head;
    }

    get _selector() {
        const selector = `
            script[data-browser-compatibility]
        `;

        return selector;
    }

    _handleError(error) {
        throw error;
    }
}

export default parameters => new BrowserCompatibilityScripts()._main;