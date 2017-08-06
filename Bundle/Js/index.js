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
        return Promise.reject(error);
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
        return Promise.reject(error);
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
        return Promise.reject(error);
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
        return Promise.reject(error);
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
        return Promise.reject(error);
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
        return Promise.reject(error);
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
        return Promise.reject(error);
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
        return Promise.reject(error);
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
        return Promise.reject(error);
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
        return Promise.reject(error);
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
        return Promise.reject(error);
    }
}

var Polyfills = parameters => new LoadPolyfills(parameters)._main;

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

var UserInterface$1 = parameters => new UserInterface(parameters)._main;

class VamtigerTest {
    constructor() {
        this._script = undefined;
    }
    
    get _main() {
        const main = Promise.resolve()
            .then(() => this._setScript)
            .then(() => this._loadTest)
            .then(() => this._setMetaData)
            .catch(this._handleError);
    }

    get _setScript() {
        const localUrl = XRegExp.match(document.URL, vamtiger.regex.localUrl);

        let script;

        if (localUrl) {
            script = document.createElement('script');

            script.src = this._url;

            this._script = script;
        }
    }

    get _loadTest() {
        return new Promise((resolve, reject) => {
            if (this._script)
                vamtiger.load.script({
                    script: this._script,
                    resolve,
                    reject
                });
            else
                resolve();
        });
    }

    get _url() {
        const url = 'Js/Test/index.js';

        return url;
    }

    _handleError(error) {
        return Promise.reject(error);
    }
}

var VamtigerTest$1 = parameters => new VamtigerTest(parameters)._main;

class VamtigerLoad {
    static get script() {
        return LoadScript;
    }

    static get polyfills() {
        return Polyfills;
    }

    static get userInterface() {
        return UserInterface$1;
    }

    static get test() {
        return VamtigerTest$1;
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

class UrlParams$1 {
    static get _main() {
        const main = this._regex;

        return main;
    }

    static get _regex() {
        const pattern = `^
                (?<localUrl>
                    file:
                )
            `,
            regex = XRegExp(pattern, 'xmns');

        return regex;
    }
}

var localUrl = UrlParams$1._main;

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

    static get localUrl() {
        return localUrl;
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
        return Promise.reject(error);
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
        return Promise.reject(error);
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
            .then(() => this.load.userInterface())
            .then(() => this.load.test())
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
        return Promise.reject(error);
    }
}

window.vamtiger = new Vamtiger();

addEventListener('load', event => vamtiger.main());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL0dldC9WYW10aWdlck1ldGFFbGVtZW50L2luZGV4LmpzIiwiL1VzZXJzL3ZhbXRpZ2VyL0RvY3VtZW50cy9Qcm9ncmFtbWluZy9WYW10aWdlclByb2plY3QvdmFtdGlnZXItdWkvU291cmNlL01haW4vR2V0L0NsYXNzaWZpZWRNZXRhRGF0YUVsZW1lbnQvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvTWFpbi9HZXQvVW5zdXBwb3J0ZWRGZWF0dXJlcy9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL0dldC9Ccm93c2VyQ29tcGF0aWJpbGl0eUVsZW1lbnQvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvTWFpbi9HZXQvUG9seWZpbGxVcmwvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvTWFpbi9HZXQvUG9seWZpbGxNZXRhRWxlbWVudHMvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvTWFpbi9HZXQvUG9seWZpbGxNZXRhRWxlbWVudC9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL0dldC9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL1NldC9Ccm93c2VyQ29tcGF0aWJpbGl0eS9DbGFzc2VzL2luZGV4LmpzIiwiL1VzZXJzL3ZhbXRpZ2VyL0RvY3VtZW50cy9Qcm9ncmFtbWluZy9WYW10aWdlclByb2plY3QvdmFtdGlnZXItdWkvU291cmNlL01haW4vU2V0L0Jyb3dzZXJDb21wYXRpYmlsaXR5L0N1c3RvbUVsZW1lbnRzL2luZGV4LmpzIiwiL1VzZXJzL3ZhbXRpZ2VyL0RvY3VtZW50cy9Qcm9ncmFtbWluZy9WYW10aWdlclByb2plY3QvdmFtdGlnZXItdWkvU291cmNlL01haW4vU2V0L0Jyb3dzZXJDb21wYXRpYmlsaXR5L1dlYlN0b3JhZ2UvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvTWFpbi9TZXQvQnJvd3NlckNvbXBhdGliaWxpdHkvTXV0YXRpb25PYnNlcnZlci9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL1NldC9Ccm93c2VyQ29tcGF0aWJpbGl0eS9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL1NldC9FbGVtZW50TmFtZS9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL1NldC9Qb2x5ZmlsbHMvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvTWFpbi9TZXQvTWV0YUVsZW1lbnQvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvTWFpbi9TZXQvTWV0YURhdGEvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvTWFpbi9TZXQvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvTWFpbi9Mb2FkL1NjcmlwdC9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL0xvYWQvUG9seWZpbGxzL2luZGV4LmpzIiwiL1VzZXJzL3ZhbXRpZ2VyL0RvY3VtZW50cy9Qcm9ncmFtbWluZy9WYW10aWdlclByb2plY3QvdmFtdGlnZXItdWkvU291cmNlL01haW4vTG9hZC9Vc2VySW50ZXJmYWNlL2luZGV4LmpzIiwiL1VzZXJzL3ZhbXRpZ2VyL0RvY3VtZW50cy9Qcm9ncmFtbWluZy9WYW10aWdlclByb2plY3QvdmFtdGlnZXItdWkvU291cmNlL01haW4vTG9hZC9UZXN0L2luZGV4LmpzIiwiL1VzZXJzL3ZhbXRpZ2VyL0RvY3VtZW50cy9Qcm9ncmFtbWluZy9WYW10aWdlclByb2plY3QvdmFtdGlnZXItdWkvU291cmNlL01haW4vTG9hZC9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL1JlZ2V4L0luZGV4RmlsZS9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL1JlZ2V4L1VybFBhcmFtcy9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL1JlZ2V4L0V4Y2x1ZGVNZXRhRGF0YS9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL1JlZ2V4L0xvY2FsVXJsL2luZGV4LmpzIiwiL1VzZXJzL3ZhbXRpZ2VyL0RvY3VtZW50cy9Qcm9ncmFtbWluZy9WYW10aWdlclByb2plY3QvdmFtdGlnZXItdWkvU291cmNlL01haW4vUmVnZXgvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvTWFpbi9SZW1vdmUvRWxlbWVudC9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL1JlbW92ZS9Ccm93c2VyQ29tcGF0aWJpbGl0eVNjcmlwdHMvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvTWFpbi9SZW1vdmUvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvTWFpbi9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNsYXNzIFZhbXRpZ2VyTWV0YUVsZW1lbnQge1xuICAgIGdldCBfbWFpbigpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IHRoaXMuX3ZhbXRpZ2VyTWV0YUVsZW1lbnQ7XG5cbiAgICAgICAgcmV0dXJuIG1haW47XG4gICAgfVxuXG4gICAgZ2V0IF92YW10aWdlck1ldGFFbGVtZW50KCkge1xuICAgICAgICBsZXQgdmFtdGlnZXJNZXRhRWxlbWVudCA9IHZhbXRpZ2VyLl9zZWxlY3RlZEVsZW1lbnRzLnZhbXRpZ2VyTWV0YUVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKCF2YW10aWdlck1ldGFFbGVtZW50KSB7XG4gICAgICAgICAgICB2YW10aWdlck1ldGFFbGVtZW50ID0gZG9jdW1lbnQuaGVhZC5xdWVyeVNlbGVjdG9yKHRoaXMuX3NlbGVjdG9yKTtcblxuICAgICAgICAgICAgdmFtdGlnZXIuX3NlbGVjdGVkRWxlbWVudHMudmFtdGlnZXJNZXRhRWxlbWVudCA9IHZhbXRpZ2VyTWV0YUVsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFtdGlnZXJNZXRhRWxlbWVudDtcbiAgICB9XG5cbiAgICBnZXQgX3NlbGVjdG9yKCkge1xuICAgICAgICBjb25zdCBzZWxlY3RvciA9ICdtZXRhW2RhdGEtdmFtdGlnZXJdJztcblxuICAgICAgICByZXR1cm4gc2VsZWN0b3I7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBwYXJhbWV0ZXJzID0+IG5ldyBWYW10aWdlck1ldGFFbGVtZW50KHBhcmFtZXRlcnMpLl9tYWluOyIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgQ2xhc3NpZmllZE1ldGFEYXRhRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3Ioe2NsYXNzaWZpY2F0aW9ufSkge1xuICAgICAgICB0aGlzLmNsYXNzaWZpY2F0aW9uID0gY2xhc3NpZmljYXRpb247XG4gICAgfVxuXG4gICAgZ2V0IF9tYWluKCkge1xuICAgICAgICBsZXQgbWFpbjtcblxuICAgICAgICBpZiAodGhpcy5jbGFzc2lmaWNhdGlvbilcbiAgICAgICAgICAgIG1haW4gPSB0aGlzLl9nZXRDbGFzc2lmaWVkTWV0YURhdGFFbGVtZW50O1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVFcnJvcihuZXcgRXJyb3IoJ0RpZCBub3QgZ2V0IGNsYXNzaWZpZWQgbWV0YSBkYXRhIGVsZW1lbnQ6IE5vIGNsYXNzaWZpY2F0aW9uIGRlZmluZWQnKSk7XG5cbiAgICAgICAgcmV0dXJuIG1haW47XG4gICAgfVxuXG4gICAgZ2V0IF9nZXRDbGFzc2lmaWVkTWV0YURhdGFFbGVtZW50KCkge1xuICAgICAgICBjb25zdCBzZWxlY3RvciA9IHRoaXMuX3NlbGVjdG9yLFxuICAgICAgICAgICAgcGFyZW50ID0gdGhpcy5fcGFyZW50O1xuICAgICAgICBcbiAgICAgICAgbGV0IGNsYXNzaWZpZWRNZXRhRGF0YUVsZW1lbnQgPSBwYXJlbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5cbiAgICAgICAgaWYgKCFjbGFzc2lmaWVkTWV0YURhdGFFbGVtZW50KSB7XG4gICAgICAgICAgICBjbGFzc2lmaWVkTWV0YURhdGFFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbWV0YScpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjbGFzc2lmaWVkTWV0YURhdGFFbGVtZW50LmRhdGFzZXRbJ2NsYXNzaWZpY2F0aW9uJ10gPSB0aGlzLmNsYXNzaWZpY2F0aW9uO1xuXG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoY2xhc3NpZmllZE1ldGFEYXRhRWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2xhc3NpZmllZE1ldGFEYXRhRWxlbWVudDtcbiAgICB9XG5cbiAgICBnZXQgX3BhcmVudCgpIHtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gdmFtdGlnZXIuZ2V0LnZhbXRpZ2VyTWV0YUVsZW1lbnQoKTtcblxuICAgICAgICByZXR1cm4gcGFyZW50O1xuICAgIH1cblxuICAgIGdldCBfc2VsZWN0b3IoKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9yID0gYG1ldGFbZGF0YS1jbGFzc2lmaWNhdGlvbj1cIiR7dGhpcy5jbGFzc2lmaWNhdGlvbn1cIl1gO1xuXG4gICAgICAgIHJldHVybiBzZWxlY3RvcjtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcmFtZXRlcnMgPT4gbmV3IENsYXNzaWZpZWRNZXRhRGF0YUVsZW1lbnQocGFyYW1ldGVycykuX21haW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBVbnN1cHBvcnRlZEZlYXR1cmVzIHtcbiAgICBnZXQgX21haW4oKSB7XG4gICAgICAgIGNvbnN0IG1haW4gPSB0aGlzLl91bnN1cHBvcnRlZEZlYXR1cmVzO1xuXG4gICAgICAgIHJldHVybiBtYWluO1xuICAgIH1cblxuICAgIGdldCBfdW5zdXBwb3J0ZWRGZWF0dXJlcygpIHtcbiAgICAgICAgY29uc3QgYnJvd3NlckNvbXBhdGliaWxpdHlFbGVtZW50ID0gdmFtdGlnZXIuZ2V0LmJyb3dzZXJDb21wYXRpYmlsaXR5RWxlbWVudCgpLFxuICAgICAgICAgICAgdW5zdXBwb3J0ZWRGZWF0dXJlcyA9IEFycmF5XG4gICAgICAgICAgICAgICAgLmZyb20oYnJvd3NlckNvbXBhdGliaWxpdHlFbGVtZW50LmNoaWxkcmVuKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoZWxlbWVudCA9PiBlbGVtZW50LmRhdGFzZXQuYnJvd3NlckNvbXBhdGliaWxpdHkgPT09IFwiZmFsc2VcIilcbiAgICAgICAgICAgICAgICAubWFwKGVsZW1lbnQgPT4gZWxlbWVudC5kYXRhc2V0LmZlYXR1cmUpO1xuXG4gICAgICAgIHJldHVybiB1bnN1cHBvcnRlZEZlYXR1cmVzO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyYW1ldGVycyA9PiBuZXcgVW5zdXBwb3J0ZWRGZWF0dXJlcyhwYXJhbWV0ZXJzKS5fbWFpbjsiLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIEJyb3dzZXJDb21wYXRpYmlsaXR5RWxlbWVudCB7XG4gICAgZ2V0IF9tYWluKCkge1xuICAgICAgICBjb25zdCBtYWluID0gdGhpcy5fYnJvd3NlckNvbXBhdGliaWxpdHlFbGVtZW50O1xuXG4gICAgICAgIHJldHVybiBtYWluO1xuICAgIH1cblxuICAgIGdldCBfYnJvd3NlckNvbXBhdGliaWxpdHlFbGVtZW50KCkge1xuICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLl9wYXJlbnQsXG4gICAgICAgICAgICBzZWxlY3RvciA9IHRoaXMuX3NlbGVjdG9yLFxuICAgICAgICAgICAgYnJvd3NlckNvbXBhdGliaWxpdHlFbGVtZW50ID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG4gICAgICAgIHJldHVybiBicm93c2VyQ29tcGF0aWJpbGl0eUVsZW1lbnRcbiAgICB9XG5cbiAgICBnZXQgX3BhcmVudCgpIHtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gdmFtdGlnZXIuZ2V0LnZhbXRpZ2VyTWV0YUVsZW1lbnQoKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgfVxuXG4gICAgZ2V0IF9zZWxlY3RvcigpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSAnbWV0YVtkYXRhLWNsYXNzaWZpY2F0aW9uPVwiQnJvd3NlciBDb21wYXRpYmlsaXR5XCJdJztcblxuICAgICAgICByZXR1cm4gc2VsZWN0b3I7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBwYXJhbWV0ZXJzID0+IG5ldyBCcm93c2VyQ29tcGF0aWJpbGl0eUVsZW1lbnQocGFyYW1ldGVycykuX21haW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBQb2x5ZmlsbFVybCB7XG4gICAgY29uc3RydWN0b3Ioe2ZlYXR1cmV9KSB7XG4gICAgICAgIHRoaXMuZmVhdHVyZSA9IGZlYXR1cmU7XG4gICAgfVxuXG4gICAgZ2V0IF9tYWluKCkge1xuICAgICAgICBjb25zdCBtYWluID0gdGhpcy5fcG9seWZpbGxVcmw7XG5cbiAgICAgICAgcmV0dXJuIG1haW47XG4gICAgfVxuXG4gICAgZ2V0IF9wb2x5ZmlsbFVybCgpIHtcbiAgICAgICAgY29uc3QgcG9seWZpbGxVcmwgPSAnSnMvUG9seWZpbGwvJyArIHRoaXMuZmVhdHVyZS5yZXBsYWNlKCcgJywgJycpICsgJy9pbmRleC5qcyc7XG5cbiAgICAgICAgcmV0dXJuIHBvbHlmaWxsVXJsO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyYW1ldGVycyA9PiBuZXcgUG9seWZpbGxVcmwocGFyYW1ldGVycykuX21haW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBQb2x5ZmlsbE1ldGFFbGVtZW50cyB7XG4gICAgZ2V0IF9tYWluKCkge1xuICAgICAgICBjb25zdCBtYWluID0gdGhpcy5fcG9seWZpbGxNZXRhRWxlbWVudHM7XG5cbiAgICAgICAgcmV0dXJuIG1haW47XG4gICAgfVxuXG4gICAgZ2V0IF9wb2x5ZmlsbE1ldGFFbGVtZW50cygpIHtcbiAgICAgICAgbGV0IHBvbHlmaWxsTWV0YUVsZW1lbnRzID0gdGhpcy5fcG9seWZpbGxNZXRhRWxlbWVudDtcbiAgICAgICAgXG4gICAgICAgIGlmIChwb2x5ZmlsbE1ldGFFbGVtZW50cyAmJiB0aGlzLl9wb2x5ZmlsbE1ldGFFbGVtZW50LmNoaWxkTm9kZXMpXG4gICAgICAgICAgICBwb2x5ZmlsbE1ldGFFbGVtZW50cyA9IEFycmF5LmZyb20ocG9seWZpbGxNZXRhRWxlbWVudHMuY2hpbGROb2Rlcyk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHBvbHlmaWxsTWV0YUVsZW1lbnRzID0gW107XG5cbiAgICAgICAgcmV0dXJuIHBvbHlmaWxsTWV0YUVsZW1lbnRzO1xuICAgIH1cblxuICAgIGdldCBfcG9seWZpbGxNZXRhRWxlbWVudCgpIHtcbiAgICAgICAgY29uc3QgcG9seWZpbGxNZXRhRWxlbWVudCA9IHZhbXRpZ2VyLmdldC5wb2x5ZmlsbE1ldGFFbGVtZW50KCk7XG5cbiAgICAgICAgcmV0dXJuIHBvbHlmaWxsTWV0YUVsZW1lbnQ7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBwYXJhbWV0ZXJzID0+IG5ldyBQb2x5ZmlsbE1ldGFFbGVtZW50cygpLl9tYWluOyIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgUG9seWZpbGxNZXRhRWxlbWVudCB7XG4gICAgZ2V0IF9tYWluKCkge1xuICAgICAgICBjb25zdCBtYWluID0gdGhpcy5fcG9seWZpbGxNZXRhRWxlbWVudDtcblxuICAgICAgICByZXR1cm4gbWFpbjtcbiAgICB9XG5cbiAgICBnZXQgX3BvbHlmaWxsTWV0YUVsZW1lbnQoKSB7XG4gICAgICAgIGNvbnN0IHBvbHlmaWxsTWV0YUVsZW1lbnQgPSB0aGlzLl92YW10aWdlck1ldGFFbGVtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5fc2VsZWN0b3IpO1xuXG4gICAgICAgIHJldHVybiBwb2x5ZmlsbE1ldGFFbGVtZW50O1xuICAgIH1cblxuICAgIGdldCBfdmFtdGlnZXJNZXRhRWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHZhbXRpZ2VyLmdldC52YW10aWdlck1ldGFFbGVtZW50KCk7XG4gICAgfVxuXG4gICAgZ2V0IF9zZWxlY3RvcigpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSAnW2RhdGEtY2xhc3NpZmljYXRpb249XCJCcm93c2VyIFBvbHlmaWxsXCJdJztcblxuICAgICAgICByZXR1cm4gc2VsZWN0b3I7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBwYXJhbWV0ZXJzID0+IG5ldyBQb2x5ZmlsbE1ldGFFbGVtZW50KCkuX21haW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgVmFtdGlnZXJNZXRhRWxlbWVudCBmcm9tICcuL1ZhbXRpZ2VyTWV0YUVsZW1lbnQvaW5kZXguanMnO1xuaW1wb3J0IENsYXNzaWZpZWRNZXRhRGF0YUVsZW1lbnQgZnJvbSAnLi9DbGFzc2lmaWVkTWV0YURhdGFFbGVtZW50L2luZGV4LmpzJztcbmltcG9ydCBVbnN1cHBvcnRlZEZlYXR1cmVzIGZyb20gJy4vVW5zdXBwb3J0ZWRGZWF0dXJlcy9pbmRleC5qcyc7XG5pbXBvcnQgQnJvd3NlckNvbXBhdGliaWxpdHlFbGVtZW50IGZyb20gJy4vQnJvd3NlckNvbXBhdGliaWxpdHlFbGVtZW50L2luZGV4LmpzJztcbmltcG9ydCBQb2x5ZmlsbFVybCBmcm9tICcuL1BvbHlmaWxsVXJsL2luZGV4LmpzJztcbmltcG9ydCBQb2x5ZmlsbE1ldGFFbGVtZW50cyBmcm9tICcuL1BvbHlmaWxsTWV0YUVsZW1lbnRzL2luZGV4LmpzJztcbmltcG9ydCBQb2x5ZmlsbE1ldGFFbGVtZW50IGZyb20gJy4vUG9seWZpbGxNZXRhRWxlbWVudC9pbmRleC5qcyc7XG5cbmNsYXNzIFZhbXRpZ2VyR2V0IHtcbiAgICBzdGF0aWMgZ2V0IHZhbXRpZ2VyTWV0YUVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiBWYW10aWdlck1ldGFFbGVtZW50O1xuICAgIH1cbiAgICBcbiAgICBzdGF0aWMgZ2V0IGNsYXNzaWZpZWRNZXRhRGF0YUVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiBDbGFzc2lmaWVkTWV0YURhdGFFbGVtZW50XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCB1bnN1cHBvcnRlZEZlYXR1cmVzKCkge1xuICAgICAgICByZXR1cm4gVW5zdXBwb3J0ZWRGZWF0dXJlcztcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IGJyb3dzZXJDb21wYXRpYmlsaXR5RWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIEJyb3dzZXJDb21wYXRpYmlsaXR5RWxlbWVudDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IHBvbHlmaWxsVXJsKCkge1xuICAgICAgICByZXR1cm4gUG9seWZpbGxVcmw7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBwb2x5ZmlsbE1ldGFFbGVtZW50cygpIHtcbiAgICAgICAgcmV0dXJuIFBvbHlmaWxsTWV0YUVsZW1lbnRzO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgcG9seWZpbGxNZXRhRWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIFBvbHlmaWxsTWV0YUVsZW1lbnQ7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBWYW10aWdlckdldDsiLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIENsYXNzZXMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnJlc3VsdCA9IHtcbiAgICAgICAgICAgIGZlYXR1cmU6ICdFUyA2IENsYXNzZXMnXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5fc2NyaXB0ID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9yZXN1bHQgPSBudWxsO1xuICAgIH1cbiAgICBcbiAgICBnZXQgbWFpbigpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IHRoaXMubG9hZFRlc3RcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuX3Jlc3VsdCA9IHRoaXMuX3NjcmlwdC5kYXRhc2V0KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5fcmVzdWx0KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuX2hhbmRsZUVycm9yKTtcblxuICAgICAgICByZXR1cm4gbWFpbjtcbiAgICB9XG5cbiAgICBnZXQgbG9hZFRlc3QoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBsZXQgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cbiAgICAgICAgICAgIHNjcmlwdC5kYXRhc2V0LnZhbXRpZ2VyID0gdHJ1ZTtcbiAgICAgICAgICAgIHNjcmlwdC5kYXRhc2V0LmZlYXR1cmUgPSB0aGlzLnJlc3VsdC5mZWF0dXJlO1xuICAgICAgICAgICAgc2NyaXB0LmRhdGFzZXQuY2xhc3NpZmljYXRpb24gPSAnQnJvd3NlciBDb21wYXRpYmlsaXR5JztcbiAgICAgICAgICAgIHNjcmlwdC5kYXRhc2V0LmJyb3dzZXJDb21wYXRpYmlsaXR5ID0gZmFsc2U7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHNjcmlwdC5pbm5lckhUTUwgPSBge1xuICAgICAgICAgICAgICAgIGNsYXNzIEVzNkNsYXNzQ29tcGF0aWJpbGl0eSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0b3IgPSAnc2NyaXB0W2RhdGEtY2xhc3NpZmljYXRpb249XCIke3NjcmlwdC5kYXRhc2V0LmNsYXNzaWZpY2F0aW9ufVwiXVtkYXRhLWZlYXR1cmU9XCIke3RoaXMucmVzdWx0LmZlYXR1cmV9XCJdJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbWFpbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLl9lbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRFdmVudCA9IG5ldyBFdmVudCgnbG9hZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmRhdGFzZXQuYnJvd3NlckNvbXBhdGliaWxpdHkgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQobG9hZEV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGdldCBfZWxlbWVudCgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuX3NlbGVjdG9yKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IHRlc3QgPSBuZXcgRXM2Q2xhc3NDb21wYXRpYmlsaXR5KCk7XG5cbiAgICAgICAgICAgICAgICB0ZXN0Lm1haW4oKTtcbiAgICAgICAgICAgIH1gO1xuXG4gICAgICAgICAgICB0aGlzLl9zY3JpcHQgPSBzY3JpcHQ7XG5cbiAgICAgICAgICAgIHZhbXRpZ2VyLmxvYWQuc2NyaXB0KHtcbiAgICAgICAgICAgICAgICBzY3JpcHQsXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgICAgICByZWplY3RcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfaGFuZGxlRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcmFtZXRlcnMgPT4gbmV3IENsYXNzZXMocGFyYW1ldGVycykubWFpbjsiLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIEJyb3dzZXJDb21wYXRpYmlsaXR5V2l0aEN1c3RvbUVsZW1lbnRzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5yZXN1bHQgPSB7XG4gICAgICAgICAgICBmZWF0dXJlOiAnQ3VzdG9tIEVsZW1lbnRzJ1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX3NjcmlwdCA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5fcmVzdWx0ID0gbnVsbDtcbiAgICB9XG4gICAgXG4gICAgZ2V0IG1haW4oKSB7XG4gICAgICAgIGNvbnN0IG1haW4gPSB0aGlzLmxvYWRUZXN0XG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLl9yZXN1bHQgPSB0aGlzLl9zY3JpcHQuZGF0YXNldClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuX3Jlc3VsdClcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLl9oYW5kbGVFcnJvcik7XG5cbiAgICAgICAgcmV0dXJuIG1haW47XG4gICAgfVxuXG4gICAgZ2V0IGxvYWRUZXN0KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgbGV0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG4gICAgICAgICAgICBzY3JpcHQuZGF0YXNldC52YW10aWdlciA9IHRydWU7XG4gICAgICAgICAgICBzY3JpcHQuZGF0YXNldC5mZWF0dXJlID0gdGhpcy5yZXN1bHQuZmVhdHVyZTtcbiAgICAgICAgICAgIHNjcmlwdC5kYXRhc2V0LmNsYXNzaWZpY2F0aW9uID0gJ0Jyb3dzZXIgQ29tcGF0aWJpbGl0eSc7XG4gICAgICAgICAgICBzY3JpcHQuZGF0YXNldC5icm93c2VyQ29tcGF0aWJpbGl0eSA9IGZhbHNlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBzY3JpcHQuaW5uZXJIVE1MID0gYHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RvciA9ICdzY3JpcHRbZGF0YS1jbGFzc2lmaWNhdGlvbj1cIiR7c2NyaXB0LmRhdGFzZXQuY2xhc3NpZmljYXRpb259XCJdW2RhdGEtZmVhdHVyZT1cIiR7dGhpcy5yZXN1bHQuZmVhdHVyZX1cIl0nLFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvciksXG4gICAgICAgICAgICAgICAgICAgIGxvYWRFdmVudCA9IG5ldyBFdmVudCgnbG9hZCcpO1xuXG4gICAgICAgICAgICAgICAgdGVzdCgpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IGVsZW1lbnQuZGF0YXNldC5icm93c2VyQ29tcGF0aWJpbGl0eSA9IHRydWUpXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBlbGVtZW50LmRhdGFzZXQuYnJvd3NlckNvbXBhdGliaWxpdHlFcnJvciA9IGVycm9yLm1lc3NhZ2UpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IGVsZW1lbnQuZGlzcGF0Y2hFdmVudChsb2FkRXZlbnQpKTtcblxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHRlc3QoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdXBwb3J0ZWQgPSB3aW5kb3cuY3VzdG9tRWxlbWVudHMgJiYgd2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1cHBvcnRlZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignQ3VzdG9tIEVsZW1lbnRzIFYxIGlzIG5vdCBzdXBwb3J0ZWQnKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1gO1xuXG4gICAgICAgICAgICB0aGlzLl9zY3JpcHQgPSBzY3JpcHQ7XG5cbiAgICAgICAgICAgIHZhbXRpZ2VyLmxvYWQuc2NyaXB0KHtcbiAgICAgICAgICAgICAgICBzY3JpcHQsXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgICAgICByZWplY3RcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfaGFuZGxlRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcmFtZXRlcnMgPT4gbmV3IEJyb3dzZXJDb21wYXRpYmlsaXR5V2l0aEN1c3RvbUVsZW1lbnRzKHBhcmFtZXRlcnMpLm1haW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBCcm93c2VyQ29tcGF0aWJpbGl0eVdlYlN0b3JhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnJlc3VsdCA9IHtcbiAgICAgICAgICAgIGZlYXR1cmU6ICdXZWIgU3RvcmFnZSdcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLl9zY3JpcHQgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX3Jlc3VsdCA9IG51bGw7XG4gICAgfVxuICAgIFxuICAgIGdldCBtYWluKCkge1xuICAgICAgICBjb25zdCBtYWluID0gdGhpcy5sb2FkVGVzdFxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5fcmVzdWx0ID0gdGhpcy5fc2NyaXB0LmRhdGFzZXQpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLl9yZXN1bHQpXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5faGFuZGxlRXJyb3IpO1xuXG4gICAgICAgIHJldHVybiBtYWluO1xuICAgIH1cblxuICAgIGdldCBsb2FkVGVzdCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGxldCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuICAgICAgICAgICAgc2NyaXB0LmRhdGFzZXQudmFtdGlnZXIgPSB0cnVlO1xuICAgICAgICAgICAgc2NyaXB0LmRhdGFzZXQuZmVhdHVyZSA9IHRoaXMucmVzdWx0LmZlYXR1cmU7XG4gICAgICAgICAgICBzY3JpcHQuZGF0YXNldC5jbGFzc2lmaWNhdGlvbiA9ICdCcm93c2VyIENvbXBhdGliaWxpdHknO1xuICAgICAgICAgICAgc2NyaXB0LmRhdGFzZXQuYnJvd3NlckNvbXBhdGliaWxpdHkgPSBmYWxzZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc2NyaXB0LmlubmVySFRNTCA9IGB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSAnc2NyaXB0W2RhdGEtY2xhc3NpZmljYXRpb249XCIke3NjcmlwdC5kYXRhc2V0LmNsYXNzaWZpY2F0aW9ufVwiXVtkYXRhLWZlYXR1cmU9XCIke3RoaXMucmVzdWx0LmZlYXR1cmV9XCJdJyxcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpLFxuICAgICAgICAgICAgICAgICAgICBsb2FkRXZlbnQgPSBuZXcgRXZlbnQoJ2xvYWQnKTtcblxuICAgICAgICAgICAgICAgIHRlc3QoKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBlbGVtZW50LmRhdGFzZXQuYnJvd3NlckNvbXBhdGliaWxpdHkgPSB0cnVlKVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gZWxlbWVudC5kYXRhc2V0LmJyb3dzZXJDb21wYXRpYmlsaXR5RXJyb3IgPSBlcnJvci5tZXNzYWdlKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBlbGVtZW50LmRpc3BhdGNoRXZlbnQobG9hZEV2ZW50KSk7XG5cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiB0ZXN0KCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3VwcG9ydGVkID0gd2luZG93LnNlc3Npb25TdG9yYWdlICYmIHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdXBwb3J0ZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ1dlYiBTdG9yYWdlIGlzIG5vdCBzdXBwb3J0ZWQnKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1gO1xuXG4gICAgICAgICAgICB0aGlzLl9zY3JpcHQgPSBzY3JpcHQ7XG5cbiAgICAgICAgICAgIHZhbXRpZ2VyLmxvYWQuc2NyaXB0KHtcbiAgICAgICAgICAgICAgICBzY3JpcHQsXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgICAgICByZWplY3RcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfaGFuZGxlRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcmFtZXRlcnMgPT4gbmV3IEJyb3dzZXJDb21wYXRpYmlsaXR5V2ViU3RvcmFnZShwYXJhbWV0ZXJzKS5tYWluOyIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgQnJvd3NlckNvbXBhdGliaWxpdHlXaXRoTXV0YXRpb25PYnNlcnZlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucmVzdWx0ID0ge1xuICAgICAgICAgICAgZmVhdHVyZTogJ011dGF0aW9uIE9ic2VydmVyJ1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX3NjcmlwdCA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5fcmVzdWx0ID0gbnVsbDtcbiAgICB9XG4gICAgXG4gICAgZ2V0IG1haW4oKSB7XG4gICAgICAgIGNvbnN0IG1haW4gPSB0aGlzLmxvYWRUZXN0XG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLl9yZXN1bHQgPSB0aGlzLl9zY3JpcHQuZGF0YXNldClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuX3Jlc3VsdClcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLl9oYW5kbGVFcnJvcik7XG5cbiAgICAgICAgcmV0dXJuIG1haW47XG4gICAgfVxuXG4gICAgZ2V0IGxvYWRUZXN0KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgbGV0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG4gICAgICAgICAgICBzY3JpcHQuZGF0YXNldC52YW10aWdlciA9IHRydWU7XG4gICAgICAgICAgICBzY3JpcHQuZGF0YXNldC5mZWF0dXJlID0gdGhpcy5yZXN1bHQuZmVhdHVyZTtcbiAgICAgICAgICAgIHNjcmlwdC5kYXRhc2V0LmNsYXNzaWZpY2F0aW9uID0gJ0Jyb3dzZXIgQ29tcGF0aWJpbGl0eSc7XG4gICAgICAgICAgICBzY3JpcHQuZGF0YXNldC5icm93c2VyQ29tcGF0aWJpbGl0eSA9IGZhbHNlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBzY3JpcHQuaW5uZXJIVE1MID0gYHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RvciA9ICdzY3JpcHRbZGF0YS1jbGFzc2lmaWNhdGlvbj1cIiR7c2NyaXB0LmRhdGFzZXQuY2xhc3NpZmljYXRpb259XCJdW2RhdGEtZmVhdHVyZT1cIiR7dGhpcy5yZXN1bHQuZmVhdHVyZX1cIl0nLFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvciksXG4gICAgICAgICAgICAgICAgICAgIGxvYWRFdmVudCA9IG5ldyBFdmVudCgnbG9hZCcpO1xuXG4gICAgICAgICAgICAgICAgdGVzdCgpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IGVsZW1lbnQuZGF0YXNldC5icm93c2VyQ29tcGF0aWJpbGl0eSA9IHRydWUpXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBlbGVtZW50LmRhdGFzZXQuYnJvd3NlckNvbXBhdGliaWxpdHlFcnJvciA9IGVycm9yLm1lc3NhZ2UpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IGVsZW1lbnQuZGlzcGF0Y2hFdmVudChsb2FkRXZlbnQpKTtcblxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHRlc3QoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdXBwb3J0ZWQgPSB3aW5kb3cuTXV0YXRpb25PYnNlcnZlciA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1cHBvcnRlZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignTXV0YXRpb24gT2JzZXJ2ZXIgaXMgbm90IHN1cHBvcnRlZCcpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRlc3Q7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1gO1xuXG4gICAgICAgICAgICB0aGlzLl9zY3JpcHQgPSBzY3JpcHQ7XG5cbiAgICAgICAgICAgIHZhbXRpZ2VyLmxvYWQuc2NyaXB0KHtcbiAgICAgICAgICAgICAgICBzY3JpcHQsXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgICAgICByZWplY3RcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfaGFuZGxlRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcmFtZXRlcnMgPT4gbmV3IEJyb3dzZXJDb21wYXRpYmlsaXR5V2l0aE11dGF0aW9uT2JzZXJ2ZXIocGFyYW1ldGVycykubWFpbjsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBCcm93c2VyQ29tcGF0aWJpbGl0eVdpdGhDbGFzc2VzIGZyb20gJy4vQ2xhc3Nlcy9pbmRleC5qcyc7XG5pbXBvcnQgQnJvd3NlckNvbXBhdGliaWxpdHlXaXRoQ3VzdG9tRWxlbWVudHMgZnJvbSAnLi9DdXN0b21FbGVtZW50cy9pbmRleC5qcyc7XG5pbXBvcnQgQnJvd3NlckNvbXBhdGliaWxpdHlXZWJTdG9yYWdlIGZyb20gJy4vV2ViU3RvcmFnZS9pbmRleC5qcyc7XG5pbXBvcnQgQnJvd3NlckNvbXBhdGliaWxpdHlXaXRoTXV0YXRpb25PYnNlcnZlciBmcm9tICcuL011dGF0aW9uT2JzZXJ2ZXIvaW5kZXguanMnO1xuXG5jbGFzcyBCcm93c2VyQ29tcGF0aWJpbGl0eSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX3Jlc3VsdHMgPSBudWxsO1xuICAgIH1cbiAgICBcbiAgICBnZXQgbWFpbigpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IHRoaXMuX3Rlc3RCcm93c2VyQ29tcGF0aWJpbGl0eVxuICAgICAgICAgICAgLnRoZW4odmFtdGlnZXIucmVtb3ZlLmJyb3dzZXJDb21wYXRpYmlsaXR5U2NyaXB0cylcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuX3NldEJyb3dzZXJDb21wYXRpYmlsaXR5KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuX2hhbmRsZUVycm9yKTtcblxuICAgICAgICByZXR1cm4gbWFpbjtcbiAgICB9XG5cbiAgICBnZXQgX3Rlc3RCcm93c2VyQ29tcGF0aWJpbGl0eSgpIHtcbiAgICAgICAgbGV0IHNldEJyb3dzZXJDb21wYXRpYmlsaXR5ID0gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgQnJvd3NlckNvbXBhdGliaWxpdHlXaXRoQ2xhc3NlcygpLFxuICAgICAgICAgICAgQnJvd3NlckNvbXBhdGliaWxpdHlXZWJTdG9yYWdlKCksXG4gICAgICAgICAgICBCcm93c2VyQ29tcGF0aWJpbGl0eVdpdGhNdXRhdGlvbk9ic2VydmVyKCksXG4gICAgICAgICAgICBCcm93c2VyQ29tcGF0aWJpbGl0eVdpdGhDdXN0b21FbGVtZW50cygpXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHNldEJyb3dzZXJDb21wYXRpYmlsaXR5ID0gc2V0QnJvd3NlckNvbXBhdGliaWxpdHlcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdHMgPT4gdGhpcy5fcmVzdWx0cyA9IHJlc3VsdHMpXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5faGFuZGxlRXJyb3IpO1xuXG4gICAgICAgIHJldHVybiBzZXRCcm93c2VyQ29tcGF0aWJpbGl0eTtcbiAgICB9XG5cbiAgICBnZXQgcmVzdWx0cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3VsdHM7XG4gICAgfVxuXG4gICAgZ2V0IF9zZXRCcm93c2VyQ29tcGF0aWJpbGl0eSgpIHtcbiAgICAgICAgdGhpcy5yZXN1bHRzLmZvckVhY2gocmVzdWx0ID0+IHZhbXRpZ2VyLnNldC5tZXRhRGF0YShyZXN1bHQpKTtcbiAgICB9XG5cbiAgICBfaGFuZGxlRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcmFtZXRlcnMgPT4gbmV3IEJyb3dzZXJDb21wYXRpYmlsaXR5KHBhcmFtZXRlcnMpLm1haW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBTZXRFbGVtZW50TmFtZSB7XG4gICAgY29uc3RydWN0b3Ioe2VsZW1lbnR9KSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudE5hbWUgPSBudWxsO1xuICAgIH1cblxuICAgIGdldCBfbWFpbigpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IHRoaXMuX3NldEVsZW1lbnROYW1lO1xuXG4gICAgICAgIHJldHVybiBtYWluO1xuICAgIH1cblxuICAgIGdldCBfc2V0RWxlbWVudE5hbWUoKSB7XG4gICAgICAgIGNvbnN0IHBvc3NpYmxlRWxlbWVudE5hbWVzID0gdGhpcy5fcG9zc2libGVFbGVtZW50TmFtZXMsXG4gICAgICAgICAgICBlbGVtZW50TmFtZSA9IHBvc3NpYmxlRWxlbWVudE5hbWVzLmZpbmQocG9zc2libGVFbGVtZW50TmFtZSA9PiAhWFJlZ0V4cC5tYXRjaChwb3NzaWJsZUVsZW1lbnROYW1lLCB2YW10aWdlci5yZWdleC5pbmRleEZpbGUpKSxcbiAgICAgICAgICAgIGVsZW1lbnROYW1lU2hvdWxkQmVTZXQgPSBlbGVtZW50TmFtZSA/IHRydWUgOiBmYWxzZTtcblxuICAgICAgICBpZiAoZWxlbWVudE5hbWVTaG91bGRCZVNldClcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5kYXRhc2V0Lm5hbWUgPSBlbGVtZW50TmFtZTtcbiAgICB9XG5cbiAgICBnZXQgX3Bvc3NpYmxlRWxlbWVudE5hbWVzKCkge1xuICAgICAgICBsZXQgZWxlbWVudFVybCA9IHRoaXMuZWxlbWVudC5zcmMgPyB0aGlzLmVsZW1lbnQuc3JjIDogdGhpcy5lbGVtZW50LmhyZWYsXG4gICAgICAgICAgICBhbGxQb3NzaWJsZUVsZW1lbnROYW1lcyxcbiAgICAgICAgICAgIHBvc3NpYmxlRWxlbWVudE5hbWVzID0gW107XG5cbiAgICAgICAgaWYgKGVsZW1lbnRVcmwpIHtcbiAgICAgICAgICAgIGVsZW1lbnRVcmwgPSBYUmVnRXhwLnJlcGxhY2UoZWxlbWVudFVybCwgdmFtdGlnZXIucmVnZXgudXJsUGFyYW1zLCAnJyk7XG4gICAgICAgICAgICBhbGxQb3NzaWJsZUVsZW1lbnROYW1lcyA9IGVsZW1lbnRVcmwuc3BsaXQoJy8nKTtcblxuICAgICAgICAgICAgcG9zc2libGVFbGVtZW50TmFtZXMgPSBhbGxQb3NzaWJsZUVsZW1lbnROYW1lcy5zbGljZShhbGxQb3NzaWJsZUVsZW1lbnROYW1lcy5sZW5ndGggLSAyKTtcbiAgICAgICAgICAgIHBvc3NpYmxlRWxlbWVudE5hbWVzLnJldmVyc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwb3NzaWJsZUVsZW1lbnROYW1lcztcbiAgICB9XG5cbiAgICBfaGFuZGxlRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcmFtZXRlcnMgPT4gbmV3IFNldEVsZW1lbnROYW1lKHBhcmFtZXRlcnMpLl9tYWluOyIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgU2V0UG9seWZpbGxzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fdW5zdXBwb3J0ZWRGZWF0dXJlcyA9IG51bGw7XG4gICAgfVxuICAgIFxuICAgIGdldCBfbWFpbigpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IHRoaXMuX3NldFVuc3VwcG9ydGVkRmVhdHVyZXNcbiAgICAgICAgICAgIC50aGVuKHRoaXMuX3NldFBvbHlmaWxsTWV0YURhdGEpXG4gICAgICAgICAgICAudGhlbih2YW10aWdlci5sb2FkLnBvbHlmaWxscylcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLl9oYW5kbGVFcnJvcik7XG5cbiAgICAgICAgcmV0dXJuIG1haW47XG4gICAgfVxuXG4gICAgZ2V0IF9zZXRVbnN1cHBvcnRlZEZlYXR1cmVzKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdW5zdXBwb3J0ZWRGZWF0dXJlcyA9IHZhbXRpZ2VyLmdldC51bnN1cHBvcnRlZEZlYXR1cmVzKCk7XG5cbiAgICAgICAgICAgIHRoaXMuX3Vuc3VwcG9ydGVkRmVhdHVyZXMgPSB1bnN1cHBvcnRlZEZlYXR1cmVzO1xuXG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldCBfc2V0UG9seWZpbGxNZXRhRGF0YSgpIHtcbiAgICAgICAgY29uc3QgcG9seWZpbGxQYXJhbWV0ZXJzID0gdGhpcy5fdW5zdXBwb3J0ZWRGZWF0dXJlc1xuICAgICAgICAgICAgLm1hcCh0aGlzLl9wb2x5ZmlsbFBhcmFtcyk7XG5cbiAgICAgICAgcG9seWZpbGxQYXJhbWV0ZXJzLmZvckVhY2gocGFyYW1ldGVycyA9PiB2YW10aWdlci5zZXQubWV0YURhdGEocGFyYW1ldGVycykpO1xuICAgIH1cblxuICAgIF9wb2x5ZmlsbFBhcmFtcyhmZWF0dXJlKSB7XG4gICAgICAgIGNvbnN0IHBhcmFtZXRlcnMgPSB7XG4gICAgICAgICAgICBjbGFzc2lmaWNhdGlvbjogJ0Jyb3dzZXIgUG9seWZpbGwnLFxuICAgICAgICAgICAgZmVhdHVyZSxcbiAgICAgICAgICAgIHN0YXRlOiBcImluaXRpYWxcIixcbiAgICAgICAgICAgIHVybDogdmFtdGlnZXIuZ2V0LnBvbHlmaWxsVXJsKHtmZWF0dXJlfSlcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gcGFyYW1ldGVycztcbiAgICB9XG5cbiAgICBfaGFuZGxlRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcmFtZXRlcnMgPT4gbmV3IFNldFBvbHlmaWxscyhwYXJhbWV0ZXJzKS5fbWFpbjsiLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIFNldFZhbXRpZ2VyTWV0YUVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl92YW10aWdlck1ldGFFbGVtZW50ID0gbnVsbDtcbiAgICB9XG4gICAgXG4gICAgZ2V0IF9tYWluKCkge1xuICAgICAgICBjb25zdCBtYWluID0gdGhpcy5fc2V0VmFtdGlnZXJNZXRhRWxlbWVudFxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5fbG9hZFZhbXRpZ2VyTWV0YUVsZW1lbnQpXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5faGFuZGxlRXJyb3IpO1xuXG4gICAgICAgIHJldHVybiBtYWluO1xuICAgIH1cblxuICAgIGdldCBfc2V0VmFtdGlnZXJNZXRhRWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGxldCB2YW10aWdlck1ldGFFbGVtZW50ID0gZG9jdW1lbnQuaGVhZC5xdWVyeVNlbGVjdG9yKHRoaXMuX3NlbGVjdG9yKTtcblxuICAgICAgICAgICAgaWYgKCF2YW10aWdlck1ldGFFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdmFtdGlnZXJNZXRhRWxlbWVudCA9IHRoaXMuX25ld1ZhbXRpZ2VyTWV0YUVsZW1lbnQ7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl92YW10aWdlck1ldGFFbGVtZW50ID0gdmFtdGlnZXJNZXRhRWxlbWVudDtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldCBfbG9hZFZhbXRpZ2VyTWV0YUVsZW1lbnQoKSB7XG4gICAgICAgIGNvbnN0IHZhbXRpZ2VyTWV0YUVsZW1lbnQgPSB0aGlzLl92YW10aWdlck1ldGFFbGVtZW50LFxuICAgICAgICAgICAgbGFzdE1ldGFFbGVtZW50ID0gdmFtdGlnZXJNZXRhRWxlbWVudCA/IHRoaXMuX2xhc3RNZXRhRWxlbWVudCA6IG51bGwsXG4gICAgICAgICAgICByZWZlcmVuY2VFbGVtZW50ID0gbGFzdE1ldGFFbGVtZW50ID8gbGFzdE1ldGFFbGVtZW50Lm5leHRFbGVtZW50U2libGluZyA6IG51bGwsXG4gICAgICAgICAgICBwYXJlbnQgPSBkb2N1bWVudC5oZWFkLFxuICAgICAgICAgICAgdmFtdGlnZXJNZXRhRWxlbWVudFNob3VsZEJlTG9hZGVkID0gdmFtdGlnZXJNZXRhRWxlbWVudCA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgIHZhbXRpZ2VyTWV0YUVsZW1lbnRTaG91bGRCZUluc2VydGVkID0gdmFtdGlnZXJNZXRhRWxlbWVudFNob3VsZEJlTG9hZGVkICYmIHJlZmVyZW5jZUVsZW1lbnQgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgICB2YW10aWdlck1ldGFFbGVtZW50U2hvdWxkQmVBcHBlbmRlZCA9IHZhbXRpZ2VyTWV0YUVsZW1lbnRTaG91bGRCZUxvYWRlZCAmJiAhcmVmZXJlbmNlRWxlbWVudCA/IHRydWUgOiBmYWxzZTtcblxuICAgICAgICBpZiAodmFtdGlnZXJNZXRhRWxlbWVudFNob3VsZEJlSW5zZXJ0ZWQpXG4gICAgICAgICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKFxuICAgICAgICAgICAgICAgIHZhbXRpZ2VyTWV0YUVsZW1lbnQsXG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlRWxlbWVudFxuICAgICAgICAgICAgKTtcbiAgICAgICAgZWxzZSBpZiAodmFtdGlnZXJNZXRhRWxlbWVudFNob3VsZEJlQXBwZW5kZWQpXG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodmFtdGlnZXJNZXRhRWxlbWVudCk7XG4gICAgfVxuXG4gICAgZ2V0IF9uZXdWYW10aWdlck1ldGFFbGVtZW50KCkge1xuICAgICAgICBjb25zdCBuZXdWYW10aWdlck1ldGFFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbWV0YScpO1xuXG4gICAgICAgIG5ld1ZhbXRpZ2VyTWV0YUVsZW1lbnQuZGF0YXNldC52YW10aWdlciA9IHRydWU7XG4gICAgICAgIG5ld1ZhbXRpZ2VyTWV0YUVsZW1lbnQuZGF0YXNldC5uYW1lID0gJ1ZhbXRpZ2VyIE1ldGEgRWxlbWVudCc7XG5cbiAgICAgICAgcmV0dXJuIG5ld1ZhbXRpZ2VyTWV0YUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgZ2V0IF9sYXN0TWV0YUVsZW1lbnQoKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9yID0gJ21ldGE6bGFzdC1vZi10eXBlJyxcbiAgICAgICAgICAgIGxhc3RNZXRhRWxlbWVudCA9IGRvY3VtZW50LmhlYWQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5cbiAgICAgICAgcmV0dXJuIGxhc3RNZXRhRWxlbWVudDtcbiAgICB9XG5cbiAgICBfaGFuZGxlRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcmFtZXRlcnMgPT4gbmV3IFNldFZhbXRpZ2VyTWV0YUVsZW1lbnQocGFyYW1ldGVycykuX21haW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBTZXRNZXRhRGF0YSB7XG4gICAgY29uc3RydWN0b3IocGFyYW1ldGVycykge1xuICAgICAgICB0aGlzLl9wYXJhbWV0ZXJzID0gcGFyYW1ldGVycztcbiAgICAgICAgdGhpcy5fY2xhc3NpZmljYXRpb24gPSBwYXJhbWV0ZXJzLmNsYXNzaWZpY2F0aW9uO1xuXG4gICAgICAgIHRoaXMuX2NsYXNzaWZpY2F0aW9uRWxlbWVudCA9IG51bGw7XG4gICAgfVxuXG4gICAgZ2V0IF9tYWluKCkge1xuICAgICAgICBsZXQgbWFpbjtcblxuICAgICAgICBpZiAodGhpcy5fZGF0YUlzVmFsaWQpXG4gICAgICAgICAgICBtYWluID0gdGhpcy5fc2V0Q2xhc3NpZmljYXRpb25FbGVtZW50XG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5fc2V0TWV0YURhdGFFbGVtZW50KVxuICAgICAgICAgICAgICAgIC5jYXRjaCh0aGlzLl9oYW5kbGVFcnJvcik7XG5cbiAgICAgICAgcmV0dXJuIG1haW47XG4gICAgfVxuXG4gICAgZ2V0IF9kYXRhSXNWYWxpZCgpIHtcbiAgICAgICAgbGV0IGRhdGFJc1ZhbGlkID0gdGhpcy5fY2xhc3NpZmljYXRpb24gPyB0cnVlIDogZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIGRhdGFJc1ZhbGlkO1xuICAgIH1cblxuICAgIGdldCBfc2V0Q2xhc3NpZmljYXRpb25FbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNsYXNzaWZpY2F0aW9uRWxlbWVudCA9IHZhbXRpZ2VyLmdldC5jbGFzc2lmaWVkTWV0YURhdGFFbGVtZW50KHtcbiAgICAgICAgICAgICAgICBjbGFzc2lmaWNhdGlvbjogdGhpcy5fY2xhc3NpZmljYXRpb25cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLl9jbGFzc2lmaWNhdGlvbkVsZW1lbnQgPSBjbGFzc2lmaWNhdGlvbkVsZW1lbnQ7XG5cbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0IF9zZXRNZXRhRGF0YUVsZW1lbnQoKSB7XG4gICAgICAgIGNvbnN0IG1ldGFEYXRhUHJvcGVydGllcyA9IHRoaXMuX21ldGFEYXRhUHJvcGVydGllcyxcbiAgICAgICAgICAgIG1ldGFEYXRhRWxlbWVudCA9IG1ldGFEYXRhUHJvcGVydGllcy5sZW5ndGggPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdtZXRhJykgOiB2YW10aWdlci5pZ25vcmU7XG5cbiAgICAgICAgaWYgKG1ldGFEYXRhRWxlbWVudCkge1xuICAgICAgICAgICAgbWV0YURhdGFQcm9wZXJ0aWVzLmZvckVhY2gocHJvcGVydHkgPT4gbWV0YURhdGFFbGVtZW50LmRhdGFzZXRbcHJvcGVydHldID0gdGhpcy5fcGFyYW1ldGVyc1twcm9wZXJ0eV0pO1xuXG4gICAgICAgICAgICB0aGlzLl9jbGFzc2lmaWNhdGlvbkVsZW1lbnQuYXBwZW5kQ2hpbGQobWV0YURhdGFFbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBfbWV0YURhdGFQcm9wZXJ0aWVzKCkge1xuICAgICAgICBjb25zdCBtZXRhRGF0YVByb3BlcnRpZXMgPSBPYmplY3RcbiAgICAgICAgICAgIC5rZXlzKHRoaXMuX3BhcmFtZXRlcnMpXG4gICAgICAgICAgICAuZmlsdGVyKHByb3BlcnR5ID0+ICFYUmVnRXhwLm1hdGNoKHByb3BlcnR5LCB2YW10aWdlci5yZWdleC5leGNsdWRlTWV0YURhdGEpKTtcblxuICAgICAgICByZXR1cm4gbWV0YURhdGFQcm9wZXJ0aWVzO1xuICAgIH1cblxuICAgIF9oYW5kbGVFcnJvcihlcnJvcikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyYW1ldGVycyA9PiBuZXcgU2V0TWV0YURhdGEocGFyYW1ldGVycykuX21haW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgU2V0QnJvd3NlckNvbXBhdGliaWxpdHkgZnJvbSAnLi9Ccm93c2VyQ29tcGF0aWJpbGl0eS9pbmRleC5qcyc7XG5pbXBvcnQgU2V0RWxlbWVudE5hbWUgZnJvbSAnLi9FbGVtZW50TmFtZS9pbmRleC5qcyc7XG5pbXBvcnQgU2V0UG9seWZpbGxzIGZyb20gJy4vUG9seWZpbGxzL2luZGV4LmpzJztcbmltcG9ydCBTZXRWYW10aWdlck1ldGFFbGVtZW50IGZyb20gJy4vTWV0YUVsZW1lbnQvaW5kZXguanMnO1xuaW1wb3J0IFNldE1ldGFEYXRhIGZyb20gJy4vTWV0YURhdGEvaW5kZXguanMnO1xuXG5jbGFzcyBWYW10aWdlclNldCB7XG4gICAgc3RhdGljIGdldCBicm93c2VyQ29tcGF0aWJpbGl0eSgpIHtcbiAgICAgICAgcmV0dXJuIFNldEJyb3dzZXJDb21wYXRpYmlsaXR5O1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgZWxlbWVudE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBTZXRFbGVtZW50TmFtZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IHBvbHlmaWxscygpIHtcbiAgICAgICAgcmV0dXJuIFNldFBvbHlmaWxscztcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IHZhbXRpZ2VyTWV0YUVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiBTZXRWYW10aWdlck1ldGFFbGVtZW50O1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgbWV0YURhdGEoKSB7XG4gICAgICAgIHJldHVybiBTZXRNZXRhRGF0YTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFZhbXRpZ2VyU2V0OyIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgVmFtdGlnZXJMb2FkIHtcbiAgICBjb25zdHJ1Y3Rvcih7c2NyaXB0LCByZXNvbHZlLCByZWplY3R9KSB7XG4gICAgICAgIHRoaXMuc2NyaXB0ID0gc2NyaXB0O1xuICAgICAgICB0aGlzLnJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICB0aGlzLnJlamVjdCA9IHJlamVjdDtcblxuICAgICAgICB0aGlzLl9zY3JpcHRUeXBlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbGFzdEVsZW1lbnRTZWxlY3RvciA9IG51bGw7XG4gICAgICAgIHRoaXMuX2xhc3RFbGVtZW50ID0gbnVsbDtcbiAgICB9XG5cbiAgICBnZXQgX21haW4oKSB7XG4gICAgICAgIGNvbnN0IG1haW4gPSB0aGlzLl9zZXRTY3JpcHRUeXBlXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLl9zZXRMYXN0RWxlbWVudFNlbGVjdG9yKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5fc2V0TGFzdEVsZW1lbnQpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLl9zZXRTb3VyY2VVcmwpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLl9sb2FkU2NyaXB0KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuX2hhbmRsZUVycm9yKTtcblxuICAgICAgICB0aGlzLnNjcmlwdC5kYXRhc2V0LnZhbXRpZ2VyID0gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gbWFpbjtcbiAgICB9XG5cbiAgICBnZXQgX3NldFNjcmlwdFR5cGUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5zY3JpcHQubG9jYWxOYW1lID09PSAnc2NyaXB0JylcbiAgICAgICAgICAgICAgICB0aGlzLl9zY3JpcHRUeXBlID0gJ3NjcmlwdCc7XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnNjcmlwdC5sb2NhbE5hbWUgPT09ICdsaW5rJyAmJiB0aGlzLnNjcmlwdC5yZWwgPT09ICdzdHlsZXNoZWV0JylcbiAgICAgICAgICAgICAgICB0aGlzLl9zY3JpcHRUeXBlID0gJ3N0eWxlc2hlZXQnO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fc2NyaXB0VHlwZSlcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignU2NyaXB0IHR5cGUgbm90IHNldCcpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0IF9zZXRMYXN0RWxlbWVudFNlbGVjdG9yKCkge1xuICAgICAgICBjb25zdCBzZWxlY3RvcnMgPSBuZXcgU2V0KCk7XG5cbiAgICAgICAgbGV0IHNlbGVjdG9yO1xuXG4gICAgICAgIGlmICh0aGlzLnNjcmlwdC5kYXRhc2V0LmNsYXNzaWZpY2F0aW9uKSB7XG4gICAgICAgICAgICBzZWxlY3RvcnMuYWRkKGBbZGF0YS1jbGFzc2lmaWNhdGlvbj1cIiR7dGhpcy5zY3JpcHQuZGF0YXNldC5jbGFzc2lmaWNhdGlvbn1cIl06bGFzdC1vZi10eXBlYCk7XG4gICAgICAgICAgICBzZWxlY3RvcnMuYWRkKGBbZGF0YS1jbGFzc2lmaWNhdGlvbl06bGFzdC1vZi10eXBlYCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxlY3RvcnMuYWRkKGAke3RoaXMuc2NyaXB0LmxvY2FsTmFtZX06bGFzdC1vZi10eXBlYCk7XG5cbiAgICAgICAgc2VsZWN0b3IgPSBBcnJheVxuICAgICAgICAgICAgLmZyb20oc2VsZWN0b3JzKVxuICAgICAgICAgICAgLmpvaW4oJyxcXG4nKTtcblxuICAgICAgICB0aGlzLl9sYXN0RWxlbWVudFNlbGVjdG9yID0gc2VsZWN0b3I7XG4gICAgfVxuXG4gICAgZ2V0IF9zZXRMYXN0RWxlbWVudCgpIHtcbiAgICAgICAgY29uc3QgbGFzdEVsZW1lbnQgPSBkb2N1bWVudC5oZWFkLnF1ZXJ5U2VsZWN0b3IodGhpcy5fbGFzdEVsZW1lbnRTZWxlY3Rvcik7XG5cbiAgICAgICAgdGhpcy5fbGFzdEVsZW1lbnQgPSBsYXN0RWxlbWVudDtcbiAgICB9XG5cbiAgICBnZXQgX3NldFNvdXJjZVVybCgpIHtcbiAgICAgICAgbGV0IHNvdXJjZVVybCA9IHRoaXMuc2NyaXB0LnNyYyxcbiAgICAgICAgICAgIHNldFNvdXJjZVVybFRvRGF0YVVybCA9ICFzb3VyY2VVcmwgJiYgdGhpcy5zY3JpcHQuZGF0YXNldC51cmw7XG4gICAgICAgIFxuICAgICAgICBpZiAoc2V0U291cmNlVXJsVG9EYXRhVXJsKVxuICAgICAgICAgICAgdGhpcy5zY3JpcHQuc3JjID0gdGhpcy5zY3JpcHQuZGF0YXNldC51cmw7XG4gICAgfVxuXG4gICAgZ2V0IF9sb2FkU2NyaXB0KCkge1xuICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLl9sYXN0RWxlbWVudC5wYXJlbnRFbGVtZW50LFxuICAgICAgICAgICAgcmVmZXJlbmNlRWxlbWVudCA9IHRoaXMuX2xhc3RFbGVtZW50Lm5leHRFbGVtZW50U2libGluZztcblxuICAgICAgICB0aGlzLnNjcmlwdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZXZlbnQgPT4gdGhpcy5yZXNvbHZlKHRoaXMuc2NyaXB0KSk7XG4gICAgICAgIHRoaXMuc2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3IgPT4gdGhpcy5yZWplY3Qoe1xuICAgICAgICAgICAgZXJyb3IsXG4gICAgICAgICAgICBzY3JpcHQ6IHRoaXMuc2NyaXB0XG4gICAgICAgIH0pKTtcblxuICAgICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKFxuICAgICAgICAgICAgdGhpcy5zY3JpcHQsXG4gICAgICAgICAgICByZWZlcmVuY2VFbGVtZW50XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgX2hhbmRsZUVycm9yKGVycm9yKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBwYXJhbWV0ZXJzID0+IG5ldyBWYW10aWdlckxvYWQocGFyYW1ldGVycykuX21haW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBMb2FkUG9seWZpbGxzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fcG9seWZpbGxNZXRhRWxlbWVudHMgPSBudWxsO1xuICAgICAgICB0aGlzLl9zY3JpcHRNYXAgPSBudWxsO1xuICAgIH1cbiAgICBcbiAgICBnZXQgX21haW4oKSB7XG4gICAgICAgIGNvbnN0IG1haW4gPSBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5fc2V0UG9seWZpbGxNZXRhRWxlbWVudHMpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLl9zZXRTY3JpcHRNYXApXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLl9sb2FkU2NyaXB0cylcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLl9oYW5kbGVFcnJvcik7XG4gICAgfVxuXG4gICAgZ2V0IF9zZXRQb2x5ZmlsbE1ldGFFbGVtZW50cygpIHtcbiAgICAgICAgY29uc3QgcG9seWZpbGxNZXRhRWxlbWVudHMgPSB2YW10aWdlci5nZXQucG9seWZpbGxNZXRhRWxlbWVudHMoKTtcblxuICAgICAgICB0aGlzLl9wb2x5ZmlsbE1ldGFFbGVtZW50cyA9ICBwb2x5ZmlsbE1ldGFFbGVtZW50cztcbiAgICB9XG5cbiAgICBnZXQgX3NldFNjcmlwdE1hcCgpIHtcbiAgICAgICAgY29uc3Qgc2NyaXB0TWFwID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGxldCBzY3JpcHQsXG4gICAgICAgICAgICBkYXRhUHJvcGVydGllcztcblxuICAgICAgICB0aGlzLl9wb2x5ZmlsbE1ldGFFbGVtZW50cy5mb3JFYWNoKHBvbHlmaWxsTWV0YUVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgICAgICBkYXRhUHJvcGVydGllcyA9IE9iamVjdC5rZXlzKHBvbHlmaWxsTWV0YUVsZW1lbnQuZGF0YXNldCk7XG5cbiAgICAgICAgICAgIHNjcmlwdC5zcmMgPSBwb2x5ZmlsbE1ldGFFbGVtZW50LmRhdGFzZXQudXJsO1xuXG4gICAgICAgICAgICBzY3JpcHRNYXAuc2V0KHNjcmlwdCwgcG9seWZpbGxNZXRhRWxlbWVudCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX3NjcmlwdE1hcCA9IHNjcmlwdE1hcDtcbiAgICB9XG5cbiAgICBnZXQgX3NjcmlwdHMoKSB7XG4gICAgICAgIGNvbnN0IHNjcmlwdHMgPSBBcnJheS5mcm9tKHRoaXMuX3NjcmlwdE1hcC5rZXlzKCkpO1xuXG4gICAgICAgIHJldHVybiBzY3JpcHRzO1xuICAgIH1cblxuICAgIGdldCBfbG9hZFNjcmlwdHMoKSB7XG4gICAgICAgIGxldCBsb2FkU2NyaXB0cyA9IFByb21pc2UuYWxsKFxuICAgICAgICAgICAgdGhpcy5fc2NyaXB0cy5tYXAoc2NyaXB0ID0+IHRoaXMuX2xvYWRTY3JpcHQoc2NyaXB0KSlcbiAgICAgICAgKTtcblxuICAgICAgICBsb2FkU2NyaXB0cyA9IGxvYWRTY3JpcHRzXG4gICAgICAgICAgICAudGhlbihzY3JpcHRzID0+IHRoaXMuX3VwZGF0ZU1ldGFEYXRhKHNjcmlwdHMpKVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuX2hhbmRsZUVycm9yKTtcblxuICAgICAgICByZXR1cm4gbG9hZFNjcmlwdHM7XG4gICAgfVxuXG4gICAgX2xvYWRTY3JpcHQoc2NyaXB0KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZXRhRWxlbWVudCA9IHRoaXMuX3NjcmlwdE1hcC5nZXQoc2NyaXB0KTtcblxuICAgICAgICAgICAgc2NyaXB0LmRhdGFzZXQuc3RhdGUgPSAnbG9hZGluZyc7XG4gICAgICAgICAgICBtZXRhRWxlbWVudC5kYXRhc2V0LnN0YXRlID0gJ2xvYWRpbmcnO1xuXG4gICAgICAgICAgICB2YW10aWdlci5sb2FkLnNjcmlwdCh7XG4gICAgICAgICAgICAgICAgc2NyaXB0LFxuICAgICAgICAgICAgICAgIHJlc29sdmUsXG4gICAgICAgICAgICAgICAgcmVqZWN0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX3VwZGF0ZU1ldGFEYXRhKHNjcmlwdHMpIHtcbiAgICAgICAgbGV0IG1ldGFFbGVtZW50O1xuICAgICAgICBcbiAgICAgICAgc2NyaXB0cy5mb3JFYWNoKHNjcmlwdCA9PiB7XG4gICAgICAgICAgICBtZXRhRWxlbWVudCA9IHRoaXMuX3NjcmlwdE1hcC5nZXQoc2NyaXB0KTtcblxuICAgICAgICAgICAgc2NyaXB0LmRhdGFzZXQuc3RhdGUgPSAnbG9hZGVkJztcbiAgICAgICAgICAgIG1ldGFFbGVtZW50LmRhdGFzZXQuc3RhdGUgPSAnbG9hZGVkJztcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBfaGFuZGxlRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcmFtZXRlcnMgPT4gbmV3IExvYWRQb2x5ZmlsbHMocGFyYW1ldGVycykuX21haW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBVc2VySW50ZXJmYWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fcHJpbWFyeSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5fc2Vjb25kYXJ5ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLl90ZXJ0aWFyeSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgXG4gICAgZ2V0IF9tYWluKCkge1xuICAgICAgICBjb25zdCBtYWluID0gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuX2xvYWRVaVNjcmlwdHMpXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5faGFuZGxlRXJyb3IpO1xuXG4gICAgICAgIHJldHVybiBtYWluO1xuICAgIH1cblxuICAgIGdldCBfbG9hZFVpU2NyaXB0cygpIHtcbiAgICAgICAgbGV0IGxvYWRVaVNjcmlwdHMgPSBQcm9taXNlLnJlc29sdmUoKTtcblxuICAgICAgICB0aGlzLl91aVNjcmlwdHMuZm9yRWFjaChzY3JpcHQgPT4gbG9hZFVpU2NyaXB0cyA9IGxvYWRVaVNjcmlwdHMudGhlbigoKSA9PiB0aGlzLl9sb2FkVWlTY3JpcHQoc2NyaXB0KSkpO1xuXG4gICAgICAgIGxvYWRVaVNjcmlwdHMuY2F0Y2godGhpcy5faGFuZGxlRXJyb3IpO1xuXG4gICAgICAgIHJldHVybiBsb2FkVWlTY3JpcHRzO1xuICAgIH1cblxuICAgIF9sb2FkVWlTY3JpcHQoc2NyaXB0KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB2YW10aWdlci5sb2FkLnNjcmlwdCh7c2NyaXB0LCByZXNvbHZlLCByZWplY3R9KSk7XG4gICAgfVxuXG4gICAgZ2V0IF91aVNjcmlwdHMoKSB7XG4gICAgICAgIGNvbnN0IHVybHMgPSBbXG4gICAgICAgICAgICAgICAgJ1ByaW1hcnkvaW5kZXguanMnLFxuICAgICAgICAgICAgICAgICdTZWNvbmRhcnkvaW5kZXguanMnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgdWlTY3JpcHRzID0gW107XG4gICAgICAgIFxuICAgICAgICBsZXQgc2NyaXB0O1xuICAgICAgICBcbiAgICAgICAgdXJscy5mb3JFYWNoKHVybCA9PiB7XG4gICAgICAgICAgICBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuICAgICAgICAgICAgc2NyaXB0LnNyYyA9IGBKcy9VSS8ke3VybH1gO1xuXG4gICAgICAgICAgICB1aVNjcmlwdHMucHVzaChzY3JpcHQpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdWlTY3JpcHRzO1xuICAgIH1cblxuICAgIF9oYW5kbGVFcnJvcihlcnJvcikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyYW1ldGVycyA9PiBuZXcgVXNlckludGVyZmFjZShwYXJhbWV0ZXJzKS5fbWFpbjsiLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIFZhbXRpZ2VyVGVzdCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX3NjcmlwdCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgXG4gICAgZ2V0IF9tYWluKCkge1xuICAgICAgICBjb25zdCBtYWluID0gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuX3NldFNjcmlwdClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuX2xvYWRUZXN0KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5fc2V0TWV0YURhdGEpXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5faGFuZGxlRXJyb3IpO1xuICAgIH1cblxuICAgIGdldCBfc2V0U2NyaXB0KCkge1xuICAgICAgICBjb25zdCBsb2NhbFVybCA9IFhSZWdFeHAubWF0Y2goZG9jdW1lbnQuVVJMLCB2YW10aWdlci5yZWdleC5sb2NhbFVybCk7XG5cbiAgICAgICAgbGV0IHNjcmlwdDtcblxuICAgICAgICBpZiAobG9jYWxVcmwpIHtcbiAgICAgICAgICAgIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG4gICAgICAgICAgICBzY3JpcHQuc3JjID0gdGhpcy5fdXJsO1xuXG4gICAgICAgICAgICB0aGlzLl9zY3JpcHQgPSBzY3JpcHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgX2xvYWRUZXN0KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3NjcmlwdClcbiAgICAgICAgICAgICAgICB2YW10aWdlci5sb2FkLnNjcmlwdCh7XG4gICAgICAgICAgICAgICAgICAgIHNjcmlwdDogdGhpcy5fc2NyaXB0LFxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlLFxuICAgICAgICAgICAgICAgICAgICByZWplY3RcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldCBfdXJsKCkge1xuICAgICAgICBjb25zdCB1cmwgPSAnSnMvVGVzdC9pbmRleC5qcyc7XG5cbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICB9XG5cbiAgICBfaGFuZGxlRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBwYXJhbWV0ZXJzID0+IG5ldyBWYW10aWdlclRlc3QocGFyYW1ldGVycykuX21haW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgTG9hZFNjcmlwdCBmcm9tICcuL1NjcmlwdC9pbmRleC5qcyc7XG5pbXBvcnQgUG9seWZpbGxzIGZyb20gJy4vUG9seWZpbGxzL2luZGV4LmpzJztcbmltcG9ydCBVc2VySW50ZXJmYWNlIGZyb20gJy4vVXNlckludGVyZmFjZS9pbmRleC5qcyc7XG5pbXBvcnQgVmFtdGlnZXJUZXN0IGZyb20gJy4vVGVzdC9pbmRleC5qcyc7XG5cbmNsYXNzIFZhbXRpZ2VyTG9hZCB7XG4gICAgc3RhdGljIGdldCBzY3JpcHQoKSB7XG4gICAgICAgIHJldHVybiBMb2FkU2NyaXB0O1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgcG9seWZpbGxzKCkge1xuICAgICAgICByZXR1cm4gUG9seWZpbGxzO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgdXNlckludGVyZmFjZSgpIHtcbiAgICAgICAgcmV0dXJuIFVzZXJJbnRlcmZhY2U7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCB0ZXN0KCkge1xuICAgICAgICByZXR1cm4gVmFtdGlnZXJUZXN0O1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVmFtdGlnZXJMb2FkOyIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgSW5kZXhGaWxlUmVnZXgge1xuICAgIHN0YXRpYyBnZXQgX21haW4oKSB7XG4gICAgICAgIGNvbnN0IG1haW4gPSB0aGlzLl9yZWdleDtcblxuICAgICAgICByZXR1cm4gbWFpbjtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IF9yZWdleCgpIHtcbiAgICAgICAgY29uc3QgcGF0dGVybiA9ICdeaW5kZXgnLFxuICAgICAgICAgICAgcmVnZXggPSBYUmVnRXhwKHBhdHRlcm4pO1xuXG4gICAgICAgIHJldHVybiByZWdleDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEluZGV4RmlsZVJlZ2V4Ll9tYWluOyIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgVXJsUGFyYW1zIHtcbiAgICBzdGF0aWMgZ2V0IF9tYWluKCkge1xuICAgICAgICBjb25zdCBtYWluID0gdGhpcy5fcmVnZXg7XG5cbiAgICAgICAgcmV0dXJuIG1haW47XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBfcmVnZXgoKSB7XG4gICAgICAgIGNvbnN0IHBhdHRlcm4gPSBgXG4gICAgICAgICAgICAgICAgXFxcXD9cbiAgICAgICAgICAgICAgICAoPzx1cmxQYXJhbXM+XG4gICAgICAgICAgICAgICAgICAgIC4qXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgJGAsXG4gICAgICAgICAgICByZWdleCA9IFhSZWdFeHAocGF0dGVybiwgJ3htbnMnKTtcblxuICAgICAgICByZXR1cm4gcmVnZXg7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBVcmxQYXJhbXMuX21haW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBFeGNsdWRlTWV0YURhdGEge1xuICAgIHN0YXRpYyBnZXQgX21haW4oKSB7XG4gICAgICAgIGNvbnN0IG1haW4gPSB0aGlzLl9yZWdleDtcblxuICAgICAgICByZXR1cm4gbWFpbjtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IF9yZWdleCgpIHtcbiAgICAgICAgY29uc3QgcGF0dGVybiA9IGBeXG4gICAgICAgICAgICAgICAgY2xhc3NpZmljYXRpb25cbiAgICAgICAgICAgICAgICB8XG4gICAgICAgICAgICAgICAgdmFtdGlnZXJcbiAgICAgICAgICAgICRgLFxuICAgICAgICAgICAgcmVnZXggPSBYUmVnRXhwKHBhdHRlcm4sICd4aW4nKTtcblxuICAgICAgICByZXR1cm4gcmVnZXg7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFeGNsdWRlTWV0YURhdGEuX21haW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBVcmxQYXJhbXMge1xuICAgIHN0YXRpYyBnZXQgX21haW4oKSB7XG4gICAgICAgIGNvbnN0IG1haW4gPSB0aGlzLl9yZWdleDtcblxuICAgICAgICByZXR1cm4gbWFpbjtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IF9yZWdleCgpIHtcbiAgICAgICAgY29uc3QgcGF0dGVybiA9IGBeXG4gICAgICAgICAgICAgICAgKD88bG9jYWxVcmw+XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgYCxcbiAgICAgICAgICAgIHJlZ2V4ID0gWFJlZ0V4cChwYXR0ZXJuLCAneG1ucycpO1xuXG4gICAgICAgIHJldHVybiByZWdleDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFVybFBhcmFtcy5fbWFpbjsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBpbmRleEZpbGUgZnJvbSAnLi9JbmRleEZpbGUvaW5kZXguanMnO1xuaW1wb3J0IHVybFBhcmFtcyBmcm9tICcuL1VybFBhcmFtcy9pbmRleC5qcyc7XG5pbXBvcnQgZXhjbHVkZU1ldGFEYXRhIGZyb20gJy4vRXhjbHVkZU1ldGFEYXRhL2luZGV4LmpzJztcbmltcG9ydCBsb2NhbFVybCBmcm9tICcuL0xvY2FsVXJsL2luZGV4LmpzJztcblxuY2xhc3MgVmFtdGlnZXJSZWdleCB7XG4gICAgc3RhdGljIGdldCBpbmRleEZpbGUoKSB7XG4gICAgICAgIHJldHVybiBpbmRleEZpbGU7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCB1cmxQYXJhbXMoKSB7XG4gICAgICAgIHJldHVybiB1cmxQYXJhbXM7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBleGNsdWRlTWV0YURhdGEoKSB7XG4gICAgICAgIHJldHVybiBleGNsdWRlTWV0YURhdGE7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBsb2NhbFVybCgpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsVXJsO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVmFtdGlnZXJSZWdleDsiLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIFZhbXRpZ2VyUmVtb3ZlRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3Ioe2VsZW1lbnR9KSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgZ2V0IF9tYWluKCkge1xuICAgICAgICBsZXQgbWFpbiA9IHRoaXMuZWxlbWVudCA/IHRoaXMuX3JlbW92ZUVsZW1lbnQgOiB2YW10aWdlci5pZ25vcmU7XG5cbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudClcbiAgICAgICAgICAgIG1haW4gPSB0aGlzLl9yZW1vdmVFbGVtZW50O1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVFcnJvcihuZXcgRXJyb3IoJ0VsZW1lbnQgbm90IHJlbW92ZWQ6IE5vIGVsZW1lbnQgZGVmaW5lZCcpKTtcblxuICAgICAgICByZXR1cm4gbWFpbjtcbiAgICB9XG5cbiAgICBnZXQgX3JlbW92ZUVsZW1lbnQoKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZWxlbWVudC5wYXJlbnRFbGVtZW50LFxuICAgICAgICAgICAgZWxlbWVudENhbkJlUmVtb3ZlZCA9IHBhcmVudCA/IHRydWUgOiBmYWxzZTtcblxuICAgICAgICBpZiAoZWxlbWVudENhbkJlUmVtb3ZlZClcbiAgICAgICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZCh0aGlzLmVsZW1lbnQpO1xuICAgIH1cblxuICAgIF9oYW5kbGVFcnJvcihlcnJvcikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyYW1ldGVycyA9PiBuZXcgVmFtdGlnZXJSZW1vdmVFbGVtZW50KHBhcmFtZXRlcnMpLl9tYWluOyIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgQnJvd3NlckNvbXBhdGliaWxpdHlTY3JpcHRzIHtcbiAgICBnZXQgX21haW4oKSB7XG4gICAgICAgIGNvbnN0IG1haW4gPSB0aGlzLl9yZW1vdmVCcm93c2VyQ29tcGF0aWJpbGl0eVNjcmlwdHNcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLl9oYW5kbGVFcnJvcik7XG5cbiAgICAgICAgcmV0dXJuIG1haW47XG4gICAgfVxuXG4gICAgZ2V0IF9yZW1vdmVCcm93c2VyQ29tcGF0aWJpbGl0eVNjcmlwdHMoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZW1vdmVTY3JpcHRQYXJhbXMgPSBBcnJheVxuICAgICAgICAgICAgICAgIC5mcm9tKHRoaXMuX3NjcmlwdHMpXG4gICAgICAgICAgICAgICAgLm1hcChzY3JpcHQgPT4gT2JqZWN0KHtlbGVtZW50OiBzY3JpcHR9KSk7XG5cbiAgICAgICAgICAgIHJlbW92ZVNjcmlwdFBhcmFtcy5mb3JFYWNoKHZhbXRpZ2VyLnJlbW92ZS5lbGVtZW50KTtcblxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgX3NjcmlwdHMoKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuX3BhcmVudCxcbiAgICAgICAgICAgIHNlbGVjdG9yID0gdGhpcy5fc2VsZWN0b3IsXG4gICAgICAgICAgICBzY3JpcHRzID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXG4gICAgICAgIHJldHVybiBzY3JpcHRzO1xuICAgIH1cblxuICAgIGdldCBfcGFyZW50KCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuaGVhZDtcbiAgICB9XG5cbiAgICBnZXQgX3NlbGVjdG9yKCkge1xuICAgICAgICBjb25zdCBzZWxlY3RvciA9IGBcbiAgICAgICAgICAgIHNjcmlwdFtkYXRhLWJyb3dzZXItY29tcGF0aWJpbGl0eV1cbiAgICAgICAgYDtcblxuICAgICAgICByZXR1cm4gc2VsZWN0b3I7XG4gICAgfVxuXG4gICAgX2hhbmRsZUVycm9yKGVycm9yKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBwYXJhbWV0ZXJzID0+IG5ldyBCcm93c2VyQ29tcGF0aWJpbGl0eVNjcmlwdHMoKS5fbWFpbjsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBWYW10aWdlckVsZW1lbnQgZnJvbSAnLi9FbGVtZW50L2luZGV4LmpzJztcbmltcG9ydCBCcm93c2VyQ29tcGF0aWJpbGl0eVNjcmlwdHMgZnJvbSAnLi9Ccm93c2VyQ29tcGF0aWJpbGl0eVNjcmlwdHMvaW5kZXguanMnO1xuXG5jbGFzcyBWYW10aWdlclJlbW92ZSB7XG4gICAgc3RhdGljIGdldCBlbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gVmFtdGlnZXJFbGVtZW50O1xuICAgIH1cbiAgICBcbiAgICBzdGF0aWMgZ2V0IGJyb3dzZXJDb21wYXRpYmlsaXR5U2NyaXB0cygpIHtcbiAgICAgICAgcmV0dXJuIEJyb3dzZXJDb21wYXRpYmlsaXR5U2NyaXB0cztcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFZhbXRpZ2VyUmVtb3ZlOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFZhbXRpZ2VyR2V0IGZyb20gJy4vR2V0L2luZGV4LmpzJztcbmltcG9ydCBWYW10aWdlclNldCBmcm9tICcuL1NldC9pbmRleC5qcyc7XG5pbXBvcnQgVmFtdGlnZXJMb2FkIGZyb20gJy4vTG9hZC9pbmRleC5qcyc7XG5pbXBvcnQgVmFtdGlnZXJSZWdleCBmcm9tICcuL1JlZ2V4L2luZGV4LmpzJztcbmltcG9ydCBWYW10aWdlclJlbW92ZSBmcm9tICcuL1JlbW92ZS9pbmRleC5qcyc7XG5cbmNsYXNzIFZhbXRpZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRFbGVtZW50cyA9IHt9O1xuICAgIH1cbiAgICBcbiAgICBtYWluKCkge1xuICAgICAgICBjb25zdCBtYWluID0gdGhpcy5zZXQudmFtdGlnZXJNZXRhRWxlbWVudCgpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLnNldC5icm93c2VyQ29tcGF0aWJpbGl0eSgpKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5zZXQucG9seWZpbGxzKCkpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLmxvYWQudXNlckludGVyZmFjZSgpKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5sb2FkLnRlc3QoKSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLl9oYW5kbGVFcnJvcik7XG5cbiAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZCcsIHRoaXMubWFpbik7XG5cbiAgICAgICAgcmV0dXJuIG1haW47XG4gICAgfVxuXG4gICAgZ2V0IGlnbm9yZSgpIHt9XG5cbiAgICBnZXQgZ2V0KCkge1xuICAgICAgICByZXR1cm4gVmFtdGlnZXJHZXQ7XG4gICAgfVxuXG4gICAgZ2V0IHNldCgpIHtcbiAgICAgICAgcmV0dXJuIFZhbXRpZ2VyU2V0O1xuICAgIH1cblxuICAgIGdldCBsb2FkKCkge1xuICAgICAgICByZXR1cm4gVmFtdGlnZXJMb2FkO1xuICAgIH1cblxuICAgIGdldCByZWdleCgpIHtcbiAgICAgICAgcmV0dXJuIFZhbXRpZ2VyUmVnZXg7XG4gICAgfVxuXG4gICAgZ2V0IHNlbGVjdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRFbGVtZW50cztcbiAgICB9XG5cbiAgICBnZXQgcmVtb3ZlKCkge1xuICAgICAgICByZXR1cm4gVmFtdGlnZXJSZW1vdmU7XG4gICAgfVxuXG4gICAgX2hhbmRsZUVycm9yKGVycm9yKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBWYW10aWdlcjsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBWYW10aWdlciBmcm9tICcuL01haW4vaW5kZXguanMnO1xuXG53aW5kb3cudmFtdGlnZXIgPSBuZXcgVmFtdGlnZXIoKTtcblxuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGV2ZW50ID0+IHZhbXRpZ2VyLm1haW4oKSk7Il0sIm5hbWVzIjpbIlZhbXRpZ2VyTWV0YUVsZW1lbnQiLCJDbGFzc2lmaWVkTWV0YURhdGFFbGVtZW50IiwiVW5zdXBwb3J0ZWRGZWF0dXJlcyIsIkJyb3dzZXJDb21wYXRpYmlsaXR5RWxlbWVudCIsIlBvbHlmaWxsVXJsIiwiUG9seWZpbGxNZXRhRWxlbWVudHMiLCJQb2x5ZmlsbE1ldGFFbGVtZW50IiwiQnJvd3NlckNvbXBhdGliaWxpdHlXZWJTdG9yYWdlIiwiQnJvd3NlckNvbXBhdGliaWxpdHlXaXRoTXV0YXRpb25PYnNlcnZlciIsIkJyb3dzZXJDb21wYXRpYmlsaXR5V2l0aEN1c3RvbUVsZW1lbnRzIiwiU2V0RWxlbWVudE5hbWUiLCJTZXRQb2x5ZmlsbHMiLCJTZXRWYW10aWdlck1ldGFFbGVtZW50IiwiU2V0TWV0YURhdGEiLCJWYW10aWdlckxvYWQiLCJVc2VySW50ZXJmYWNlIiwiVmFtdGlnZXJUZXN0IiwiVXJsUGFyYW1zIiwiQnJvd3NlckNvbXBhdGliaWxpdHlTY3JpcHRzIl0sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLG1CQUFtQixDQUFDO0lBQ3RCLElBQUksS0FBSyxHQUFHO1FBQ1IsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDOztRQUV2QyxPQUFPLElBQUksQ0FBQztLQUNmOztJQUVELElBQUksb0JBQW9CLEdBQUc7UUFDdkIsSUFBSSxtQkFBbUIsR0FBRyxRQUFRLENBQUMsaUJBQWlCLENBQUMsbUJBQW1CLENBQUM7O1FBRXpFLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUN0QixtQkFBbUIsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7O1lBRWxFLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztTQUN4RTs7UUFFRCxPQUFPLG1CQUFtQixDQUFDO0tBQzlCOztJQUVELElBQUksU0FBUyxHQUFHO1FBQ1osTUFBTSxRQUFRLEdBQUcscUJBQXFCLENBQUM7O1FBRXZDLE9BQU8sUUFBUSxDQUFDO0tBQ25CO0NBQ0o7O0FBRUQsNEJBQWUsVUFBVSxJQUFJLElBQUksbUJBQW1CLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSzs7QUMxQnRFLE1BQU0seUJBQXlCLENBQUM7SUFDNUIsV0FBVyxDQUFDLENBQUMsY0FBYyxDQUFDLEVBQUU7UUFDMUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7S0FDeEM7O0lBRUQsSUFBSSxLQUFLLEdBQUc7UUFDUixJQUFJLElBQUksQ0FBQzs7UUFFVCxJQUFJLElBQUksQ0FBQyxjQUFjO1lBQ25CLElBQUksR0FBRyxJQUFJLENBQUMsNkJBQTZCLENBQUM7O1lBRTFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFB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