'use strict';

class LoadPolyfills {
    constructor() {
        this._polyfillMetaElements = null;
        this._scriptMap = null;
    }
    
    get _main() {
        const main = Promise.resolve()
            .then(() => this._setPolyfillMetaElements)
            .then(() => this._setScriptMap)
            .then(() => this._loadScripts)
            .catch(this._handleError);
    }

    get _setPolyfillMetaElements() {
        const polyfillMetaElements = vamtiger.get.polyfillMetaElements();

        this._polyfillMetaElements =  polyfillMetaElements;
    }

    get _setScriptMap() {
        const scriptMap = new Map();

        let script,
            dataProperties;

        this._polyfillMetaElements.forEach(polyfillMetaElement => {
            script = document.createElement('script');
            dataProperties = Object.keys(polyfillMetaElement.dataset);

            script.src = polyfillMetaElement.dataset.url;

            scriptMap.set(script, polyfillMetaElement);
        });

        this._scriptMap = scriptMap;
    }

    get _scripts() {
        const scripts = Array.from(this._scriptMap.keys());

        return scripts;
    }

    get _loadScripts() {
        let loadScripts = Promise.all(
            this._scripts.map(script => this._loadScript(script))
        );

        loadScripts = loadScripts
            .then(scripts => this._updateMetaData(scripts))
            .catch(this._handleError);

        return loadScripts;
    }

    _loadScript(script) {
        return new Promise((resolve, reject) => {
            const metaElement = this._scriptMap.get(script);

            script.dataset.state = 'loading';
            metaElement.dataset.state = 'loading';

            vamtiger.load.script({
                script,
                resolve,
                reject
            });
        });
    }

    _updateMetaData(scripts) {
        let metaElement;
        
        scripts.forEach(script => {
            metaElement = this._scriptMap.get(script);

            script.dataset.state = 'loaded';
            metaElement.dataset.state = 'loaded';
        })
    }

    _handleError(error) {
        return Promise.reject(error);
    }
}

export default parameters => new LoadPolyfills(parameters)._main;