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

var VamtigerMetaElement$1 = parameters => new VamtigerMetaElement(parameters)._main;

class ClassifiedMetaDataElement {
    constructor({classification}) {
        this.classification = classification;
    }

    get _main() {
        let main;

        if (this.classification)
            main = this._getClassifiedMetaDataElement;
        else
            this._handleError(new Error('Did not get classified meta data element: No classification defined'));

        return main;
    }

    get _getClassifiedMetaDataElement() {
        const selector = this._selector,
            parent = this._parent;
        
        let classifiedMetaDataElement = parent.querySelector(selector);

        if (!classifiedMetaDataElement) {
            classifiedMetaDataElement = document.createElement('meta');
            
            classifiedMetaDataElement.dataset['classification'] = this.classification;

            parent.appendChild(classifiedMetaDataElement);
        }

        return classifiedMetaDataElement;
    }

    get _parent() {
        const parent = vamtiger.get.vamtigerMetaElement();

        return parent;
    }

    get _selector() {
        const selector = `meta[data-classification="${this.classification}"]`;

        return selector;
    }
}

var ClassifiedMetaDataElement$1 = parameters => new ClassifiedMetaDataElement(parameters)._main;

class UnsupportedFeatures {
    get _main() {
        const main = this._unsupportedFeatures;

        return main;
    }

    get _unsupportedFeatures() {
        const browserCompatibilityElement = vamtiger.get.browserCompatibilityElement(),
            unsupportedFeatures = Array
                .from(browserCompatibilityElement.children)
                .filter(element => element.dataset.browserCompatibility === "false")
                .map(element => element.dataset.feature);

        return unsupportedFeatures;
    }
}

var UnsupportedFeatures$1 = parameters => new UnsupportedFeatures(parameters)._main;

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

var BrowserCompatibilityElement$1 = parameters => new BrowserCompatibilityElement(parameters)._main;

class PolyfillUrl {
    constructor({feature}) {
        this.feature = feature;
    }

    get _main() {
        const main = this._polyfillUrl;

        return main;
    }

    get _polyfillUrl() {
        const polyfillUrl = 'Js/Polyfill/' + this.feature.replace(' ', '') + '/index.js';

        return polyfillUrl;
    }
}

var PolyfillUrl$1 = parameters => new PolyfillUrl(parameters)._main;

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

var PolyfillMetaElements$1 = parameters => new PolyfillMetaElements()._main;

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

var PolyfillMetaElement$1 = parameters => new PolyfillMetaElement()._main;

class VamtigerGet {
    static get vamtigerMetaElement() {
        return VamtigerMetaElement$1;
    }
    
    static get classifiedMetaDataElement() {
        return ClassifiedMetaDataElement$1
    }

    static get unsupportedFeatures() {
        return UnsupportedFeatures$1;
    }

    static get browserCompatibilityElement() {
        return BrowserCompatibilityElement$1;
    }

    static get polyfillUrl() {
        return PolyfillUrl$1;
    }

    static get polyfillMetaElements() {
        return PolyfillMetaElements$1;
    }

    static get polyfillMetaElement() {
        return PolyfillMetaElement$1;
    }
}

class Classes {
    constructor() {
        this.result = {
            feature: 'ES 6 Classes'
        };

        this._script = null;

        this._result = null;
    }
    
    get main() {
        const main = this.loadTest
            .then(() => this._result = this._script.dataset)
            .then(() => this._result)
            .catch(this._handleError);

        return main;
    }

    get loadTest() {
        return new Promise((resolve, reject) => {
            let script = document.createElement('script');

            script.dataset.vamtiger = true;
            script.dataset.feature = this.result.feature;
            script.dataset.classification = 'Browser Compatibility';
            script.dataset.browserCompatibility = false;
            
            script.innerHTML = `{
                class Es6ClassCompatibility {
                    constructor() {
                        this._selector = 'script[data-classification="${script.dataset.classification}"][data-feature="${this.result.feature}"]';
                    }
                    
                    main() {
                        const element = this._element,
                            loadEvent = new Event('load');
                        
                        if (element)
                            element.dataset.browserCompatibility = true;

                        element.dispatchEvent(loadEvent);
                    }

                    get _element() {
                        const element = document.querySelector(this._selector);

                        return element
                    }
                }

                const test = new Es6ClassCompatibility();

                test.main();
            }`;

            this._script = script;

            vamtiger.load.script({
                script,
                resolve,
                reject
            });
        });
    }

    _handleError(error) {
        throw error;
    }
}

var BrowserCompatibilityWithClasses = parameters => new Classes(parameters).main;

class BrowserCompatibilityWithCustomElements {
    constructor() {
        this.result = {
            feature: 'Custom Elements'
        };

        this._script = null;

        this._result = null;
    }
    
    get main() {
        const main = this.loadTest
            .then(() => this._result = this._script.dataset)
            .then(() => this._result)
            .catch(this._handleError);

        return main;
    }

    get loadTest() {
        return new Promise((resolve, reject) => {
            let script = document.createElement('script');

            script.dataset.vamtiger = true;
            script.dataset.feature = this.result.feature;
            script.dataset.classification = 'Browser Compatibility';
            script.dataset.browserCompatibility = false;
            
            script.innerHTML = `{
                const selector = 'script[data-classification="${script.dataset.classification}"][data-feature="${this.result.feature}"]',
                    element = document.querySelector(selector),
                    loadEvent = new Event('load');

                test()
                    .then(() => element.dataset.browserCompatibility = true)
                    .catch(error => element.dataset.browserCompatibilityError = error.message)
                    .then(() => element.dispatchEvent(loadEvent));

                function test() {
                    return new Promise((resolve, reject) => {
                        const supported = window.customElements && window.customElements.define ? true : false;
                        
                        if (supported)
                            resolve();
                        else
                            reject(new Error('Custom Elements V1 is not supported'));
                    });
                }
            }`;

            this._script = script;

            vamtiger.load.script({
                script,
                resolve,
                reject
            });
        });
    }

    _handleError(error) {
        throw error;
    }
}

var BrowserCompatibilityWithCustomElements$1 = parameters => new BrowserCompatibilityWithCustomElements(parameters).main;

class BrowserCompatibilityWebStorage {
    constructor() {
        this.result = {
            feature: 'Web Storage'
        };

        this._script = null;

        this._result = null;
    }
    
    get main() {
        const main = this.loadTest
            .then(() => this._result = this._script.dataset)
            .then(() => this._result)
            .catch(this._handleError);

        return main;
    }

    get loadTest() {
        return new Promise((resolve, reject) => {
            let script = document.createElement('script');

            script.dataset.vamtiger = true;
            script.dataset.feature = this.result.feature;
            script.dataset.classification = 'Browser Compatibility';
            script.dataset.browserCompatibility = false;
            
            script.innerHTML = `{
                const selector = 'script[data-classification="${script.dataset.classification}"][data-feature="${this.result.feature}"]',
                    element = document.querySelector(selector),
                    loadEvent = new Event('load');

                test()
                    .then(() => element.dataset.browserCompatibility = true)
                    .catch(error => element.dataset.browserCompatibilityError = error.message)
                    .then(() => element.dispatchEvent(loadEvent));

                function test() {
                    return new Promise((resolve, reject) => {
                        const supported = window.sessionStorage && window.localStorage;
                        
                        if (supported)
                            resolve();
                        else
                            reject(new Error('Web Storage is not supported'));
                    });
                }
            }`;

            this._script = script;

            vamtiger.load.script({
                script,
                resolve,
                reject
            });
        });
    }

    _handleError(error) {
        throw error;
    }
}

var BrowserCompatibilityWebStorage$1 = parameters => new BrowserCompatibilityWebStorage(parameters).main;

class BrowserCompatibilityWithMutationObserver {
    constructor() {
        this.result = {
            feature: 'Mutation Observer'
        };

        this._script = null;

        this._result = null;
    }
    
    get main() {
        const main = this.loadTest
            .then(() => this._result = this._script.dataset)
            .then(() => this._result)
            .catch(this._handleError);

        return main;
    }

    get loadTest() {
        return new Promise((resolve, reject) => {
            let script = document.createElement('script');

            script.dataset.vamtiger = true;
            script.dataset.feature = this.result.feature;
            script.dataset.classification = 'Browser Compatibility';
            script.dataset.browserCompatibility = false;
            
            script.innerHTML = `{
                const selector = 'script[data-classification="${script.dataset.classification}"][data-feature="${this.result.feature}"]',
                    element = document.querySelector(selector),
                    loadEvent = new Event('load');

                test()
                    .then(() => element.dataset.browserCompatibility = true)
                    .catch(error => element.dataset.browserCompatibilityError = error.message)
                    .then(() => element.dispatchEvent(loadEvent));

                function test() {
                    return new Promise((resolve, reject) => {
                        const supported = window.MutationObserver ? true : false;
                        
                        if (supported)
                            resolve();
                        else
                            reject(new Error('Mutation Observer is not supported'));

                        delete test;
                    });
                }
            }`;

            this._script = script;

            vamtiger.load.script({
                script,
                resolve,
                reject
            });
        });
    }

    _handleError(error) {
        throw error;
    }
}

var BrowserCompatibilityWithMutationObserver$1 = parameters => new BrowserCompatibilityWithMutationObserver(parameters).main;

class BrowserCompatibility {
    constructor() {
        this._results = null;
    }
    
    get main() {
        const main = this._testBrowserCompatibility
            .then(vamtiger.remove.browserCompatibilityScripts)
            .then(() => this._setBrowserCompatibility)
            .catch(this._handleError);

        return main;
    }

    get _testBrowserCompatibility() {
        let setBrowserCompatibility = Promise.all([
            BrowserCompatibilityWithClasses(),
            BrowserCompatibilityWebStorage$1(),
            BrowserCompatibilityWithMutationObserver$1(),
            BrowserCompatibilityWithCustomElements$1()
        ]);

        setBrowserCompatibility = setBrowserCompatibility
            .then(results => this._results = results)
            .catch(this._handleError);

        return setBrowserCompatibility;
    }

    get results() {
        return this._results;
    }

    get _setBrowserCompatibility() {
        this.results.forEach(result => vamtiger.set.metaData(result));
    }

    _handleError(error) {
        throw error;
    }
}

var SetBrowserCompatibility = parameters => new BrowserCompatibility(parameters).main;

class SetElementName {
    constructor({element}) {
        this.element = element;

        this._elementName = null;
    }

    get _main() {
        const main = this._setElementName;

        return main;
    }

    get _setElementName() {
        const possibleElementNames = this._possibleElementNames,
            elementName = possibleElementNames.find(possibleElementName => !XRegExp.match(possibleElementName, vamtiger.regex.indexFile)),
            elementNameShouldBeSet = elementName ? true : false;

        if (elementNameShouldBeSet)
            this.element.dataset.name = elementName;
    }

    get _possibleElementNames() {
        let elementUrl = this.element.src ? this.element.src : this.element.href,
            allPossibleElementNames,
            possibleElementNames = [];

        if (elementUrl) {
            elementUrl = XRegExp.replace(elementUrl, vamtiger.regex.urlParams, '');
            allPossibleElementNames = elementUrl.split('/');

            possibleElementNames = allPossibleElementNames.slice(allPossibleElementNames.length - 2);
            possibleElementNames.reverse();
        }

        return possibleElementNames;
    }

    _handleError(error) {
        throw error;
    }
}

var SetElementName$1 = parameters => new SetElementName(parameters)._main;

class SetPolyfills {
    constructor() {
        this._unsupportedFeatures = null;
    }
    
    get _main() {
        const main = this._setUnsupportedFeatures
            .then(this._setPolyfillMetaData)
            .then(vamtiger.load.polyfills)
            .catch(this._handleError);

        return main;
    }

    get _setUnsupportedFeatures() {
        return new Promise((resolve, reject) => {
            const unsupportedFeatures = vamtiger.get.unsupportedFeatures();

            this._unsupportedFeatures = unsupportedFeatures;

            resolve();
        });
    }

    get _setPolyfillMetaData() {
        const polyfillParameters = this._unsupportedFeatures
            .map(this._polyfillParams);

        polyfillParameters.forEach(parameters => vamtiger.set.metaData(parameters));
    }

    _polyfillParams(feature) {
        const parameters = {
            classification: 'Browser Polyfill',
            feature,
            state: "initial",
            url: vamtiger.get.polyfillUrl({feature})
        };

        return parameters;
    }

    _handleError(error) {
        throw error;
    }
}

var SetPolyfills$1 = parameters => new SetPolyfills(parameters)._main;

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
        throw error;
    }
}

var SetVamtigerMetaElement$1 = parameters => new SetVamtigerMetaElement(parameters)._main;

class SetMetaData {
    constructor(parameters) {
        this._parameters = parameters;
        this._classification = parameters.classification;

        this._classificationElement = null;
    }

    get _main() {
        let main;

        if (this._dataIsValid)
            main = this._setClassificationElement
                .then(() => this._setMetaDataElement)
                .catch(this._handleError);

        return main;
    }

    get _dataIsValid() {
        let dataIsValid = this._classification ? true : false;

        return dataIsValid;
    }

    get _setClassificationElement() {
        return new Promise((resolve, reject) => {
            let classificationElement = vamtiger.get.classifiedMetaDataElement({
                classification: this._classification
            });

            this._classificationElement = classificationElement;

            resolve();
        });
    }

    get _setMetaDataElement() {
        const metaDataProperties = this._metaDataProperties,
            metaDataElement = metaDataProperties.length ? document.createElement('meta') : vamtiger.ignore;

        if (metaDataElement) {
            metaDataProperties.forEach(property => metaDataElement.dataset[property] = this._parameters[property]);

            this._classificationElement.appendChild(metaDataElement);
        }
    }

    get _metaDataProperties() {
        const metaDataProperties = Object
            .keys(this._parameters)
            .filter(property => !XRegExp.match(property, vamtiger.regex.excludeMetaData));

        return metaDataProperties;
    }

    _handleError(error) {
        throw error;
    }
}

var SetMetaData$1 = parameters => new SetMetaData(parameters)._main;

class VamtigerSet {
    static get browserCompatibility() {
        return SetBrowserCompatibility;
    }

    static get elementName() {
        return SetElementName$1;
    }

    static get polyfills() {
        return SetPolyfills$1;
    }

    static get vamtigerMetaElement() {
        return SetVamtigerMetaElement$1;
    }

    static get metaData() {
        return SetMetaData$1;
    }
}

class VamtigerLoad$2 {
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
        throw error;
    }
}

var LoadScript = parameters => new VamtigerLoad$2(parameters)._main;

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
        });
    }

    _handleError(error) {
        throw error
    }
}

var Polyfills = parameters => new LoadPolyfills(parameters)._main;

class VamtigerLoad {
    static get script() {
        return LoadScript;
    }

    static get polyfills() {
        return Polyfills;
    }
}

class IndexFileRegex {
    static get _main() {
        const main = this._regex;

        return main;
    }

    static get _regex() {
        const pattern = '^index',
            regex = XRegExp(pattern);

        return regex;
    }
}

var indexFile = IndexFileRegex._main;

class UrlParams {
    static get _main() {
        const main = this._regex;

        return main;
    }

    static get _regex() {
        const pattern = `
                \\?
                (?<urlParams>
                    .*
                )
            $`,
            regex = XRegExp(pattern, 'xmns');

        return regex;
    }
}

var urlParams = UrlParams._main;

class ExcludeMetaData {
    static get _main() {
        const main = this._regex;

        return main;
    }

    static get _regex() {
        const pattern = `^
                classification
                |
                vamtiger
            $`,
            regex = XRegExp(pattern, 'xin');

        return regex;
    }
}

var excludeMetaData = ExcludeMetaData._main;

class VamtigerRegex {
    static get indexFile() {
        return indexFile;
    }

    static get urlParams() {
        return urlParams;
    }

    static get excludeMetaData() {
        return excludeMetaData;
    }
}

class VamtigerRemoveElement {
    constructor({element}) {
        this.element = element;
    }

    get _main() {
        let main = this.element ? this._removeElement : vamtiger.ignore;

        if (this.element)
            main = this._removeElement;
        else
            this._handleError(new Error('Element not removed: No element defined'));

        return main;
    }

    get _removeElement() {
        const parent = this.element.parentElement,
            elementCanBeRemoved = parent ? true : false;

        if (elementCanBeRemoved)
            parent.removeChild(this.element);
    }

    _handleError(error) {
        throw error;
    }
}

var VamtigerElement = parameters => new VamtigerRemoveElement(parameters)._main;

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

var BrowserCompatibilityScripts$1 = parameters => new BrowserCompatibilityScripts()._main;

class VamtigerRemove {
    static get element() {
        return VamtigerElement;
    }
    
    static get browserCompatibilityScripts() {
        return BrowserCompatibilityScripts$1;
    }
}

class Vamtiger {
    constructor() {
        this._selectedElements = {};
    }
    
    main() {
        const main = this.set.vamtigerMetaElement()
            .then(() => this.set.browserCompatibility())
            .then(() => this.set.polyfills())
            .catch(this._handleError);

        removeEventListener('load', this.main);

        return main;
    }

    get ignore() {}

    get get() {
        return VamtigerGet;
    }

    get set() {
        return VamtigerSet;
    }

    get load() {
        return VamtigerLoad;
    }

    get regex() {
        return VamtigerRegex;
    }

    get selected() {
        return this._selectedElements;
    }

    get remove() {
        return VamtigerRemove;
    }

    _handleError(error) {
        throw error;
    }
}

window.vamtiger = new Vamtiger();

addEventListener('load', event => vamtiger.main());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL0dldC9WYW10aWdlck1ldGFFbGVtZW50L2luZGV4LmpzIiwiL1VzZXJzL3ZhbXRpZ2VyL0RvY3VtZW50cy9Qcm9ncmFtbWluZy9WYW10aWdlclByb2plY3QvdmFtdGlnZXItdWkvU291cmNlL01haW4vR2V0L0NsYXNzaWZpZWRNZXRhRGF0YUVsZW1lbnQvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvTWFpbi9HZXQvVW5zdXBwb3J0ZWRGZWF0dXJlcy9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL0dldC9Ccm93c2VyQ29tcGF0aWJpbGl0eUVsZW1lbnQvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvTWFpbi9HZXQvUG9seWZpbGxVcmwvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvTWFpbi9HZXQvUG9seWZpbGxNZXRhRWxlbWVudHMvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvTWFpbi9HZXQvUG9seWZpbGxNZXRhRWxlbWVudC9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL0dldC9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL1NldC9Ccm93c2VyQ29tcGF0aWJpbGl0eS9DbGFzc2VzL2luZGV4LmpzIiwiL1VzZXJzL3ZhbXRpZ2VyL0RvY3VtZW50cy9Qcm9ncmFtbWluZy9WYW10aWdlclByb2plY3QvdmFtdGlnZXItdWkvU291cmNlL01haW4vU2V0L0Jyb3dzZXJDb21wYXRpYmlsaXR5L0N1c3RvbUVsZW1lbnRzL2luZGV4LmpzIiwiL1VzZXJzL3ZhbXRpZ2VyL0RvY3VtZW50cy9Qcm9ncmFtbWluZy9WYW10aWdlclByb2plY3QvdmFtdGlnZXItdWkvU291cmNlL01haW4vU2V0L0Jyb3dzZXJDb21wYXRpYmlsaXR5L1dlYlN0b3JhZ2UvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvTWFpbi9TZXQvQnJvd3NlckNvbXBhdGliaWxpdHkvTXV0YXRpb25PYnNlcnZlci9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL1NldC9Ccm93c2VyQ29tcGF0aWJpbGl0eS9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL1NldC9FbGVtZW50TmFtZS9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL1NldC9Qb2x5ZmlsbHMvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvTWFpbi9TZXQvTWV0YUVsZW1lbnQvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvTWFpbi9TZXQvTWV0YURhdGEvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvTWFpbi9TZXQvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvTWFpbi9Mb2FkL1NjcmlwdC9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL0xvYWQvUG9seWZpbGxzL2luZGV4LmpzIiwiL1VzZXJzL3ZhbXRpZ2VyL0RvY3VtZW50cy9Qcm9ncmFtbWluZy9WYW10aWdlclByb2plY3QvdmFtdGlnZXItdWkvU291cmNlL01haW4vTG9hZC9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL1JlZ2V4L0luZGV4RmlsZS9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL1JlZ2V4L1VybFBhcmFtcy9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL1JlZ2V4L0V4Y2x1ZGVNZXRhRGF0YS9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL1JlZ2V4L2luZGV4LmpzIiwiL1VzZXJzL3ZhbXRpZ2VyL0RvY3VtZW50cy9Qcm9ncmFtbWluZy9WYW10aWdlclByb2plY3QvdmFtdGlnZXItdWkvU291cmNlL01haW4vUmVtb3ZlL0VsZW1lbnQvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvTWFpbi9SZW1vdmUvQnJvd3NlckNvbXBhdGliaWxpdHlTY3JpcHRzL2luZGV4LmpzIiwiL1VzZXJzL3ZhbXRpZ2VyL0RvY3VtZW50cy9Qcm9ncmFtbWluZy9WYW10aWdlclByb2plY3QvdmFtdGlnZXItdWkvU291cmNlL01haW4vUmVtb3ZlL2luZGV4LmpzIiwiL1VzZXJzL3ZhbXRpZ2VyL0RvY3VtZW50cy9Qcm9ncmFtbWluZy9WYW10aWdlclByb2plY3QvdmFtdGlnZXItdWkvU291cmNlL01haW4vaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBWYW10aWdlck1ldGFFbGVtZW50IHtcbiAgICBnZXQgX21haW4oKSB7XG4gICAgICAgIGNvbnN0IG1haW4gPSB0aGlzLl92YW10aWdlck1ldGFFbGVtZW50O1xuXG4gICAgICAgIHJldHVybiBtYWluO1xuICAgIH1cblxuICAgIGdldCBfdmFtdGlnZXJNZXRhRWxlbWVudCgpIHtcbiAgICAgICAgbGV0IHZhbXRpZ2VyTWV0YUVsZW1lbnQgPSB2YW10aWdlci5fc2VsZWN0ZWRFbGVtZW50cy52YW10aWdlck1ldGFFbGVtZW50O1xuXG4gICAgICAgIGlmICghdmFtdGlnZXJNZXRhRWxlbWVudCkge1xuICAgICAgICAgICAgdmFtdGlnZXJNZXRhRWxlbWVudCA9IGRvY3VtZW50LmhlYWQucXVlcnlTZWxlY3Rvcih0aGlzLl9zZWxlY3Rvcik7XG5cbiAgICAgICAgICAgIHZhbXRpZ2VyLl9zZWxlY3RlZEVsZW1lbnRzLnZhbXRpZ2VyTWV0YUVsZW1lbnQgPSB2YW10aWdlck1ldGFFbGVtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbXRpZ2VyTWV0YUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgZ2V0IF9zZWxlY3RvcigpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSAnbWV0YVtkYXRhLXZhbXRpZ2VyXSc7XG5cbiAgICAgICAgcmV0dXJuIHNlbGVjdG9yO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyYW1ldGVycyA9PiBuZXcgVmFtdGlnZXJNZXRhRWxlbWVudChwYXJhbWV0ZXJzKS5fbWFpbjsiLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIENsYXNzaWZpZWRNZXRhRGF0YUVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKHtjbGFzc2lmaWNhdGlvbn0pIHtcbiAgICAgICAgdGhpcy5jbGFzc2lmaWNhdGlvbiA9IGNsYXNzaWZpY2F0aW9uO1xuICAgIH1cblxuICAgIGdldCBfbWFpbigpIHtcbiAgICAgICAgbGV0IG1haW47XG5cbiAgICAgICAgaWYgKHRoaXMuY2xhc3NpZmljYXRpb24pXG4gICAgICAgICAgICBtYWluID0gdGhpcy5fZ2V0Q2xhc3NpZmllZE1ldGFEYXRhRWxlbWVudDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5faGFuZGxlRXJyb3IobmV3IEVycm9yKCdEaWQgbm90IGdldCBjbGFzc2lmaWVkIG1ldGEgZGF0YSBlbGVtZW50OiBObyBjbGFzc2lmaWNhdGlvbiBkZWZpbmVkJykpO1xuXG4gICAgICAgIHJldHVybiBtYWluO1xuICAgIH1cblxuICAgIGdldCBfZ2V0Q2xhc3NpZmllZE1ldGFEYXRhRWxlbWVudCgpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSB0aGlzLl9zZWxlY3RvcixcbiAgICAgICAgICAgIHBhcmVudCA9IHRoaXMuX3BhcmVudDtcbiAgICAgICAgXG4gICAgICAgIGxldCBjbGFzc2lmaWVkTWV0YURhdGFFbGVtZW50ID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG4gICAgICAgIGlmICghY2xhc3NpZmllZE1ldGFEYXRhRWxlbWVudCkge1xuICAgICAgICAgICAgY2xhc3NpZmllZE1ldGFEYXRhRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21ldGEnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2xhc3NpZmllZE1ldGFEYXRhRWxlbWVudC5kYXRhc2V0WydjbGFzc2lmaWNhdGlvbiddID0gdGhpcy5jbGFzc2lmaWNhdGlvbjtcblxuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGNsYXNzaWZpZWRNZXRhRGF0YUVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNsYXNzaWZpZWRNZXRhRGF0YUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgZ2V0IF9wYXJlbnQoKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHZhbXRpZ2VyLmdldC52YW10aWdlck1ldGFFbGVtZW50KCk7XG5cbiAgICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICB9XG5cbiAgICBnZXQgX3NlbGVjdG9yKCkge1xuICAgICAgICBjb25zdCBzZWxlY3RvciA9IGBtZXRhW2RhdGEtY2xhc3NpZmljYXRpb249XCIke3RoaXMuY2xhc3NpZmljYXRpb259XCJdYDtcblxuICAgICAgICByZXR1cm4gc2VsZWN0b3I7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBwYXJhbWV0ZXJzID0+IG5ldyBDbGFzc2lmaWVkTWV0YURhdGFFbGVtZW50KHBhcmFtZXRlcnMpLl9tYWluOyIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgVW5zdXBwb3J0ZWRGZWF0dXJlcyB7XG4gICAgZ2V0IF9tYWluKCkge1xuICAgICAgICBjb25zdCBtYWluID0gdGhpcy5fdW5zdXBwb3J0ZWRGZWF0dXJlcztcblxuICAgICAgICByZXR1cm4gbWFpbjtcbiAgICB9XG5cbiAgICBnZXQgX3Vuc3VwcG9ydGVkRmVhdHVyZXMoKSB7XG4gICAgICAgIGNvbnN0IGJyb3dzZXJDb21wYXRpYmlsaXR5RWxlbWVudCA9IHZhbXRpZ2VyLmdldC5icm93c2VyQ29tcGF0aWJpbGl0eUVsZW1lbnQoKSxcbiAgICAgICAgICAgIHVuc3VwcG9ydGVkRmVhdHVyZXMgPSBBcnJheVxuICAgICAgICAgICAgICAgIC5mcm9tKGJyb3dzZXJDb21wYXRpYmlsaXR5RWxlbWVudC5jaGlsZHJlbilcbiAgICAgICAgICAgICAgICAuZmlsdGVyKGVsZW1lbnQgPT4gZWxlbWVudC5kYXRhc2V0LmJyb3dzZXJDb21wYXRpYmlsaXR5ID09PSBcImZhbHNlXCIpXG4gICAgICAgICAgICAgICAgLm1hcChlbGVtZW50ID0+IGVsZW1lbnQuZGF0YXNldC5mZWF0dXJlKTtcblxuICAgICAgICByZXR1cm4gdW5zdXBwb3J0ZWRGZWF0dXJlcztcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcmFtZXRlcnMgPT4gbmV3IFVuc3VwcG9ydGVkRmVhdHVyZXMocGFyYW1ldGVycykuX21haW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBCcm93c2VyQ29tcGF0aWJpbGl0eUVsZW1lbnQge1xuICAgIGdldCBfbWFpbigpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IHRoaXMuX2Jyb3dzZXJDb21wYXRpYmlsaXR5RWxlbWVudDtcblxuICAgICAgICByZXR1cm4gbWFpbjtcbiAgICB9XG5cbiAgICBnZXQgX2Jyb3dzZXJDb21wYXRpYmlsaXR5RWxlbWVudCgpIHtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5fcGFyZW50LFxuICAgICAgICAgICAgc2VsZWN0b3IgPSB0aGlzLl9zZWxlY3RvcixcbiAgICAgICAgICAgIGJyb3dzZXJDb21wYXRpYmlsaXR5RWxlbWVudCA9IHBhcmVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcblxuICAgICAgICByZXR1cm4gYnJvd3NlckNvbXBhdGliaWxpdHlFbGVtZW50XG4gICAgfVxuXG4gICAgZ2V0IF9wYXJlbnQoKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHZhbXRpZ2VyLmdldC52YW10aWdlck1ldGFFbGVtZW50KCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcGFyZW50O1xuICAgIH1cblxuICAgIGdldCBfc2VsZWN0b3IoKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9yID0gJ21ldGFbZGF0YS1jbGFzc2lmaWNhdGlvbj1cIkJyb3dzZXIgQ29tcGF0aWJpbGl0eVwiXSc7XG5cbiAgICAgICAgcmV0dXJuIHNlbGVjdG9yO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyYW1ldGVycyA9PiBuZXcgQnJvd3NlckNvbXBhdGliaWxpdHlFbGVtZW50KHBhcmFtZXRlcnMpLl9tYWluOyIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgUG9seWZpbGxVcmwge1xuICAgIGNvbnN0cnVjdG9yKHtmZWF0dXJlfSkge1xuICAgICAgICB0aGlzLmZlYXR1cmUgPSBmZWF0dXJlO1xuICAgIH1cblxuICAgIGdldCBfbWFpbigpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IHRoaXMuX3BvbHlmaWxsVXJsO1xuXG4gICAgICAgIHJldHVybiBtYWluO1xuICAgIH1cblxuICAgIGdldCBfcG9seWZpbGxVcmwoKSB7XG4gICAgICAgIGNvbnN0IHBvbHlmaWxsVXJsID0gJ0pzL1BvbHlmaWxsLycgKyB0aGlzLmZlYXR1cmUucmVwbGFjZSgnICcsICcnKSArICcvaW5kZXguanMnO1xuXG4gICAgICAgIHJldHVybiBwb2x5ZmlsbFVybDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcmFtZXRlcnMgPT4gbmV3IFBvbHlmaWxsVXJsKHBhcmFtZXRlcnMpLl9tYWluOyIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgUG9seWZpbGxNZXRhRWxlbWVudHMge1xuICAgIGdldCBfbWFpbigpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IHRoaXMuX3BvbHlmaWxsTWV0YUVsZW1lbnRzO1xuXG4gICAgICAgIHJldHVybiBtYWluO1xuICAgIH1cblxuICAgIGdldCBfcG9seWZpbGxNZXRhRWxlbWVudHMoKSB7XG4gICAgICAgIGNvbnN0IHBvbHlmaWxsTWV0YUVsZW1lbnRzID0gQXJyYXlcbiAgICAgICAgICAgIC5mcm9tKHRoaXMuX3BvbHlmaWxsTWV0YUVsZW1lbnQuY2hpbGROb2Rlcyk7XG5cbiAgICAgICAgcmV0dXJuIHBvbHlmaWxsTWV0YUVsZW1lbnRzO1xuICAgIH1cblxuICAgIGdldCBfcG9seWZpbGxNZXRhRWxlbWVudCgpIHtcbiAgICAgICAgY29uc3QgcG9seWZpbGxNZXRhRWxlbWVudCA9IHZhbXRpZ2VyLmdldC5wb2x5ZmlsbE1ldGFFbGVtZW50KCk7XG5cbiAgICAgICAgcmV0dXJuIHBvbHlmaWxsTWV0YUVsZW1lbnQ7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBwYXJhbWV0ZXJzID0+IG5ldyBQb2x5ZmlsbE1ldGFFbGVtZW50cygpLl9tYWluOyIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgUG9seWZpbGxNZXRhRWxlbWVudCB7XG4gICAgZ2V0IF9tYWluKCkge1xuICAgICAgICBjb25zdCBtYWluID0gdGhpcy5fcG9seWZpbGxNZXRhRWxlbWVudDtcblxuICAgICAgICByZXR1cm4gbWFpbjtcbiAgICB9XG5cbiAgICBnZXQgX3BvbHlmaWxsTWV0YUVsZW1lbnQoKSB7XG4gICAgICAgIGNvbnN0IHBvbHlmaWxsTWV0YUVsZW1lbnQgPSB0aGlzLl92YW10aWdlck1ldGFFbGVtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5fc2VsZWN0b3IpO1xuXG4gICAgICAgIHJldHVybiBwb2x5ZmlsbE1ldGFFbGVtZW50O1xuICAgIH1cblxuICAgIGdldCBfdmFtdGlnZXJNZXRhRWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHZhbXRpZ2VyLmdldC52YW10aWdlck1ldGFFbGVtZW50KCk7XG4gICAgfVxuXG4gICAgZ2V0IF9zZWxlY3RvcigpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSAnW2RhdGEtY2xhc3NpZmljYXRpb249XCJCcm93c2VyIFBvbHlmaWxsXCJdJztcblxuICAgICAgICByZXR1cm4gc2VsZWN0b3I7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBwYXJhbWV0ZXJzID0+IG5ldyBQb2x5ZmlsbE1ldGFFbGVtZW50KCkuX21haW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgVmFtdGlnZXJNZXRhRWxlbWVudCBmcm9tICcuL1ZhbXRpZ2VyTWV0YUVsZW1lbnQvaW5kZXguanMnO1xuaW1wb3J0IENsYXNzaWZpZWRNZXRhRGF0YUVsZW1lbnQgZnJvbSAnLi9DbGFzc2lmaWVkTWV0YURhdGFFbGVtZW50L2luZGV4LmpzJztcbmltcG9ydCBVbnN1cHBvcnRlZEZlYXR1cmVzIGZyb20gJy4vVW5zdXBwb3J0ZWRGZWF0dXJlcy9pbmRleC5qcyc7XG5pbXBvcnQgQnJvd3NlckNvbXBhdGliaWxpdHlFbGVtZW50IGZyb20gJy4vQnJvd3NlckNvbXBhdGliaWxpdHlFbGVtZW50L2luZGV4LmpzJztcbmltcG9ydCBQb2x5ZmlsbFVybCBmcm9tICcuL1BvbHlmaWxsVXJsL2luZGV4LmpzJztcbmltcG9ydCBQb2x5ZmlsbE1ldGFFbGVtZW50cyBmcm9tICcuL1BvbHlmaWxsTWV0YUVsZW1lbnRzL2luZGV4LmpzJztcbmltcG9ydCBQb2x5ZmlsbE1ldGFFbGVtZW50IGZyb20gJy4vUG9seWZpbGxNZXRhRWxlbWVudC9pbmRleC5qcyc7XG5cbmNsYXNzIFZhbXRpZ2VyR2V0IHtcbiAgICBzdGF0aWMgZ2V0IHZhbXRpZ2VyTWV0YUVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiBWYW10aWdlck1ldGFFbGVtZW50O1xuICAgIH1cbiAgICBcbiAgICBzdGF0aWMgZ2V0IGNsYXNzaWZpZWRNZXRhRGF0YUVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiBDbGFzc2lmaWVkTWV0YURhdGFFbGVtZW50XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCB1bnN1cHBvcnRlZEZlYXR1cmVzKCkge1xuICAgICAgICByZXR1cm4gVW5zdXBwb3J0ZWRGZWF0dXJlcztcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IGJyb3dzZXJDb21wYXRpYmlsaXR5RWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIEJyb3dzZXJDb21wYXRpYmlsaXR5RWxlbWVudDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IHBvbHlmaWxsVXJsKCkge1xuICAgICAgICByZXR1cm4gUG9seWZpbGxVcmw7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBwb2x5ZmlsbE1ldGFFbGVtZW50cygpIHtcbiAgICAgICAgcmV0dXJuIFBvbHlmaWxsTWV0YUVsZW1lbnRzO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgcG9seWZpbGxNZXRhRWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIFBvbHlmaWxsTWV0YUVsZW1lbnQ7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBWYW10aWdlckdldDsiLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIENsYXNzZXMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnJlc3VsdCA9IHtcbiAgICAgICAgICAgIGZlYXR1cmU6ICdFUyA2IENsYXNzZXMnXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5fc2NyaXB0ID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9yZXN1bHQgPSBudWxsO1xuICAgIH1cbiAgICBcbiAgICBnZXQgbWFpbigpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IHRoaXMubG9hZFRlc3RcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuX3Jlc3VsdCA9IHRoaXMuX3NjcmlwdC5kYXRhc2V0KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5fcmVzdWx0KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuX2hhbmRsZUVycm9yKTtcblxuICAgICAgICByZXR1cm4gbWFpbjtcbiAgICB9XG5cbiAgICBnZXQgbG9hZFRlc3QoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBsZXQgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cbiAgICAgICAgICAgIHNjcmlwdC5kYXRhc2V0LnZhbXRpZ2VyID0gdHJ1ZTtcbiAgICAgICAgICAgIHNjcmlwdC5kYXRhc2V0LmZlYXR1cmUgPSB0aGlzLnJlc3VsdC5mZWF0dXJlO1xuICAgICAgICAgICAgc2NyaXB0LmRhdGFzZXQuY2xhc3NpZmljYXRpb24gPSAnQnJvd3NlciBDb21wYXRpYmlsaXR5JztcbiAgICAgICAgICAgIHNjcmlwdC5kYXRhc2V0LmJyb3dzZXJDb21wYXRpYmlsaXR5ID0gZmFsc2U7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHNjcmlwdC5pbm5lckhUTUwgPSBge1xuICAgICAgICAgICAgICAgIGNsYXNzIEVzNkNsYXNzQ29tcGF0aWJpbGl0eSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0b3IgPSAnc2NyaXB0W2RhdGEtY2xhc3NpZmljYXRpb249XCIke3NjcmlwdC5kYXRhc2V0LmNsYXNzaWZpY2F0aW9ufVwiXVtkYXRhLWZlYXR1cmU9XCIke3RoaXMucmVzdWx0LmZlYXR1cmV9XCJdJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbWFpbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLl9lbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRFdmVudCA9IG5ldyBFdmVudCgnbG9hZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmRhdGFzZXQuYnJvd3NlckNvbXBhdGliaWxpdHkgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQobG9hZEV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGdldCBfZWxlbWVudCgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuX3NlbGVjdG9yKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IHRlc3QgPSBuZXcgRXM2Q2xhc3NDb21wYXRpYmlsaXR5KCk7XG5cbiAgICAgICAgICAgICAgICB0ZXN0Lm1haW4oKTtcbiAgICAgICAgICAgIH1gO1xuXG4gICAgICAgICAgICB0aGlzLl9zY3JpcHQgPSBzY3JpcHQ7XG5cbiAgICAgICAgICAgIHZhbXRpZ2VyLmxvYWQuc2NyaXB0KHtcbiAgICAgICAgICAgICAgICBzY3JpcHQsXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgICAgICByZWplY3RcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfaGFuZGxlRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBwYXJhbWV0ZXJzID0+IG5ldyBDbGFzc2VzKHBhcmFtZXRlcnMpLm1haW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBCcm93c2VyQ29tcGF0aWJpbGl0eVdpdGhDdXN0b21FbGVtZW50cyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucmVzdWx0ID0ge1xuICAgICAgICAgICAgZmVhdHVyZTogJ0N1c3RvbSBFbGVtZW50cydcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLl9zY3JpcHQgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX3Jlc3VsdCA9IG51bGw7XG4gICAgfVxuICAgIFxuICAgIGdldCBtYWluKCkge1xuICAgICAgICBjb25zdCBtYWluID0gdGhpcy5sb2FkVGVzdFxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5fcmVzdWx0ID0gdGhpcy5fc2NyaXB0LmRhdGFzZXQpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLl9yZXN1bHQpXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5faGFuZGxlRXJyb3IpO1xuXG4gICAgICAgIHJldHVybiBtYWluO1xuICAgIH1cblxuICAgIGdldCBsb2FkVGVzdCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGxldCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuICAgICAgICAgICAgc2NyaXB0LmRhdGFzZXQudmFtdGlnZXIgPSB0cnVlO1xuICAgICAgICAgICAgc2NyaXB0LmRhdGFzZXQuZmVhdHVyZSA9IHRoaXMucmVzdWx0LmZlYXR1cmU7XG4gICAgICAgICAgICBzY3JpcHQuZGF0YXNldC5jbGFzc2lmaWNhdGlvbiA9ICdCcm93c2VyIENvbXBhdGliaWxpdHknO1xuICAgICAgICAgICAgc2NyaXB0LmRhdGFzZXQuYnJvd3NlckNvbXBhdGliaWxpdHkgPSBmYWxzZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc2NyaXB0LmlubmVySFRNTCA9IGB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSAnc2NyaXB0W2RhdGEtY2xhc3NpZmljYXRpb249XCIke3NjcmlwdC5kYXRhc2V0LmNsYXNzaWZpY2F0aW9ufVwiXVtkYXRhLWZlYXR1cmU9XCIke3RoaXMucmVzdWx0LmZlYXR1cmV9XCJdJyxcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpLFxuICAgICAgICAgICAgICAgICAgICBsb2FkRXZlbnQgPSBuZXcgRXZlbnQoJ2xvYWQnKTtcblxuICAgICAgICAgICAgICAgIHRlc3QoKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBlbGVtZW50LmRhdGFzZXQuYnJvd3NlckNvbXBhdGliaWxpdHkgPSB0cnVlKVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gZWxlbWVudC5kYXRhc2V0LmJyb3dzZXJDb21wYXRpYmlsaXR5RXJyb3IgPSBlcnJvci5tZXNzYWdlKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBlbGVtZW50LmRpc3BhdGNoRXZlbnQobG9hZEV2ZW50KSk7XG5cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiB0ZXN0KCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3VwcG9ydGVkID0gd2luZG93LmN1c3RvbUVsZW1lbnRzICYmIHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdXBwb3J0ZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ0N1c3RvbSBFbGVtZW50cyBWMSBpcyBub3Qgc3VwcG9ydGVkJykpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9YDtcblxuICAgICAgICAgICAgdGhpcy5fc2NyaXB0ID0gc2NyaXB0O1xuXG4gICAgICAgICAgICB2YW10aWdlci5sb2FkLnNjcmlwdCh7XG4gICAgICAgICAgICAgICAgc2NyaXB0LFxuICAgICAgICAgICAgICAgIHJlc29sdmUsXG4gICAgICAgICAgICAgICAgcmVqZWN0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX2hhbmRsZUVycm9yKGVycm9yKSB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyYW1ldGVycyA9PiBuZXcgQnJvd3NlckNvbXBhdGliaWxpdHlXaXRoQ3VzdG9tRWxlbWVudHMocGFyYW1ldGVycykubWFpbjsiLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIEJyb3dzZXJDb21wYXRpYmlsaXR5V2ViU3RvcmFnZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucmVzdWx0ID0ge1xuICAgICAgICAgICAgZmVhdHVyZTogJ1dlYiBTdG9yYWdlJ1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX3NjcmlwdCA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5fcmVzdWx0ID0gbnVsbDtcbiAgICB9XG4gICAgXG4gICAgZ2V0IG1haW4oKSB7XG4gICAgICAgIGNvbnN0IG1haW4gPSB0aGlzLmxvYWRUZXN0XG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLl9yZXN1bHQgPSB0aGlzLl9zY3JpcHQuZGF0YXNldClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuX3Jlc3VsdClcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLl9oYW5kbGVFcnJvcik7XG5cbiAgICAgICAgcmV0dXJuIG1haW47XG4gICAgfVxuXG4gICAgZ2V0IGxvYWRUZXN0KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgbGV0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG4gICAgICAgICAgICBzY3JpcHQuZGF0YXNldC52YW10aWdlciA9IHRydWU7XG4gICAgICAgICAgICBzY3JpcHQuZGF0YXNldC5mZWF0dXJlID0gdGhpcy5yZXN1bHQuZmVhdHVyZTtcbiAgICAgICAgICAgIHNjcmlwdC5kYXRhc2V0LmNsYXNzaWZpY2F0aW9uID0gJ0Jyb3dzZXIgQ29tcGF0aWJpbGl0eSc7XG4gICAgICAgICAgICBzY3JpcHQuZGF0YXNldC5icm93c2VyQ29tcGF0aWJpbGl0eSA9IGZhbHNlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBzY3JpcHQuaW5uZXJIVE1MID0gYHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RvciA9ICdzY3JpcHRbZGF0YS1jbGFzc2lmaWNhdGlvbj1cIiR7c2NyaXB0LmRhdGFzZXQuY2xhc3NpZmljYXRpb259XCJdW2RhdGEtZmVhdHVyZT1cIiR7dGhpcy5yZXN1bHQuZmVhdHVyZX1cIl0nLFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvciksXG4gICAgICAgICAgICAgICAgICAgIGxvYWRFdmVudCA9IG5ldyBFdmVudCgnbG9hZCcpO1xuXG4gICAgICAgICAgICAgICAgdGVzdCgpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IGVsZW1lbnQuZGF0YXNldC5icm93c2VyQ29tcGF0aWJpbGl0eSA9IHRydWUpXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBlbGVtZW50LmRhdGFzZXQuYnJvd3NlckNvbXBhdGliaWxpdHlFcnJvciA9IGVycm9yLm1lc3NhZ2UpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IGVsZW1lbnQuZGlzcGF0Y2hFdmVudChsb2FkRXZlbnQpKTtcblxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHRlc3QoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdXBwb3J0ZWQgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UgJiYgd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1cHBvcnRlZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignV2ViIFN0b3JhZ2UgaXMgbm90IHN1cHBvcnRlZCcpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWA7XG5cbiAgICAgICAgICAgIHRoaXMuX3NjcmlwdCA9IHNjcmlwdDtcblxuICAgICAgICAgICAgdmFtdGlnZXIubG9hZC5zY3JpcHQoe1xuICAgICAgICAgICAgICAgIHNjcmlwdCxcbiAgICAgICAgICAgICAgICByZXNvbHZlLFxuICAgICAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9oYW5kbGVFcnJvcihlcnJvcikge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcmFtZXRlcnMgPT4gbmV3IEJyb3dzZXJDb21wYXRpYmlsaXR5V2ViU3RvcmFnZShwYXJhbWV0ZXJzKS5tYWluOyIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgQnJvd3NlckNvbXBhdGliaWxpdHlXaXRoTXV0YXRpb25PYnNlcnZlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucmVzdWx0ID0ge1xuICAgICAgICAgICAgZmVhdHVyZTogJ011dGF0aW9uIE9ic2VydmVyJ1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX3NjcmlwdCA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5fcmVzdWx0ID0gbnVsbDtcbiAgICB9XG4gICAgXG4gICAgZ2V0IG1haW4oKSB7XG4gICAgICAgIGNvbnN0IG1haW4gPSB0aGlzLmxvYWRUZXN0XG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLl9yZXN1bHQgPSB0aGlzLl9zY3JpcHQuZGF0YXNldClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuX3Jlc3VsdClcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLl9oYW5kbGVFcnJvcik7XG5cbiAgICAgICAgcmV0dXJuIG1haW47XG4gICAgfVxuXG4gICAgZ2V0IGxvYWRUZXN0KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgbGV0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG4gICAgICAgICAgICBzY3JpcHQuZGF0YXNldC52YW10aWdlciA9IHRydWU7XG4gICAgICAgICAgICBzY3JpcHQuZGF0YXNldC5mZWF0dXJlID0gdGhpcy5yZXN1bHQuZmVhdHVyZTtcbiAgICAgICAgICAgIHNjcmlwdC5kYXRhc2V0LmNsYXNzaWZpY2F0aW9uID0gJ0Jyb3dzZXIgQ29tcGF0aWJpbGl0eSc7XG4gICAgICAgICAgICBzY3JpcHQuZGF0YXNldC5icm93c2VyQ29tcGF0aWJpbGl0eSA9IGZhbHNlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBzY3JpcHQuaW5uZXJIVE1MID0gYHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RvciA9ICdzY3JpcHRbZGF0YS1jbGFzc2lmaWNhdGlvbj1cIiR7c2NyaXB0LmRhdGFzZXQuY2xhc3NpZmljYXRpb259XCJdW2RhdGEtZmVhdHVyZT1cIiR7dGhpcy5yZXN1bHQuZmVhdHVyZX1cIl0nLFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvciksXG4gICAgICAgICAgICAgICAgICAgIGxvYWRFdmVudCA9IG5ldyBFdmVudCgnbG9hZCcpO1xuXG4gICAgICAgICAgICAgICAgdGVzdCgpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IGVsZW1lbnQuZGF0YXNldC5icm93c2VyQ29tcGF0aWJpbGl0eSA9IHRydWUpXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBlbGVtZW50LmRhdGFzZXQuYnJvd3NlckNvbXBhdGliaWxpdHlFcnJvciA9IGVycm9yLm1lc3NhZ2UpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IGVsZW1lbnQuZGlzcGF0Y2hFdmVudChsb2FkRXZlbnQpKTtcblxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHRlc3QoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdXBwb3J0ZWQgPSB3aW5kb3cuTXV0YXRpb25PYnNlcnZlciA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1cHBvcnRlZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignTXV0YXRpb24gT2JzZXJ2ZXIgaXMgbm90IHN1cHBvcnRlZCcpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRlc3Q7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1gO1xuXG4gICAgICAgICAgICB0aGlzLl9zY3JpcHQgPSBzY3JpcHQ7XG5cbiAgICAgICAgICAgIHZhbXRpZ2VyLmxvYWQuc2NyaXB0KHtcbiAgICAgICAgICAgICAgICBzY3JpcHQsXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgICAgICByZWplY3RcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfaGFuZGxlRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBwYXJhbWV0ZXJzID0+IG5ldyBCcm93c2VyQ29tcGF0aWJpbGl0eVdpdGhNdXRhdGlvbk9ic2VydmVyKHBhcmFtZXRlcnMpLm1haW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQnJvd3NlckNvbXBhdGliaWxpdHlXaXRoQ2xhc3NlcyBmcm9tICcuL0NsYXNzZXMvaW5kZXguanMnO1xuaW1wb3J0IEJyb3dzZXJDb21wYXRpYmlsaXR5V2l0aEN1c3RvbUVsZW1lbnRzIGZyb20gJy4vQ3VzdG9tRWxlbWVudHMvaW5kZXguanMnO1xuaW1wb3J0IEJyb3dzZXJDb21wYXRpYmlsaXR5V2ViU3RvcmFnZSBmcm9tICcuL1dlYlN0b3JhZ2UvaW5kZXguanMnO1xuaW1wb3J0IEJyb3dzZXJDb21wYXRpYmlsaXR5V2l0aE11dGF0aW9uT2JzZXJ2ZXIgZnJvbSAnLi9NdXRhdGlvbk9ic2VydmVyL2luZGV4LmpzJztcblxuY2xhc3MgQnJvd3NlckNvbXBhdGliaWxpdHkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9yZXN1bHRzID0gbnVsbDtcbiAgICB9XG4gICAgXG4gICAgZ2V0IG1haW4oKSB7XG4gICAgICAgIGNvbnN0IG1haW4gPSB0aGlzLl90ZXN0QnJvd3NlckNvbXBhdGliaWxpdHlcbiAgICAgICAgICAgIC50aGVuKHZhbXRpZ2VyLnJlbW92ZS5icm93c2VyQ29tcGF0aWJpbGl0eVNjcmlwdHMpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLl9zZXRCcm93c2VyQ29tcGF0aWJpbGl0eSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLl9oYW5kbGVFcnJvcik7XG5cbiAgICAgICAgcmV0dXJuIG1haW47XG4gICAgfVxuXG4gICAgZ2V0IF90ZXN0QnJvd3NlckNvbXBhdGliaWxpdHkoKSB7XG4gICAgICAgIGxldCBzZXRCcm93c2VyQ29tcGF0aWJpbGl0eSA9IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIEJyb3dzZXJDb21wYXRpYmlsaXR5V2l0aENsYXNzZXMoKSxcbiAgICAgICAgICAgIEJyb3dzZXJDb21wYXRpYmlsaXR5V2ViU3RvcmFnZSgpLFxuICAgICAgICAgICAgQnJvd3NlckNvbXBhdGliaWxpdHlXaXRoTXV0YXRpb25PYnNlcnZlcigpLFxuICAgICAgICAgICAgQnJvd3NlckNvbXBhdGliaWxpdHlXaXRoQ3VzdG9tRWxlbWVudHMoKVxuICAgICAgICBdKTtcblxuICAgICAgICBzZXRCcm93c2VyQ29tcGF0aWJpbGl0eSA9IHNldEJyb3dzZXJDb21wYXRpYmlsaXR5XG4gICAgICAgICAgICAudGhlbihyZXN1bHRzID0+IHRoaXMuX3Jlc3VsdHMgPSByZXN1bHRzKVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuX2hhbmRsZUVycm9yKTtcblxuICAgICAgICByZXR1cm4gc2V0QnJvd3NlckNvbXBhdGliaWxpdHk7XG4gICAgfVxuXG4gICAgZ2V0IHJlc3VsdHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXN1bHRzO1xuICAgIH1cblxuICAgIGdldCBfc2V0QnJvd3NlckNvbXBhdGliaWxpdHkoKSB7XG4gICAgICAgIHRoaXMucmVzdWx0cy5mb3JFYWNoKHJlc3VsdCA9PiB2YW10aWdlci5zZXQubWV0YURhdGEocmVzdWx0KSk7XG4gICAgfVxuXG4gICAgX2hhbmRsZUVycm9yKGVycm9yKSB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyYW1ldGVycyA9PiBuZXcgQnJvd3NlckNvbXBhdGliaWxpdHkocGFyYW1ldGVycykubWFpbjsiLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIFNldEVsZW1lbnROYW1lIHtcbiAgICBjb25zdHJ1Y3Rvcih7ZWxlbWVudH0pIHtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblxuICAgICAgICB0aGlzLl9lbGVtZW50TmFtZSA9IG51bGw7XG4gICAgfVxuXG4gICAgZ2V0IF9tYWluKCkge1xuICAgICAgICBjb25zdCBtYWluID0gdGhpcy5fc2V0RWxlbWVudE5hbWU7XG5cbiAgICAgICAgcmV0dXJuIG1haW47XG4gICAgfVxuXG4gICAgZ2V0IF9zZXRFbGVtZW50TmFtZSgpIHtcbiAgICAgICAgY29uc3QgcG9zc2libGVFbGVtZW50TmFtZXMgPSB0aGlzLl9wb3NzaWJsZUVsZW1lbnROYW1lcyxcbiAgICAgICAgICAgIGVsZW1lbnROYW1lID0gcG9zc2libGVFbGVtZW50TmFtZXMuZmluZChwb3NzaWJsZUVsZW1lbnROYW1lID0+ICFYUmVnRXhwLm1hdGNoKHBvc3NpYmxlRWxlbWVudE5hbWUsIHZhbXRpZ2VyLnJlZ2V4LmluZGV4RmlsZSkpLFxuICAgICAgICAgICAgZWxlbWVudE5hbWVTaG91bGRCZVNldCA9IGVsZW1lbnROYW1lID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgICAgIGlmIChlbGVtZW50TmFtZVNob3VsZEJlU2V0KVxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmRhdGFzZXQubmFtZSA9IGVsZW1lbnROYW1lO1xuICAgIH1cblxuICAgIGdldCBfcG9zc2libGVFbGVtZW50TmFtZXMoKSB7XG4gICAgICAgIGxldCBlbGVtZW50VXJsID0gdGhpcy5lbGVtZW50LnNyYyA/IHRoaXMuZWxlbWVudC5zcmMgOiB0aGlzLmVsZW1lbnQuaHJlZixcbiAgICAgICAgICAgIGFsbFBvc3NpYmxlRWxlbWVudE5hbWVzLFxuICAgICAgICAgICAgcG9zc2libGVFbGVtZW50TmFtZXMgPSBbXTtcblxuICAgICAgICBpZiAoZWxlbWVudFVybCkge1xuICAgICAgICAgICAgZWxlbWVudFVybCA9IFhSZWdFeHAucmVwbGFjZShlbGVtZW50VXJsLCB2YW10aWdlci5yZWdleC51cmxQYXJhbXMsICcnKTtcbiAgICAgICAgICAgIGFsbFBvc3NpYmxlRWxlbWVudE5hbWVzID0gZWxlbWVudFVybC5zcGxpdCgnLycpO1xuXG4gICAgICAgICAgICBwb3NzaWJsZUVsZW1lbnROYW1lcyA9IGFsbFBvc3NpYmxlRWxlbWVudE5hbWVzLnNsaWNlKGFsbFBvc3NpYmxlRWxlbWVudE5hbWVzLmxlbmd0aCAtIDIpO1xuICAgICAgICAgICAgcG9zc2libGVFbGVtZW50TmFtZXMucmV2ZXJzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBvc3NpYmxlRWxlbWVudE5hbWVzO1xuICAgIH1cblxuICAgIF9oYW5kbGVFcnJvcihlcnJvcikge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcmFtZXRlcnMgPT4gbmV3IFNldEVsZW1lbnROYW1lKHBhcmFtZXRlcnMpLl9tYWluOyIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgU2V0UG9seWZpbGxzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fdW5zdXBwb3J0ZWRGZWF0dXJlcyA9IG51bGw7XG4gICAgfVxuICAgIFxuICAgIGdldCBfbWFpbigpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IHRoaXMuX3NldFVuc3VwcG9ydGVkRmVhdHVyZXNcbiAgICAgICAgICAgIC50aGVuKHRoaXMuX3NldFBvbHlmaWxsTWV0YURhdGEpXG4gICAgICAgICAgICAudGhlbih2YW10aWdlci5sb2FkLnBvbHlmaWxscylcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLl9oYW5kbGVFcnJvcik7XG5cbiAgICAgICAgcmV0dXJuIG1haW47XG4gICAgfVxuXG4gICAgZ2V0IF9zZXRVbnN1cHBvcnRlZEZlYXR1cmVzKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdW5zdXBwb3J0ZWRGZWF0dXJlcyA9IHZhbXRpZ2VyLmdldC51bnN1cHBvcnRlZEZlYXR1cmVzKCk7XG5cbiAgICAgICAgICAgIHRoaXMuX3Vuc3VwcG9ydGVkRmVhdHVyZXMgPSB1bnN1cHBvcnRlZEZlYXR1cmVzO1xuXG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldCBfc2V0UG9seWZpbGxNZXRhRGF0YSgpIHtcbiAgICAgICAgY29uc3QgcG9seWZpbGxQYXJhbWV0ZXJzID0gdGhpcy5fdW5zdXBwb3J0ZWRGZWF0dXJlc1xuICAgICAgICAgICAgLm1hcCh0aGlzLl9wb2x5ZmlsbFBhcmFtcyk7XG5cbiAgICAgICAgcG9seWZpbGxQYXJhbWV0ZXJzLmZvckVhY2gocGFyYW1ldGVycyA9PiB2YW10aWdlci5zZXQubWV0YURhdGEocGFyYW1ldGVycykpO1xuICAgIH1cblxuICAgIF9wb2x5ZmlsbFBhcmFtcyhmZWF0dXJlKSB7XG4gICAgICAgIGNvbnN0IHBhcmFtZXRlcnMgPSB7XG4gICAgICAgICAgICBjbGFzc2lmaWNhdGlvbjogJ0Jyb3dzZXIgUG9seWZpbGwnLFxuICAgICAgICAgICAgZmVhdHVyZSxcbiAgICAgICAgICAgIHN0YXRlOiBcImluaXRpYWxcIixcbiAgICAgICAgICAgIHVybDogdmFtdGlnZXIuZ2V0LnBvbHlmaWxsVXJsKHtmZWF0dXJlfSlcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gcGFyYW1ldGVycztcbiAgICB9XG5cbiAgICBfaGFuZGxlRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBwYXJhbWV0ZXJzID0+IG5ldyBTZXRQb2x5ZmlsbHMocGFyYW1ldGVycykuX21haW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBTZXRWYW10aWdlck1ldGFFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fdmFtdGlnZXJNZXRhRWxlbWVudCA9IG51bGw7XG4gICAgfVxuICAgIFxuICAgIGdldCBfbWFpbigpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IHRoaXMuX3NldFZhbXRpZ2VyTWV0YUVsZW1lbnRcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuX2xvYWRWYW10aWdlck1ldGFFbGVtZW50KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuX2hhbmRsZUVycm9yKTtcblxuICAgICAgICByZXR1cm4gbWFpbjtcbiAgICB9XG5cbiAgICBnZXQgX3NldFZhbXRpZ2VyTWV0YUVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBsZXQgdmFtdGlnZXJNZXRhRWxlbWVudCA9IGRvY3VtZW50LmhlYWQucXVlcnlTZWxlY3Rvcih0aGlzLl9zZWxlY3Rvcik7XG5cbiAgICAgICAgICAgIGlmICghdmFtdGlnZXJNZXRhRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHZhbXRpZ2VyTWV0YUVsZW1lbnQgPSB0aGlzLl9uZXdWYW10aWdlck1ldGFFbGVtZW50O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fdmFtdGlnZXJNZXRhRWxlbWVudCA9IHZhbXRpZ2VyTWV0YUVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgX2xvYWRWYW10aWdlck1ldGFFbGVtZW50KCkge1xuICAgICAgICBjb25zdCB2YW10aWdlck1ldGFFbGVtZW50ID0gdGhpcy5fdmFtdGlnZXJNZXRhRWxlbWVudCxcbiAgICAgICAgICAgIGxhc3RNZXRhRWxlbWVudCA9IHZhbXRpZ2VyTWV0YUVsZW1lbnQgPyB0aGlzLl9sYXN0TWV0YUVsZW1lbnQgOiBudWxsLFxuICAgICAgICAgICAgcmVmZXJlbmNlRWxlbWVudCA9IGxhc3RNZXRhRWxlbWVudCA/IGxhc3RNZXRhRWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmcgOiBudWxsLFxuICAgICAgICAgICAgcGFyZW50ID0gZG9jdW1lbnQuaGVhZCxcbiAgICAgICAgICAgIHZhbXRpZ2VyTWV0YUVsZW1lbnRTaG91bGRCZUxvYWRlZCA9IHZhbXRpZ2VyTWV0YUVsZW1lbnQgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgICB2YW10aWdlck1ldGFFbGVtZW50U2hvdWxkQmVJbnNlcnRlZCA9IHZhbXRpZ2VyTWV0YUVsZW1lbnRTaG91bGRCZUxvYWRlZCAmJiByZWZlcmVuY2VFbGVtZW50ID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgdmFtdGlnZXJNZXRhRWxlbWVudFNob3VsZEJlQXBwZW5kZWQgPSB2YW10aWdlck1ldGFFbGVtZW50U2hvdWxkQmVMb2FkZWQgJiYgIXJlZmVyZW5jZUVsZW1lbnQgPyB0cnVlIDogZmFsc2U7XG5cbiAgICAgICAgaWYgKHZhbXRpZ2VyTWV0YUVsZW1lbnRTaG91bGRCZUluc2VydGVkKVxuICAgICAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShcbiAgICAgICAgICAgICAgICB2YW10aWdlck1ldGFFbGVtZW50LFxuICAgICAgICAgICAgICAgIHJlZmVyZW5jZUVsZW1lbnRcbiAgICAgICAgICAgICk7XG4gICAgICAgIGVsc2UgaWYgKHZhbXRpZ2VyTWV0YUVsZW1lbnRTaG91bGRCZUFwcGVuZGVkKVxuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKHZhbXRpZ2VyTWV0YUVsZW1lbnQpO1xuICAgIH1cblxuICAgIGdldCBfbmV3VmFtdGlnZXJNZXRhRWxlbWVudCgpIHtcbiAgICAgICAgY29uc3QgbmV3VmFtdGlnZXJNZXRhRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21ldGEnKTtcblxuICAgICAgICBuZXdWYW10aWdlck1ldGFFbGVtZW50LmRhdGFzZXQudmFtdGlnZXIgPSB0cnVlO1xuICAgICAgICBuZXdWYW10aWdlck1ldGFFbGVtZW50LmRhdGFzZXQubmFtZSA9ICdWYW10aWdlciBNZXRhIEVsZW1lbnQnO1xuXG4gICAgICAgIHJldHVybiBuZXdWYW10aWdlck1ldGFFbGVtZW50O1xuICAgIH1cblxuICAgIGdldCBfbGFzdE1ldGFFbGVtZW50KCkge1xuICAgICAgICBjb25zdCBzZWxlY3RvciA9ICdtZXRhOmxhc3Qtb2YtdHlwZScsXG4gICAgICAgICAgICBsYXN0TWV0YUVsZW1lbnQgPSBkb2N1bWVudC5oZWFkLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG4gICAgICAgIHJldHVybiBsYXN0TWV0YUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgX2hhbmRsZUVycm9yKGVycm9yKSB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyYW1ldGVycyA9PiBuZXcgU2V0VmFtdGlnZXJNZXRhRWxlbWVudChwYXJhbWV0ZXJzKS5fbWFpbjsiLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIFNldE1ldGFEYXRhIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJhbWV0ZXJzKSB7XG4gICAgICAgIHRoaXMuX3BhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzO1xuICAgICAgICB0aGlzLl9jbGFzc2lmaWNhdGlvbiA9IHBhcmFtZXRlcnMuY2xhc3NpZmljYXRpb247XG5cbiAgICAgICAgdGhpcy5fY2xhc3NpZmljYXRpb25FbGVtZW50ID0gbnVsbDtcbiAgICB9XG5cbiAgICBnZXQgX21haW4oKSB7XG4gICAgICAgIGxldCBtYWluO1xuXG4gICAgICAgIGlmICh0aGlzLl9kYXRhSXNWYWxpZClcbiAgICAgICAgICAgIG1haW4gPSB0aGlzLl9zZXRDbGFzc2lmaWNhdGlvbkVsZW1lbnRcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLl9zZXRNZXRhRGF0YUVsZW1lbnQpXG4gICAgICAgICAgICAgICAgLmNhdGNoKHRoaXMuX2hhbmRsZUVycm9yKTtcblxuICAgICAgICByZXR1cm4gbWFpbjtcbiAgICB9XG5cbiAgICBnZXQgX2RhdGFJc1ZhbGlkKCkge1xuICAgICAgICBsZXQgZGF0YUlzVmFsaWQgPSB0aGlzLl9jbGFzc2lmaWNhdGlvbiA/IHRydWUgOiBmYWxzZTtcblxuICAgICAgICByZXR1cm4gZGF0YUlzVmFsaWQ7XG4gICAgfVxuXG4gICAgZ2V0IF9zZXRDbGFzc2lmaWNhdGlvbkVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBsZXQgY2xhc3NpZmljYXRpb25FbGVtZW50ID0gdmFtdGlnZXIuZ2V0LmNsYXNzaWZpZWRNZXRhRGF0YUVsZW1lbnQoe1xuICAgICAgICAgICAgICAgIGNsYXNzaWZpY2F0aW9uOiB0aGlzLl9jbGFzc2lmaWNhdGlvblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuX2NsYXNzaWZpY2F0aW9uRWxlbWVudCA9IGNsYXNzaWZpY2F0aW9uRWxlbWVudDtcblxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgX3NldE1ldGFEYXRhRWxlbWVudCgpIHtcbiAgICAgICAgY29uc3QgbWV0YURhdGFQcm9wZXJ0aWVzID0gdGhpcy5fbWV0YURhdGFQcm9wZXJ0aWVzLFxuICAgICAgICAgICAgbWV0YURhdGFFbGVtZW50ID0gbWV0YURhdGFQcm9wZXJ0aWVzLmxlbmd0aCA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21ldGEnKSA6IHZhbXRpZ2VyLmlnbm9yZTtcblxuICAgICAgICBpZiAobWV0YURhdGFFbGVtZW50KSB7XG4gICAgICAgICAgICBtZXRhRGF0YVByb3BlcnRpZXMuZm9yRWFjaChwcm9wZXJ0eSA9PiBtZXRhRGF0YUVsZW1lbnQuZGF0YXNldFtwcm9wZXJ0eV0gPSB0aGlzLl9wYXJhbWV0ZXJzW3Byb3BlcnR5XSk7XG5cbiAgICAgICAgICAgIHRoaXMuX2NsYXNzaWZpY2F0aW9uRWxlbWVudC5hcHBlbmRDaGlsZChtZXRhRGF0YUVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IF9tZXRhRGF0YVByb3BlcnRpZXMoKSB7XG4gICAgICAgIGNvbnN0IG1ldGFEYXRhUHJvcGVydGllcyA9IE9iamVjdFxuICAgICAgICAgICAgLmtleXModGhpcy5fcGFyYW1ldGVycylcbiAgICAgICAgICAgIC5maWx0ZXIocHJvcGVydHkgPT4gIVhSZWdFeHAubWF0Y2gocHJvcGVydHksIHZhbXRpZ2VyLnJlZ2V4LmV4Y2x1ZGVNZXRhRGF0YSkpO1xuXG4gICAgICAgIHJldHVybiBtZXRhRGF0YVByb3BlcnRpZXM7XG4gICAgfVxuXG4gICAgX2hhbmRsZUVycm9yKGVycm9yKSB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyYW1ldGVycyA9PiBuZXcgU2V0TWV0YURhdGEocGFyYW1ldGVycykuX21haW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgU2V0QnJvd3NlckNvbXBhdGliaWxpdHkgZnJvbSAnLi9Ccm93c2VyQ29tcGF0aWJpbGl0eS9pbmRleC5qcyc7XG5pbXBvcnQgU2V0RWxlbWVudE5hbWUgZnJvbSAnLi9FbGVtZW50TmFtZS9pbmRleC5qcyc7XG5pbXBvcnQgU2V0UG9seWZpbGxzIGZyb20gJy4vUG9seWZpbGxzL2luZGV4LmpzJztcbmltcG9ydCBTZXRWYW10aWdlck1ldGFFbGVtZW50IGZyb20gJy4vTWV0YUVsZW1lbnQvaW5kZXguanMnO1xuaW1wb3J0IFNldE1ldGFEYXRhIGZyb20gJy4vTWV0YURhdGEvaW5kZXguanMnO1xuXG5jbGFzcyBWYW10aWdlclNldCB7XG4gICAgc3RhdGljIGdldCBicm93c2VyQ29tcGF0aWJpbGl0eSgpIHtcbiAgICAgICAgcmV0dXJuIFNldEJyb3dzZXJDb21wYXRpYmlsaXR5O1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgZWxlbWVudE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBTZXRFbGVtZW50TmFtZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IHBvbHlmaWxscygpIHtcbiAgICAgICAgcmV0dXJuIFNldFBvbHlmaWxscztcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IHZhbXRpZ2VyTWV0YUVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiBTZXRWYW10aWdlck1ldGFFbGVtZW50O1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgbWV0YURhdGEoKSB7XG4gICAgICAgIHJldHVybiBTZXRNZXRhRGF0YTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFZhbXRpZ2VyU2V0OyIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgVmFtdGlnZXJMb2FkIHtcbiAgICBjb25zdHJ1Y3Rvcih7c2NyaXB0LCByZXNvbHZlLCByZWplY3R9KSB7XG4gICAgICAgIHRoaXMuc2NyaXB0ID0gc2NyaXB0O1xuICAgICAgICB0aGlzLnJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICB0aGlzLnJlamVjdCA9IHJlamVjdDtcblxuICAgICAgICB0aGlzLl9zY3JpcHRUeXBlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbGFzdEVsZW1lbnRTZWxlY3RvciA9IG51bGw7XG4gICAgICAgIHRoaXMuX2xhc3RFbGVtZW50ID0gbnVsbDtcbiAgICB9XG5cbiAgICBnZXQgX21haW4oKSB7XG4gICAgICAgIGNvbnN0IG1haW4gPSB0aGlzLl9zZXRTY3JpcHRUeXBlXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLl9zZXRMYXN0RWxlbWVudFNlbGVjdG9yKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5fc2V0TGFzdEVsZW1lbnQpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLl9zZXRTb3VyY2VVcmwpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLl9sb2FkU2NyaXB0KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuX2hhbmRsZUVycm9yKTtcblxuICAgICAgICB0aGlzLnNjcmlwdC5kYXRhc2V0LnZhbXRpZ2VyID0gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gbWFpbjtcbiAgICB9XG5cbiAgICBnZXQgX3NldFNjcmlwdFR5cGUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5zY3JpcHQubG9jYWxOYW1lID09PSAnc2NyaXB0JylcbiAgICAgICAgICAgICAgICB0aGlzLl9zY3JpcHRUeXBlID0gJ3NjcmlwdCc7XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnNjcmlwdC5sb2NhbE5hbWUgPT09ICdsaW5rJyAmJiB0aGlzLnNjcmlwdC5yZWwgPT09ICdzdHlsZXNoZWV0JylcbiAgICAgICAgICAgICAgICB0aGlzLl9zY3JpcHRUeXBlID0gJ3N0eWxlc2hlZXQnO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fc2NyaXB0VHlwZSlcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignU2NyaXB0IHR5cGUgbm90IHNldCcpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0IF9zZXRMYXN0RWxlbWVudFNlbGVjdG9yKCkge1xuICAgICAgICBjb25zdCBzZWxlY3RvcnMgPSBuZXcgU2V0KCk7XG5cbiAgICAgICAgbGV0IHNlbGVjdG9yO1xuXG4gICAgICAgIGlmICh0aGlzLnNjcmlwdC5kYXRhc2V0LmNsYXNzaWZpY2F0aW9uKSB7XG4gICAgICAgICAgICBzZWxlY3RvcnMuYWRkKGBbZGF0YS1jbGFzc2lmaWNhdGlvbj1cIiR7dGhpcy5zY3JpcHQuZGF0YXNldC5jbGFzc2lmaWNhdGlvbn1cIl06bGFzdC1vZi10eXBlYCk7XG4gICAgICAgICAgICBzZWxlY3RvcnMuYWRkKGBbZGF0YS1jbGFzc2lmaWNhdGlvbl06bGFzdC1vZi10eXBlYCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxlY3RvcnMuYWRkKGAke3RoaXMuc2NyaXB0LmxvY2FsTmFtZX06bGFzdC1vZi10eXBlYCk7XG5cbiAgICAgICAgc2VsZWN0b3IgPSBBcnJheVxuICAgICAgICAgICAgLmZyb20oc2VsZWN0b3JzKVxuICAgICAgICAgICAgLmpvaW4oJyxcXG4nKTtcblxuICAgICAgICB0aGlzLl9sYXN0RWxlbWVudFNlbGVjdG9yID0gc2VsZWN0b3I7XG4gICAgfVxuXG4gICAgZ2V0IF9zZXRMYXN0RWxlbWVudCgpIHtcbiAgICAgICAgY29uc3QgbGFzdEVsZW1lbnQgPSBkb2N1bWVudC5oZWFkLnF1ZXJ5U2VsZWN0b3IodGhpcy5fbGFzdEVsZW1lbnRTZWxlY3Rvcik7XG5cbiAgICAgICAgdGhpcy5fbGFzdEVsZW1lbnQgPSBsYXN0RWxlbWVudDtcbiAgICB9XG5cbiAgICBnZXQgX3NldFNvdXJjZVVybCgpIHtcbiAgICAgICAgbGV0IHNvdXJjZVVybCA9IHRoaXMuc2NyaXB0LnNyYyxcbiAgICAgICAgICAgIHNldFNvdXJjZVVybFRvRGF0YVVybCA9ICFzb3VyY2VVcmwgJiYgdGhpcy5zY3JpcHQuZGF0YXNldC51cmw7XG4gICAgICAgIFxuICAgICAgICBpZiAoc2V0U291cmNlVXJsVG9EYXRhVXJsKVxuICAgICAgICAgICAgdGhpcy5zY3JpcHQuc3JjID0gdGhpcy5zY3JpcHQuZGF0YXNldC51cmw7XG4gICAgfVxuXG4gICAgZ2V0IF9sb2FkU2NyaXB0KCkge1xuICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLl9sYXN0RWxlbWVudC5wYXJlbnRFbGVtZW50LFxuICAgICAgICAgICAgcmVmZXJlbmNlRWxlbWVudCA9IHRoaXMuX2xhc3RFbGVtZW50Lm5leHRFbGVtZW50U2libGluZztcblxuICAgICAgICB0aGlzLnNjcmlwdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZXZlbnQgPT4gdGhpcy5yZXNvbHZlKHRoaXMuc2NyaXB0KSk7XG4gICAgICAgIHRoaXMuc2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3IgPT4gdGhpcy5yZWplY3Qoe1xuICAgICAgICAgICAgZXJyb3IsXG4gICAgICAgICAgICBzY3JpcHQ6IHRoaXMuc2NyaXB0XG4gICAgICAgIH0pKTtcblxuICAgICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKFxuICAgICAgICAgICAgdGhpcy5zY3JpcHQsXG4gICAgICAgICAgICByZWZlcmVuY2VFbGVtZW50XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgX2hhbmRsZUVycm9yKGVycm9yKSB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyYW1ldGVycyA9PiBuZXcgVmFtdGlnZXJMb2FkKHBhcmFtZXRlcnMpLl9tYWluOyIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgTG9hZFBvbHlmaWxscyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX3BvbHlmaWxsTWV0YUVsZW1lbnRzID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc2NyaXB0TWFwID0gbnVsbDtcbiAgICB9XG4gICAgXG4gICAgZ2V0IF9tYWluKCkge1xuICAgICAgICBjb25zdCBtYWluID0gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuX3NldFBvbHlmaWxsTWV0YUVsZW1lbnRzKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5fc2V0U2NyaXB0TWFwKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5fbG9hZFNjcmlwdHMpXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5faGFuZGxlRXJyb3IpO1xuICAgIH1cblxuICAgIGdldCBfc2V0UG9seWZpbGxNZXRhRWxlbWVudHMoKSB7XG4gICAgICAgIGNvbnN0IHBvbHlmaWxsTWV0YUVsZW1lbnRzID0gdmFtdGlnZXIuZ2V0LnBvbHlmaWxsTWV0YUVsZW1lbnRzKCk7XG5cbiAgICAgICAgdGhpcy5fcG9seWZpbGxNZXRhRWxlbWVudHMgPSAgcG9seWZpbGxNZXRhRWxlbWVudHM7XG4gICAgfVxuXG4gICAgZ2V0IF9zZXRTY3JpcHRNYXAoKSB7XG4gICAgICAgIGNvbnN0IHNjcmlwdE1hcCA9IG5ldyBNYXAoKTtcblxuICAgICAgICBsZXQgc2NyaXB0LFxuICAgICAgICAgICAgZGF0YVByb3BlcnRpZXM7XG5cbiAgICAgICAgdGhpcy5fcG9seWZpbGxNZXRhRWxlbWVudHMuZm9yRWFjaChwb2x5ZmlsbE1ldGFFbGVtZW50ID0+IHtcbiAgICAgICAgICAgIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICAgICAgZGF0YVByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyhwb2x5ZmlsbE1ldGFFbGVtZW50LmRhdGFzZXQpO1xuXG4gICAgICAgICAgICBzY3JpcHQuc3JjID0gcG9seWZpbGxNZXRhRWxlbWVudC5kYXRhc2V0LnVybDtcblxuICAgICAgICAgICAgc2NyaXB0TWFwLnNldChzY3JpcHQsIHBvbHlmaWxsTWV0YUVsZW1lbnQpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9zY3JpcHRNYXAgPSBzY3JpcHRNYXA7XG4gICAgfVxuXG4gICAgZ2V0IF9zY3JpcHRzKCkge1xuICAgICAgICBjb25zdCBzY3JpcHRzID0gQXJyYXkuZnJvbSh0aGlzLl9zY3JpcHRNYXAua2V5cygpKTtcblxuICAgICAgICByZXR1cm4gc2NyaXB0cztcbiAgICB9XG5cbiAgICBnZXQgX2xvYWRTY3JpcHRzKCkge1xuICAgICAgICBsZXQgbG9hZFNjcmlwdHMgPSBQcm9taXNlLmFsbChcbiAgICAgICAgICAgIHRoaXMuX3NjcmlwdHMubWFwKHNjcmlwdCA9PiB0aGlzLl9sb2FkU2NyaXB0KHNjcmlwdCkpXG4gICAgICAgICk7XG5cbiAgICAgICAgbG9hZFNjcmlwdHMgPSBsb2FkU2NyaXB0c1xuICAgICAgICAgICAgLnRoZW4oc2NyaXB0cyA9PiB0aGlzLl91cGRhdGVNZXRhRGF0YShzY3JpcHRzKSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLl9oYW5kbGVFcnJvcik7XG5cbiAgICAgICAgcmV0dXJuIGxvYWRTY3JpcHRzO1xuICAgIH1cblxuICAgIF9sb2FkU2NyaXB0KHNjcmlwdCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWV0YUVsZW1lbnQgPSB0aGlzLl9zY3JpcHRNYXAuZ2V0KHNjcmlwdCk7XG5cbiAgICAgICAgICAgIHNjcmlwdC5kYXRhc2V0LnN0YXRlID0gJ2xvYWRpbmcnO1xuICAgICAgICAgICAgbWV0YUVsZW1lbnQuZGF0YXNldC5zdGF0ZSA9ICdsb2FkaW5nJztcblxuICAgICAgICAgICAgdmFtdGlnZXIubG9hZC5zY3JpcHQoe1xuICAgICAgICAgICAgICAgIHNjcmlwdCxcbiAgICAgICAgICAgICAgICByZXNvbHZlLFxuICAgICAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF91cGRhdGVNZXRhRGF0YShzY3JpcHRzKSB7XG4gICAgICAgIGxldCBtZXRhRWxlbWVudDtcbiAgICAgICAgXG4gICAgICAgIHNjcmlwdHMuZm9yRWFjaChzY3JpcHQgPT4ge1xuICAgICAgICAgICAgbWV0YUVsZW1lbnQgPSB0aGlzLl9zY3JpcHRNYXAuZ2V0KHNjcmlwdCk7XG5cbiAgICAgICAgICAgIHNjcmlwdC5kYXRhc2V0LnN0YXRlID0gJ2xvYWRlZCc7XG4gICAgICAgICAgICBtZXRhRWxlbWVudC5kYXRhc2V0LnN0YXRlID0gJ2xvYWRlZCc7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgX2hhbmRsZUVycm9yKGVycm9yKSB7XG4gICAgICAgIHRocm93IGVycm9yXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBwYXJhbWV0ZXJzID0+IG5ldyBMb2FkUG9seWZpbGxzKHBhcmFtZXRlcnMpLl9tYWluOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IExvYWRTY3JpcHQgZnJvbSAnLi9TY3JpcHQvaW5kZXguanMnO1xuaW1wb3J0IFBvbHlmaWxscyBmcm9tICcuL1BvbHlmaWxscy9pbmRleC5qcydcblxuY2xhc3MgVmFtdGlnZXJMb2FkIHtcbiAgICBzdGF0aWMgZ2V0IHNjcmlwdCgpIHtcbiAgICAgICAgcmV0dXJuIExvYWRTY3JpcHQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBwb2x5ZmlsbHMoKSB7XG4gICAgICAgIHJldHVybiBQb2x5ZmlsbHM7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBWYW10aWdlckxvYWQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBJbmRleEZpbGVSZWdleCB7XG4gICAgc3RhdGljIGdldCBfbWFpbigpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IHRoaXMuX3JlZ2V4O1xuXG4gICAgICAgIHJldHVybiBtYWluO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgX3JlZ2V4KCkge1xuICAgICAgICBjb25zdCBwYXR0ZXJuID0gJ15pbmRleCcsXG4gICAgICAgICAgICByZWdleCA9IFhSZWdFeHAocGF0dGVybik7XG5cbiAgICAgICAgcmV0dXJuIHJlZ2V4O1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW5kZXhGaWxlUmVnZXguX21haW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBVcmxQYXJhbXMge1xuICAgIHN0YXRpYyBnZXQgX21haW4oKSB7XG4gICAgICAgIGNvbnN0IG1haW4gPSB0aGlzLl9yZWdleDtcblxuICAgICAgICByZXR1cm4gbWFpbjtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IF9yZWdleCgpIHtcbiAgICAgICAgY29uc3QgcGF0dGVybiA9IGBcbiAgICAgICAgICAgICAgICBcXFxcP1xuICAgICAgICAgICAgICAgICg/PHVybFBhcmFtcz5cbiAgICAgICAgICAgICAgICAgICAgLipcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAkYCxcbiAgICAgICAgICAgIHJlZ2V4ID0gWFJlZ0V4cChwYXR0ZXJuLCAneG1ucycpO1xuXG4gICAgICAgIHJldHVybiByZWdleDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFVybFBhcmFtcy5fbWFpbjsiLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIEV4Y2x1ZGVNZXRhRGF0YSB7XG4gICAgc3RhdGljIGdldCBfbWFpbigpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IHRoaXMuX3JlZ2V4O1xuXG4gICAgICAgIHJldHVybiBtYWluO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgX3JlZ2V4KCkge1xuICAgICAgICBjb25zdCBwYXR0ZXJuID0gYF5cbiAgICAgICAgICAgICAgICBjbGFzc2lmaWNhdGlvblxuICAgICAgICAgICAgICAgIHxcbiAgICAgICAgICAgICAgICB2YW10aWdlclxuICAgICAgICAgICAgJGAsXG4gICAgICAgICAgICByZWdleCA9IFhSZWdFeHAocGF0dGVybiwgJ3hpbicpO1xuXG4gICAgICAgIHJldHVybiByZWdleDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV4Y2x1ZGVNZXRhRGF0YS5fbWFpbjsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBpbmRleEZpbGUgZnJvbSAnLi9JbmRleEZpbGUvaW5kZXguanMnO1xuaW1wb3J0IHVybFBhcmFtcyBmcm9tICcuL1VybFBhcmFtcy9pbmRleC5qcyc7XG5pbXBvcnQgZXhjbHVkZU1ldGFEYXRhIGZyb20gJy4vRXhjbHVkZU1ldGFEYXRhL2luZGV4LmpzJztcblxuY2xhc3MgVmFtdGlnZXJSZWdleCB7XG4gICAgc3RhdGljIGdldCBpbmRleEZpbGUoKSB7XG4gICAgICAgIHJldHVybiBpbmRleEZpbGU7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCB1cmxQYXJhbXMoKSB7XG4gICAgICAgIHJldHVybiB1cmxQYXJhbXM7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBleGNsdWRlTWV0YURhdGEoKSB7XG4gICAgICAgIHJldHVybiBleGNsdWRlTWV0YURhdGE7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBWYW10aWdlclJlZ2V4OyIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgVmFtdGlnZXJSZW1vdmVFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3Rvcih7ZWxlbWVudH0pIHtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB9XG5cbiAgICBnZXQgX21haW4oKSB7XG4gICAgICAgIGxldCBtYWluID0gdGhpcy5lbGVtZW50ID8gdGhpcy5fcmVtb3ZlRWxlbWVudCA6IHZhbXRpZ2VyLmlnbm9yZTtcblxuICAgICAgICBpZiAodGhpcy5lbGVtZW50KVxuICAgICAgICAgICAgbWFpbiA9IHRoaXMuX3JlbW92ZUVsZW1lbnQ7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZUVycm9yKG5ldyBFcnJvcignRWxlbWVudCBub3QgcmVtb3ZlZDogTm8gZWxlbWVudCBkZWZpbmVkJykpO1xuXG4gICAgICAgIHJldHVybiBtYWluO1xuICAgIH1cblxuICAgIGdldCBfcmVtb3ZlRWxlbWVudCgpIHtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5lbGVtZW50LnBhcmVudEVsZW1lbnQsXG4gICAgICAgICAgICBlbGVtZW50Q2FuQmVSZW1vdmVkID0gcGFyZW50ID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgICAgIGlmIChlbGVtZW50Q2FuQmVSZW1vdmVkKVxuICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKHRoaXMuZWxlbWVudCk7XG4gICAgfVxuXG4gICAgX2hhbmRsZUVycm9yKGVycm9yKSB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyYW1ldGVycyA9PiBuZXcgVmFtdGlnZXJSZW1vdmVFbGVtZW50KHBhcmFtZXRlcnMpLl9tYWluOyIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgQnJvd3NlckNvbXBhdGliaWxpdHlTY3JpcHRzIHtcbiAgICBnZXQgX21haW4oKSB7XG4gICAgICAgIGNvbnN0IG1haW4gPSB0aGlzLl9yZW1vdmVCcm93c2VyQ29tcGF0aWJpbGl0eVNjcmlwdHNcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLl9oYW5kbGVFcnJvcik7XG5cbiAgICAgICAgcmV0dXJuIG1haW47XG4gICAgfVxuXG4gICAgZ2V0IF9yZW1vdmVCcm93c2VyQ29tcGF0aWJpbGl0eVNjcmlwdHMoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZW1vdmVTY3JpcHRQYXJhbXMgPSBBcnJheVxuICAgICAgICAgICAgICAgIC5mcm9tKHRoaXMuX3NjcmlwdHMpXG4gICAgICAgICAgICAgICAgLm1hcChzY3JpcHQgPT4gT2JqZWN0KHtlbGVtZW50OiBzY3JpcHR9KSk7XG5cbiAgICAgICAgICAgIHJlbW92ZVNjcmlwdFBhcmFtcy5mb3JFYWNoKHZhbXRpZ2VyLnJlbW92ZS5lbGVtZW50KTtcblxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgX3NjcmlwdHMoKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuX3BhcmVudCxcbiAgICAgICAgICAgIHNlbGVjdG9yID0gdGhpcy5fc2VsZWN0b3IsXG4gICAgICAgICAgICBzY3JpcHRzID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXG4gICAgICAgIHJldHVybiBzY3JpcHRzO1xuICAgIH1cblxuICAgIGdldCBfcGFyZW50KCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuaGVhZDtcbiAgICB9XG5cbiAgICBnZXQgX3NlbGVjdG9yKCkge1xuICAgICAgICBjb25zdCBzZWxlY3RvciA9IGBcbiAgICAgICAgICAgIHNjcmlwdFtkYXRhLWJyb3dzZXItY29tcGF0aWJpbGl0eV1cbiAgICAgICAgYDtcblxuICAgICAgICByZXR1cm4gc2VsZWN0b3I7XG4gICAgfVxuXG4gICAgX2hhbmRsZUVycm9yKGVycm9yKSB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyYW1ldGVycyA9PiBuZXcgQnJvd3NlckNvbXBhdGliaWxpdHlTY3JpcHRzKCkuX21haW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgVmFtdGlnZXJFbGVtZW50IGZyb20gJy4vRWxlbWVudC9pbmRleC5qcyc7XG5pbXBvcnQgQnJvd3NlckNvbXBhdGliaWxpdHlTY3JpcHRzIGZyb20gJy4vQnJvd3NlckNvbXBhdGliaWxpdHlTY3JpcHRzL2luZGV4LmpzJztcblxuY2xhc3MgVmFtdGlnZXJSZW1vdmUge1xuICAgIHN0YXRpYyBnZXQgZWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIFZhbXRpZ2VyRWxlbWVudDtcbiAgICB9XG4gICAgXG4gICAgc3RhdGljIGdldCBicm93c2VyQ29tcGF0aWJpbGl0eVNjcmlwdHMoKSB7XG4gICAgICAgIHJldHVybiBCcm93c2VyQ29tcGF0aWJpbGl0eVNjcmlwdHM7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBWYW10aWdlclJlbW92ZTsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBWYW10aWdlckdldCBmcm9tICcuL0dldC9pbmRleC5qcyc7XG5pbXBvcnQgVmFtdGlnZXJTZXQgZnJvbSAnLi9TZXQvaW5kZXguanMnO1xuaW1wb3J0IFZhbXRpZ2VyTG9hZCBmcm9tICcuL0xvYWQvaW5kZXguanMnO1xuaW1wb3J0IFZhbXRpZ2VyUmVnZXggZnJvbSAnLi9SZWdleC9pbmRleC5qcyc7XG5pbXBvcnQgVmFtdGlnZXJSZW1vdmUgZnJvbSAnLi9SZW1vdmUvaW5kZXguanMnO1xuXG5jbGFzcyBWYW10aWdlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkRWxlbWVudHMgPSB7fTtcbiAgICB9XG4gICAgXG4gICAgbWFpbigpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IHRoaXMuc2V0LnZhbXRpZ2VyTWV0YUVsZW1lbnQoKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5zZXQuYnJvd3NlckNvbXBhdGliaWxpdHkoKSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuc2V0LnBvbHlmaWxscygpKVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuX2hhbmRsZUVycm9yKTtcblxuICAgICAgICByZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkJywgdGhpcy5tYWluKTtcblxuICAgICAgICByZXR1cm4gbWFpbjtcbiAgICB9XG5cbiAgICBnZXQgaWdub3JlKCkge31cblxuICAgIGdldCBnZXQoKSB7XG4gICAgICAgIHJldHVybiBWYW10aWdlckdldDtcbiAgICB9XG5cbiAgICBnZXQgc2V0KCkge1xuICAgICAgICByZXR1cm4gVmFtdGlnZXJTZXQ7XG4gICAgfVxuXG4gICAgZ2V0IGxvYWQoKSB7XG4gICAgICAgIHJldHVybiBWYW10aWdlckxvYWQ7XG4gICAgfVxuXG4gICAgZ2V0IHJlZ2V4KCkge1xuICAgICAgICByZXR1cm4gVmFtdGlnZXJSZWdleDtcbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZEVsZW1lbnRzO1xuICAgIH1cblxuICAgIGdldCByZW1vdmUoKSB7XG4gICAgICAgIHJldHVybiBWYW10aWdlclJlbW92ZTtcbiAgICB9XG5cbiAgICBfaGFuZGxlRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBWYW10aWdlcjsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBWYW10aWdlciBmcm9tICcuL01haW4vaW5kZXguanMnO1xuXG53aW5kb3cudmFtdGlnZXIgPSBuZXcgVmFtdGlnZXIoKTtcblxuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGV2ZW50ID0+IHZhbXRpZ2VyLm1haW4oKSk7Il0sIm5hbWVzIjpbIlZhbXRpZ2VyTWV0YUVsZW1lbnQiLCJDbGFzc2lmaWVkTWV0YURhdGFFbGVtZW50IiwiVW5zdXBwb3J0ZWRGZWF0dXJlcyIsIkJyb3dzZXJDb21wYXRpYmlsaXR5RWxlbWVudCIsIlBvbHlmaWxsVXJsIiwiUG9seWZpbGxNZXRhRWxlbWVudHMiLCJQb2x5ZmlsbE1ldGFFbGVtZW50IiwiQnJvd3NlckNvbXBhdGliaWxpdHlXZWJTdG9yYWdlIiwiQnJvd3NlckNvbXBhdGliaWxpdHlXaXRoTXV0YXRpb25PYnNlcnZlciIsIkJyb3dzZXJDb21wYXRpYmlsaXR5V2l0aEN1c3RvbUVsZW1lbnRzIiwiU2V0RWxlbWVudE5hbWUiLCJTZXRQb2x5ZmlsbHMiLCJTZXRWYW10aWdlck1ldGFFbGVtZW50IiwiU2V0TWV0YURhdGEiLCJWYW10aWdlckxvYWQiLCJCcm93c2VyQ29tcGF0aWJpbGl0eVNjcmlwdHMiXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sbUJBQW1CLENBQUM7SUFDdEIsSUFBSSxLQUFLLEdBQUc7UUFDUixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUM7O1FBRXZDLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7O0lBRUQsSUFBSSxvQkFBb0IsR0FBRztRQUN2QixJQUFJLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsQ0FBQzs7UUFFekUsSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQ3RCLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzs7WUFFbEUsUUFBUSxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDO1NBQ3hFOztRQUVELE9BQU8sbUJBQW1CLENBQUM7S0FDOUI7O0lBRUQsSUFBSSxTQUFTLEdBQUc7UUFDWixNQUFNLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQzs7UUFFdkMsT0FBTyxRQUFRLENBQUM7S0FD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