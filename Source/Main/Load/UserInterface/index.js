'use strict';

class UserInterface {
    constructor() {
        this._primary = undefined;
        this._secondary = undefined;
        this._tertiary = undefined;
    }
    
    get _main() {
        const main = Promise.resolve()
            .then(() => this._loadUiScripts)
            .catch(this._handleError);

        return main;
    }

    get _loadUiScripts() {
        let loadUiScripts = Promise.resolve();

        this._uiScripts.forEach(script => loadUiScripts = loadUiScripts.then(() => this._loadUiScript(script)));

        loadUiScripts.catch(this._handleError);

        return loadUiScripts;
    }

    _loadUiScript(script) {
        return new Promise((resolve, reject) => vamtiger.load.script({script, resolve, reject}));
    }

    get _uiScripts() {
        const urls = [
                'Primary/index.js',
                'Secondary/index.js'
            ],
            uiScripts = [];
        
        let script;
        
        urls.forEach(url => {
            script = document.createElement('script');

            script.src = `Js/UI/${url}`;

            uiScripts.push(script);
        });

        return uiScripts;
    }

    _handleError(error) {
        return Promise.reject(error);
    }
}

export default parameters => new UserInterface(parameters)._main;