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
        console.error(error);

        throw error;
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
        console.error(error);

        throw error;
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
        throw error;
    }
}

window.vamtiger = new Vamtiger();

addEventListener('load', event => vamtiger.main());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL0dldC9WYW10aWdlck1ldGFFbGVtZW50L2luZGV4LmpzIiwiL1VzZXJzL3ZhbXRpZ2VyL0RvY3VtZW50cy9Qcm9ncmFtbWluZy9WYW10aWdlclByb2plY3QvdmFtdGlnZXItdWkvU291cmNlL01haW4vR2V0L0NsYXNzaWZpZWRNZXRhRGF0YUVsZW1lbnQvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvTWFpbi9HZXQvVW5zdXBwb3J0ZWRGZWF0dXJlcy9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL0dldC9Ccm93c2VyQ29tcGF0aWJpbGl0eUVsZW1lbnQvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvTWFpbi9HZXQvUG9seWZpbGxVcmwvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvTWFpbi9HZXQvUG9seWZpbGxNZXRhRWxlbWVudHMvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvTWFpbi9HZXQvUG9seWZpbGxNZXRhRWxlbWVudC9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL0dldC9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL1NldC9Ccm93c2VyQ29tcGF0aWJpbGl0eS9DbGFzc2VzL2luZGV4LmpzIiwiL1VzZXJzL3ZhbXRpZ2VyL0RvY3VtZW50cy9Qcm9ncmFtbWluZy9WYW10aWdlclByb2plY3QvdmFtdGlnZXItdWkvU291cmNlL01haW4vU2V0L0Jyb3dzZXJDb21wYXRpYmlsaXR5L0N1c3RvbUVsZW1lbnRzL2luZGV4LmpzIiwiL1VzZXJzL3ZhbXRpZ2VyL0RvY3VtZW50cy9Qcm9ncmFtbWluZy9WYW10aWdlclByb2plY3QvdmFtdGlnZXItdWkvU291cmNlL01haW4vU2V0L0Jyb3dzZXJDb21wYXRpYmlsaXR5L1dlYlN0b3JhZ2UvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvTWFpbi9TZXQvQnJvd3NlckNvbXBhdGliaWxpdHkvTXV0YXRpb25PYnNlcnZlci9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL1NldC9Ccm93c2VyQ29tcGF0aWJpbGl0eS9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL1NldC9FbGVtZW50TmFtZS9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL1NldC9Qb2x5ZmlsbHMvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvTWFpbi9TZXQvTWV0YUVsZW1lbnQvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvTWFpbi9TZXQvTWV0YURhdGEvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvTWFpbi9TZXQvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvTWFpbi9Mb2FkL1NjcmlwdC9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL0xvYWQvUG9seWZpbGxzL2luZGV4LmpzIiwiL1VzZXJzL3ZhbXRpZ2VyL0RvY3VtZW50cy9Qcm9ncmFtbWluZy9WYW10aWdlclByb2plY3QvdmFtdGlnZXItdWkvU291cmNlL01haW4vTG9hZC9Vc2VySW50ZXJmYWNlL2luZGV4LmpzIiwiL1VzZXJzL3ZhbXRpZ2VyL0RvY3VtZW50cy9Qcm9ncmFtbWluZy9WYW10aWdlclByb2plY3QvdmFtdGlnZXItdWkvU291cmNlL01haW4vTG9hZC9UZXN0L2luZGV4LmpzIiwiL1VzZXJzL3ZhbXRpZ2VyL0RvY3VtZW50cy9Qcm9ncmFtbWluZy9WYW10aWdlclByb2plY3QvdmFtdGlnZXItdWkvU291cmNlL01haW4vTG9hZC9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL1JlZ2V4L0luZGV4RmlsZS9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL1JlZ2V4L1VybFBhcmFtcy9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL1JlZ2V4L0V4Y2x1ZGVNZXRhRGF0YS9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL1JlZ2V4L0xvY2FsVXJsL2luZGV4LmpzIiwiL1VzZXJzL3ZhbXRpZ2VyL0RvY3VtZW50cy9Qcm9ncmFtbWluZy9WYW10aWdlclByb2plY3QvdmFtdGlnZXItdWkvU291cmNlL01haW4vUmVnZXgvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvTWFpbi9SZW1vdmUvRWxlbWVudC9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9NYWluL1JlbW92ZS9Ccm93c2VyQ29tcGF0aWJpbGl0eVNjcmlwdHMvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvTWFpbi9SZW1vdmUvaW5kZXguanMiLCIvVXNlcnMvdmFtdGlnZXIvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1ZhbXRpZ2VyUHJvamVjdC92YW10aWdlci11aS9Tb3VyY2UvTWFpbi9pbmRleC5qcyIsIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLXVpL1NvdXJjZS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNsYXNzIFZhbXRpZ2VyTWV0YUVsZW1lbnQge1xuICAgIGdldCBfbWFpbigpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IHRoaXMuX3ZhbXRpZ2VyTWV0YUVsZW1lbnQ7XG5cbiAgICAgICAgcmV0dXJuIG1haW47XG4gICAgfVxuXG4gICAgZ2V0IF92YW10aWdlck1ldGFFbGVtZW50KCkge1xuICAgICAgICBsZXQgdmFtdGlnZXJNZXRhRWxlbWVudCA9IHZhbXRpZ2VyLl9zZWxlY3RlZEVsZW1lbnRzLnZhbXRpZ2VyTWV0YUVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKCF2YW10aWdlck1ldGFFbGVtZW50KSB7XG4gICAgICAgICAgICB2YW10aWdlck1ldGFFbGVtZW50ID0gZG9jdW1lbnQuaGVhZC5xdWVyeVNlbGVjdG9yKHRoaXMuX3NlbGVjdG9yKTtcblxuICAgICAgICAgICAgdmFtdGlnZXIuX3NlbGVjdGVkRWxlbWVudHMudmFtdGlnZXJNZXRhRWxlbWVudCA9IHZhbXRpZ2VyTWV0YUVsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFtdGlnZXJNZXRhRWxlbWVudDtcbiAgICB9XG5cbiAgICBnZXQgX3NlbGVjdG9yKCkge1xuICAgICAgICBjb25zdCBzZWxlY3RvciA9ICdtZXRhW2RhdGEtdmFtdGlnZXJdJztcblxuICAgICAgICByZXR1cm4gc2VsZWN0b3I7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBwYXJhbWV0ZXJzID0+IG5ldyBWYW10aWdlck1ldGFFbGVtZW50KHBhcmFtZXRlcnMpLl9tYWluOyIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgQ2xhc3NpZmllZE1ldGFEYXRhRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3Ioe2NsYXNzaWZpY2F0aW9ufSkge1xuICAgICAgICB0aGlzLmNsYXNzaWZpY2F0aW9uID0gY2xhc3NpZmljYXRpb247XG4gICAgfVxuXG4gICAgZ2V0IF9tYWluKCkge1xuICAgICAgICBsZXQgbWFpbjtcblxuICAgICAgICBpZiAodGhpcy5jbGFzc2lmaWNhdGlvbilcbiAgICAgICAgICAgIG1haW4gPSB0aGlzLl9nZXRDbGFzc2lmaWVkTWV0YURhdGFFbGVtZW50O1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVFcnJvcihuZXcgRXJyb3IoJ0RpZCBub3QgZ2V0IGNsYXNzaWZpZWQgbWV0YSBkYXRhIGVsZW1lbnQ6IE5vIGNsYXNzaWZpY2F0aW9uIGRlZmluZWQnKSk7XG5cbiAgICAgICAgcmV0dXJuIG1haW47XG4gICAgfVxuXG4gICAgZ2V0IF9nZXRDbGFzc2lmaWVkTWV0YURhdGFFbGVtZW50KCkge1xuICAgICAgICBjb25zdCBzZWxlY3RvciA9IHRoaXMuX3NlbGVjdG9yLFxuICAgICAgICAgICAgcGFyZW50ID0gdGhpcy5fcGFyZW50O1xuICAgICAgICBcbiAgICAgICAgbGV0IGNsYXNzaWZpZWRNZXRhRGF0YUVsZW1lbnQgPSBwYXJlbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5cbiAgICAgICAgaWYgKCFjbGFzc2lmaWVkTWV0YURhdGFFbGVtZW50KSB7XG4gICAgICAgICAgICBjbGFzc2lmaWVkTWV0YURhdGFFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbWV0YScpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjbGFzc2lmaWVkTWV0YURhdGFFbGVtZW50LmRhdGFzZXRbJ2NsYXNzaWZpY2F0aW9uJ10gPSB0aGlzLmNsYXNzaWZpY2F0aW9uO1xuXG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoY2xhc3NpZmllZE1ldGFEYXRhRWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2xhc3NpZmllZE1ldGFEYXRhRWxlbWVudDtcbiAgICB9XG5cbiAgICBnZXQgX3BhcmVudCgpIHtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gdmFtdGlnZXIuZ2V0LnZhbXRpZ2VyTWV0YUVsZW1lbnQoKTtcblxuICAgICAgICByZXR1cm4gcGFyZW50O1xuICAgIH1cblxuICAgIGdldCBfc2VsZWN0b3IoKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9yID0gYG1ldGFbZGF0YS1jbGFzc2lmaWNhdGlvbj1cIiR7dGhpcy5jbGFzc2lmaWNhdGlvbn1cIl1gO1xuXG4gICAgICAgIHJldHVybiBzZWxlY3RvcjtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcmFtZXRlcnMgPT4gbmV3IENsYXNzaWZpZWRNZXRhRGF0YUVsZW1lbnQocGFyYW1ldGVycykuX21haW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBVbnN1cHBvcnRlZEZlYXR1cmVzIHtcbiAgICBnZXQgX21haW4oKSB7XG4gICAgICAgIGNvbnN0IG1haW4gPSB0aGlzLl91bnN1cHBvcnRlZEZlYXR1cmVzO1xuXG4gICAgICAgIHJldHVybiBtYWluO1xuICAgIH1cblxuICAgIGdldCBfdW5zdXBwb3J0ZWRGZWF0dXJlcygpIHtcbiAgICAgICAgY29uc3QgYnJvd3NlckNvbXBhdGliaWxpdHlFbGVtZW50ID0gdmFtdGlnZXIuZ2V0LmJyb3dzZXJDb21wYXRpYmlsaXR5RWxlbWVudCgpLFxuICAgICAgICAgICAgdW5zdXBwb3J0ZWRGZWF0dXJlcyA9IEFycmF5XG4gICAgICAgICAgICAgICAgLmZyb20oYnJvd3NlckNvbXBhdGliaWxpdHlFbGVtZW50LmNoaWxkcmVuKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoZWxlbWVudCA9PiBlbGVtZW50LmRhdGFzZXQuYnJvd3NlckNvbXBhdGliaWxpdHkgPT09IFwiZmFsc2VcIilcbiAgICAgICAgICAgICAgICAubWFwKGVsZW1lbnQgPT4gZWxlbWVudC5kYXRhc2V0LmZlYXR1cmUpO1xuXG4gICAgICAgIHJldHVybiB1bnN1cHBvcnRlZEZlYXR1cmVzO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyYW1ldGVycyA9PiBuZXcgVW5zdXBwb3J0ZWRGZWF0dXJlcyhwYXJhbWV0ZXJzKS5fbWFpbjsiLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIEJyb3dzZXJDb21wYXRpYmlsaXR5RWxlbWVudCB7XG4gICAgZ2V0IF9tYWluKCkge1xuICAgICAgICBjb25zdCBtYWluID0gdGhpcy5fYnJvd3NlckNvbXBhdGliaWxpdHlFbGVtZW50O1xuXG4gICAgICAgIHJldHVybiBtYWluO1xuICAgIH1cblxuICAgIGdldCBfYnJvd3NlckNvbXBhdGliaWxpdHlFbGVtZW50KCkge1xuICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLl9wYXJlbnQsXG4gICAgICAgICAgICBzZWxlY3RvciA9IHRoaXMuX3NlbGVjdG9yLFxuICAgICAgICAgICAgYnJvd3NlckNvbXBhdGliaWxpdHlFbGVtZW50ID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG4gICAgICAgIHJldHVybiBicm93c2VyQ29tcGF0aWJpbGl0eUVsZW1lbnRcbiAgICB9XG5cbiAgICBnZXQgX3BhcmVudCgpIHtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gdmFtdGlnZXIuZ2V0LnZhbXRpZ2VyTWV0YUVsZW1lbnQoKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgfVxuXG4gICAgZ2V0IF9zZWxlY3RvcigpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSAnbWV0YVtkYXRhLWNsYXNzaWZpY2F0aW9uPVwiQnJvd3NlciBDb21wYXRpYmlsaXR5XCJdJztcblxuICAgICAgICByZXR1cm4gc2VsZWN0b3I7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBwYXJhbWV0ZXJzID0+IG5ldyBCcm93c2VyQ29tcGF0aWJpbGl0eUVsZW1lbnQocGFyYW1ldGVycykuX21haW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBQb2x5ZmlsbFVybCB7XG4gICAgY29uc3RydWN0b3Ioe2ZlYXR1cmV9KSB7XG4gICAgICAgIHRoaXMuZmVhdHVyZSA9IGZlYXR1cmU7XG4gICAgfVxuXG4gICAgZ2V0IF9tYWluKCkge1xuICAgICAgICBjb25zdCBtYWluID0gdGhpcy5fcG9seWZpbGxVcmw7XG5cbiAgICAgICAgcmV0dXJuIG1haW47XG4gICAgfVxuXG4gICAgZ2V0IF9wb2x5ZmlsbFVybCgpIHtcbiAgICAgICAgY29uc3QgcG9seWZpbGxVcmwgPSAnSnMvUG9seWZpbGwvJyArIHRoaXMuZmVhdHVyZS5yZXBsYWNlKCcgJywgJycpICsgJy9pbmRleC5qcyc7XG5cbiAgICAgICAgcmV0dXJuIHBvbHlmaWxsVXJsO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyYW1ldGVycyA9PiBuZXcgUG9seWZpbGxVcmwocGFyYW1ldGVycykuX21haW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBQb2x5ZmlsbE1ldGFFbGVtZW50cyB7XG4gICAgZ2V0IF9tYWluKCkge1xuICAgICAgICBjb25zdCBtYWluID0gdGhpcy5fcG9seWZpbGxNZXRhRWxlbWVudHM7XG5cbiAgICAgICAgcmV0dXJuIG1haW47XG4gICAgfVxuXG4gICAgZ2V0IF9wb2x5ZmlsbE1ldGFFbGVtZW50cygpIHtcbiAgICAgICAgY29uc3QgcG9seWZpbGxNZXRhRWxlbWVudHMgPSBBcnJheVxuICAgICAgICAgICAgLmZyb20odGhpcy5fcG9seWZpbGxNZXRhRWxlbWVudC5jaGlsZE5vZGVzKTtcblxuICAgICAgICByZXR1cm4gcG9seWZpbGxNZXRhRWxlbWVudHM7XG4gICAgfVxuXG4gICAgZ2V0IF9wb2x5ZmlsbE1ldGFFbGVtZW50KCkge1xuICAgICAgICBjb25zdCBwb2x5ZmlsbE1ldGFFbGVtZW50ID0gdmFtdGlnZXIuZ2V0LnBvbHlmaWxsTWV0YUVsZW1lbnQoKTtcblxuICAgICAgICByZXR1cm4gcG9seWZpbGxNZXRhRWxlbWVudDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcmFtZXRlcnMgPT4gbmV3IFBvbHlmaWxsTWV0YUVsZW1lbnRzKCkuX21haW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBQb2x5ZmlsbE1ldGFFbGVtZW50IHtcbiAgICBnZXQgX21haW4oKSB7XG4gICAgICAgIGNvbnN0IG1haW4gPSB0aGlzLl9wb2x5ZmlsbE1ldGFFbGVtZW50O1xuXG4gICAgICAgIHJldHVybiBtYWluO1xuICAgIH1cblxuICAgIGdldCBfcG9seWZpbGxNZXRhRWxlbWVudCgpIHtcbiAgICAgICAgY29uc3QgcG9seWZpbGxNZXRhRWxlbWVudCA9IHRoaXMuX3ZhbXRpZ2VyTWV0YUVsZW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLl9zZWxlY3Rvcik7XG5cbiAgICAgICAgcmV0dXJuIHBvbHlmaWxsTWV0YUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgZ2V0IF92YW10aWdlck1ldGFFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdmFtdGlnZXIuZ2V0LnZhbXRpZ2VyTWV0YUVsZW1lbnQoKTtcbiAgICB9XG5cbiAgICBnZXQgX3NlbGVjdG9yKCkge1xuICAgICAgICBjb25zdCBzZWxlY3RvciA9ICdbZGF0YS1jbGFzc2lmaWNhdGlvbj1cIkJyb3dzZXIgUG9seWZpbGxcIl0nO1xuXG4gICAgICAgIHJldHVybiBzZWxlY3RvcjtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcmFtZXRlcnMgPT4gbmV3IFBvbHlmaWxsTWV0YUVsZW1lbnQoKS5fbWFpbjsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBWYW10aWdlck1ldGFFbGVtZW50IGZyb20gJy4vVmFtdGlnZXJNZXRhRWxlbWVudC9pbmRleC5qcyc7XG5pbXBvcnQgQ2xhc3NpZmllZE1ldGFEYXRhRWxlbWVudCBmcm9tICcuL0NsYXNzaWZpZWRNZXRhRGF0YUVsZW1lbnQvaW5kZXguanMnO1xuaW1wb3J0IFVuc3VwcG9ydGVkRmVhdHVyZXMgZnJvbSAnLi9VbnN1cHBvcnRlZEZlYXR1cmVzL2luZGV4LmpzJztcbmltcG9ydCBCcm93c2VyQ29tcGF0aWJpbGl0eUVsZW1lbnQgZnJvbSAnLi9Ccm93c2VyQ29tcGF0aWJpbGl0eUVsZW1lbnQvaW5kZXguanMnO1xuaW1wb3J0IFBvbHlmaWxsVXJsIGZyb20gJy4vUG9seWZpbGxVcmwvaW5kZXguanMnO1xuaW1wb3J0IFBvbHlmaWxsTWV0YUVsZW1lbnRzIGZyb20gJy4vUG9seWZpbGxNZXRhRWxlbWVudHMvaW5kZXguanMnO1xuaW1wb3J0IFBvbHlmaWxsTWV0YUVsZW1lbnQgZnJvbSAnLi9Qb2x5ZmlsbE1ldGFFbGVtZW50L2luZGV4LmpzJztcblxuY2xhc3MgVmFtdGlnZXJHZXQge1xuICAgIHN0YXRpYyBnZXQgdmFtdGlnZXJNZXRhRWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIFZhbXRpZ2VyTWV0YUVsZW1lbnQ7XG4gICAgfVxuICAgIFxuICAgIHN0YXRpYyBnZXQgY2xhc3NpZmllZE1ldGFEYXRhRWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIENsYXNzaWZpZWRNZXRhRGF0YUVsZW1lbnRcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IHVuc3VwcG9ydGVkRmVhdHVyZXMoKSB7XG4gICAgICAgIHJldHVybiBVbnN1cHBvcnRlZEZlYXR1cmVzO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgYnJvd3NlckNvbXBhdGliaWxpdHlFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gQnJvd3NlckNvbXBhdGliaWxpdHlFbGVtZW50O1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgcG9seWZpbGxVcmwoKSB7XG4gICAgICAgIHJldHVybiBQb2x5ZmlsbFVybDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IHBvbHlmaWxsTWV0YUVsZW1lbnRzKCkge1xuICAgICAgICByZXR1cm4gUG9seWZpbGxNZXRhRWxlbWVudHM7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBwb2x5ZmlsbE1ldGFFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gUG9seWZpbGxNZXRhRWxlbWVudDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFZhbXRpZ2VyR2V0OyIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgQ2xhc3NlcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucmVzdWx0ID0ge1xuICAgICAgICAgICAgZmVhdHVyZTogJ0VTIDYgQ2xhc3NlcydcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLl9zY3JpcHQgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX3Jlc3VsdCA9IG51bGw7XG4gICAgfVxuICAgIFxuICAgIGdldCBtYWluKCkge1xuICAgICAgICBjb25zdCBtYWluID0gdGhpcy5sb2FkVGVzdFxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5fcmVzdWx0ID0gdGhpcy5fc2NyaXB0LmRhdGFzZXQpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLl9yZXN1bHQpXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5faGFuZGxlRXJyb3IpO1xuXG4gICAgICAgIHJldHVybiBtYWluO1xuICAgIH1cblxuICAgIGdldCBsb2FkVGVzdCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGxldCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuICAgICAgICAgICAgc2NyaXB0LmRhdGFzZXQudmFtdGlnZXIgPSB0cnVlO1xuICAgICAgICAgICAgc2NyaXB0LmRhdGFzZXQuZmVhdHVyZSA9IHRoaXMucmVzdWx0LmZlYXR1cmU7XG4gICAgICAgICAgICBzY3JpcHQuZGF0YXNldC5jbGFzc2lmaWNhdGlvbiA9ICdCcm93c2VyIENvbXBhdGliaWxpdHknO1xuICAgICAgICAgICAgc2NyaXB0LmRhdGFzZXQuYnJvd3NlckNvbXBhdGliaWxpdHkgPSBmYWxzZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc2NyaXB0LmlubmVySFRNTCA9IGB7XG4gICAgICAgICAgICAgICAgY2xhc3MgRXM2Q2xhc3NDb21wYXRpYmlsaXR5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RvciA9ICdzY3JpcHRbZGF0YS1jbGFzc2lmaWNhdGlvbj1cIiR7c2NyaXB0LmRhdGFzZXQuY2xhc3NpZmljYXRpb259XCJdW2RhdGEtZmVhdHVyZT1cIiR7dGhpcy5yZXN1bHQuZmVhdHVyZX1cIl0nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBtYWluKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuX2VsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZEV2ZW50ID0gbmV3IEV2ZW50KCdsb2FkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuZGF0YXNldC5icm93c2VyQ29tcGF0aWJpbGl0eSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChsb2FkRXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZ2V0IF9lbGVtZW50KCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5fc2VsZWN0b3IpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgdGVzdCA9IG5ldyBFczZDbGFzc0NvbXBhdGliaWxpdHkoKTtcblxuICAgICAgICAgICAgICAgIHRlc3QubWFpbigpO1xuICAgICAgICAgICAgfWA7XG5cbiAgICAgICAgICAgIHRoaXMuX3NjcmlwdCA9IHNjcmlwdDtcblxuICAgICAgICAgICAgdmFtdGlnZXIubG9hZC5zY3JpcHQoe1xuICAgICAgICAgICAgICAgIHNjcmlwdCxcbiAgICAgICAgICAgICAgICByZXNvbHZlLFxuICAgICAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9oYW5kbGVFcnJvcihlcnJvcikge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcmFtZXRlcnMgPT4gbmV3IENsYXNzZXMocGFyYW1ldGVycykubWFpbjsiLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIEJyb3dzZXJDb21wYXRpYmlsaXR5V2l0aEN1c3RvbUVsZW1lbnRzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5yZXN1bHQgPSB7XG4gICAgICAgICAgICBmZWF0dXJlOiAnQ3VzdG9tIEVsZW1lbnRzJ1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX3NjcmlwdCA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5fcmVzdWx0ID0gbnVsbDtcbiAgICB9XG4gICAgXG4gICAgZ2V0IG1haW4oKSB7XG4gICAgICAgIGNvbnN0IG1haW4gPSB0aGlzLmxvYWRUZXN0XG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLl9yZXN1bHQgPSB0aGlzLl9zY3JpcHQuZGF0YXNldClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuX3Jlc3VsdClcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLl9oYW5kbGVFcnJvcik7XG5cbiAgICAgICAgcmV0dXJuIG1haW47XG4gICAgfVxuXG4gICAgZ2V0IGxvYWRUZXN0KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgbGV0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG4gICAgICAgICAgICBzY3JpcHQuZGF0YXNldC52YW10aWdlciA9IHRydWU7XG4gICAgICAgICAgICBzY3JpcHQuZGF0YXNldC5mZWF0dXJlID0gdGhpcy5yZXN1bHQuZmVhdHVyZTtcbiAgICAgICAgICAgIHNjcmlwdC5kYXRhc2V0LmNsYXNzaWZpY2F0aW9uID0gJ0Jyb3dzZXIgQ29tcGF0aWJpbGl0eSc7XG4gICAgICAgICAgICBzY3JpcHQuZGF0YXNldC5icm93c2VyQ29tcGF0aWJpbGl0eSA9IGZhbHNlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBzY3JpcHQuaW5uZXJIVE1MID0gYHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RvciA9ICdzY3JpcHRbZGF0YS1jbGFzc2lmaWNhdGlvbj1cIiR7c2NyaXB0LmRhdGFzZXQuY2xhc3NpZmljYXRpb259XCJdW2RhdGEtZmVhdHVyZT1cIiR7dGhpcy5yZXN1bHQuZmVhdHVyZX1cIl0nLFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvciksXG4gICAgICAgICAgICAgICAgICAgIGxvYWRFdmVudCA9IG5ldyBFdmVudCgnbG9hZCcpO1xuXG4gICAgICAgICAgICAgICAgdGVzdCgpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IGVsZW1lbnQuZGF0YXNldC5icm93c2VyQ29tcGF0aWJpbGl0eSA9IHRydWUpXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBlbGVtZW50LmRhdGFzZXQuYnJvd3NlckNvbXBhdGliaWxpdHlFcnJvciA9IGVycm9yLm1lc3NhZ2UpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IGVsZW1lbnQuZGlzcGF0Y2hFdmVudChsb2FkRXZlbnQpKTtcblxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHRlc3QoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdXBwb3J0ZWQgPSB3aW5kb3cuY3VzdG9tRWxlbWVudHMgJiYgd2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1cHBvcnRlZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignQ3VzdG9tIEVsZW1lbnRzIFYxIGlzIG5vdCBzdXBwb3J0ZWQnKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1gO1xuXG4gICAgICAgICAgICB0aGlzLl9zY3JpcHQgPSBzY3JpcHQ7XG5cbiAgICAgICAgICAgIHZhbXRpZ2VyLmxvYWQuc2NyaXB0KHtcbiAgICAgICAgICAgICAgICBzY3JpcHQsXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgICAgICByZWplY3RcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfaGFuZGxlRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBwYXJhbWV0ZXJzID0+IG5ldyBCcm93c2VyQ29tcGF0aWJpbGl0eVdpdGhDdXN0b21FbGVtZW50cyhwYXJhbWV0ZXJzKS5tYWluOyIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgQnJvd3NlckNvbXBhdGliaWxpdHlXZWJTdG9yYWdlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5yZXN1bHQgPSB7XG4gICAgICAgICAgICBmZWF0dXJlOiAnV2ViIFN0b3JhZ2UnXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5fc2NyaXB0ID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9yZXN1bHQgPSBudWxsO1xuICAgIH1cbiAgICBcbiAgICBnZXQgbWFpbigpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IHRoaXMubG9hZFRlc3RcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuX3Jlc3VsdCA9IHRoaXMuX3NjcmlwdC5kYXRhc2V0KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5fcmVzdWx0KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuX2hhbmRsZUVycm9yKTtcblxuICAgICAgICByZXR1cm4gbWFpbjtcbiAgICB9XG5cbiAgICBnZXQgbG9hZFRlc3QoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBsZXQgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cbiAgICAgICAgICAgIHNjcmlwdC5kYXRhc2V0LnZhbXRpZ2VyID0gdHJ1ZTtcbiAgICAgICAgICAgIHNjcmlwdC5kYXRhc2V0LmZlYXR1cmUgPSB0aGlzLnJlc3VsdC5mZWF0dXJlO1xuICAgICAgICAgICAgc2NyaXB0LmRhdGFzZXQuY2xhc3NpZmljYXRpb24gPSAnQnJvd3NlciBDb21wYXRpYmlsaXR5JztcbiAgICAgICAgICAgIHNjcmlwdC5kYXRhc2V0LmJyb3dzZXJDb21wYXRpYmlsaXR5ID0gZmFsc2U7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHNjcmlwdC5pbm5lckhUTUwgPSBge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdG9yID0gJ3NjcmlwdFtkYXRhLWNsYXNzaWZpY2F0aW9uPVwiJHtzY3JpcHQuZGF0YXNldC5jbGFzc2lmaWNhdGlvbn1cIl1bZGF0YS1mZWF0dXJlPVwiJHt0aGlzLnJlc3VsdC5mZWF0dXJlfVwiXScsXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSxcbiAgICAgICAgICAgICAgICAgICAgbG9hZEV2ZW50ID0gbmV3IEV2ZW50KCdsb2FkJyk7XG5cbiAgICAgICAgICAgICAgICB0ZXN0KClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gZWxlbWVudC5kYXRhc2V0LmJyb3dzZXJDb21wYXRpYmlsaXR5ID0gdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGVsZW1lbnQuZGF0YXNldC5icm93c2VyQ29tcGF0aWJpbGl0eUVycm9yID0gZXJyb3IubWVzc2FnZSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gZWxlbWVudC5kaXNwYXRjaEV2ZW50KGxvYWRFdmVudCkpO1xuXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gdGVzdCgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1cHBvcnRlZCA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZSAmJiB3aW5kb3cubG9jYWxTdG9yYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3VwcG9ydGVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdXZWIgU3RvcmFnZSBpcyBub3Qgc3VwcG9ydGVkJykpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9YDtcblxuICAgICAgICAgICAgdGhpcy5fc2NyaXB0ID0gc2NyaXB0O1xuXG4gICAgICAgICAgICB2YW10aWdlci5sb2FkLnNjcmlwdCh7XG4gICAgICAgICAgICAgICAgc2NyaXB0LFxuICAgICAgICAgICAgICAgIHJlc29sdmUsXG4gICAgICAgICAgICAgICAgcmVqZWN0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX2hhbmRsZUVycm9yKGVycm9yKSB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyYW1ldGVycyA9PiBuZXcgQnJvd3NlckNvbXBhdGliaWxpdHlXZWJTdG9yYWdlKHBhcmFtZXRlcnMpLm1haW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBCcm93c2VyQ29tcGF0aWJpbGl0eVdpdGhNdXRhdGlvbk9ic2VydmVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5yZXN1bHQgPSB7XG4gICAgICAgICAgICBmZWF0dXJlOiAnTXV0YXRpb24gT2JzZXJ2ZXInXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5fc2NyaXB0ID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9yZXN1bHQgPSBudWxsO1xuICAgIH1cbiAgICBcbiAgICBnZXQgbWFpbigpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IHRoaXMubG9hZFRlc3RcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuX3Jlc3VsdCA9IHRoaXMuX3NjcmlwdC5kYXRhc2V0KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5fcmVzdWx0KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuX2hhbmRsZUVycm9yKTtcblxuICAgICAgICByZXR1cm4gbWFpbjtcbiAgICB9XG5cbiAgICBnZXQgbG9hZFRlc3QoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBsZXQgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cbiAgICAgICAgICAgIHNjcmlwdC5kYXRhc2V0LnZhbXRpZ2VyID0gdHJ1ZTtcbiAgICAgICAgICAgIHNjcmlwdC5kYXRhc2V0LmZlYXR1cmUgPSB0aGlzLnJlc3VsdC5mZWF0dXJlO1xuICAgICAgICAgICAgc2NyaXB0LmRhdGFzZXQuY2xhc3NpZmljYXRpb24gPSAnQnJvd3NlciBDb21wYXRpYmlsaXR5JztcbiAgICAgICAgICAgIHNjcmlwdC5kYXRhc2V0LmJyb3dzZXJDb21wYXRpYmlsaXR5ID0gZmFsc2U7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHNjcmlwdC5pbm5lckhUTUwgPSBge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdG9yID0gJ3NjcmlwdFtkYXRhLWNsYXNzaWZpY2F0aW9uPVwiJHtzY3JpcHQuZGF0YXNldC5jbGFzc2lmaWNhdGlvbn1cIl1bZGF0YS1mZWF0dXJlPVwiJHt0aGlzLnJlc3VsdC5mZWF0dXJlfVwiXScsXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSxcbiAgICAgICAgICAgICAgICAgICAgbG9hZEV2ZW50ID0gbmV3IEV2ZW50KCdsb2FkJyk7XG5cbiAgICAgICAgICAgICAgICB0ZXN0KClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gZWxlbWVudC5kYXRhc2V0LmJyb3dzZXJDb21wYXRpYmlsaXR5ID0gdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGVsZW1lbnQuZGF0YXNldC5icm93c2VyQ29tcGF0aWJpbGl0eUVycm9yID0gZXJyb3IubWVzc2FnZSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gZWxlbWVudC5kaXNwYXRjaEV2ZW50KGxvYWRFdmVudCkpO1xuXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gdGVzdCgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1cHBvcnRlZCA9IHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3VwcG9ydGVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdNdXRhdGlvbiBPYnNlcnZlciBpcyBub3Qgc3VwcG9ydGVkJykpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGVzdDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWA7XG5cbiAgICAgICAgICAgIHRoaXMuX3NjcmlwdCA9IHNjcmlwdDtcblxuICAgICAgICAgICAgdmFtdGlnZXIubG9hZC5zY3JpcHQoe1xuICAgICAgICAgICAgICAgIHNjcmlwdCxcbiAgICAgICAgICAgICAgICByZXNvbHZlLFxuICAgICAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9oYW5kbGVFcnJvcihlcnJvcikge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcmFtZXRlcnMgPT4gbmV3IEJyb3dzZXJDb21wYXRpYmlsaXR5V2l0aE11dGF0aW9uT2JzZXJ2ZXIocGFyYW1ldGVycykubWFpbjsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBCcm93c2VyQ29tcGF0aWJpbGl0eVdpdGhDbGFzc2VzIGZyb20gJy4vQ2xhc3Nlcy9pbmRleC5qcyc7XG5pbXBvcnQgQnJvd3NlckNvbXBhdGliaWxpdHlXaXRoQ3VzdG9tRWxlbWVudHMgZnJvbSAnLi9DdXN0b21FbGVtZW50cy9pbmRleC5qcyc7XG5pbXBvcnQgQnJvd3NlckNvbXBhdGliaWxpdHlXZWJTdG9yYWdlIGZyb20gJy4vV2ViU3RvcmFnZS9pbmRleC5qcyc7XG5pbXBvcnQgQnJvd3NlckNvbXBhdGliaWxpdHlXaXRoTXV0YXRpb25PYnNlcnZlciBmcm9tICcuL011dGF0aW9uT2JzZXJ2ZXIvaW5kZXguanMnO1xuXG5jbGFzcyBCcm93c2VyQ29tcGF0aWJpbGl0eSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX3Jlc3VsdHMgPSBudWxsO1xuICAgIH1cbiAgICBcbiAgICBnZXQgbWFpbigpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IHRoaXMuX3Rlc3RCcm93c2VyQ29tcGF0aWJpbGl0eVxuICAgICAgICAgICAgLnRoZW4odmFtdGlnZXIucmVtb3ZlLmJyb3dzZXJDb21wYXRpYmlsaXR5U2NyaXB0cylcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuX3NldEJyb3dzZXJDb21wYXRpYmlsaXR5KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuX2hhbmRsZUVycm9yKTtcblxuICAgICAgICByZXR1cm4gbWFpbjtcbiAgICB9XG5cbiAgICBnZXQgX3Rlc3RCcm93c2VyQ29tcGF0aWJpbGl0eSgpIHtcbiAgICAgICAgbGV0IHNldEJyb3dzZXJDb21wYXRpYmlsaXR5ID0gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgQnJvd3NlckNvbXBhdGliaWxpdHlXaXRoQ2xhc3NlcygpLFxuICAgICAgICAgICAgQnJvd3NlckNvbXBhdGliaWxpdHlXZWJTdG9yYWdlKCksXG4gICAgICAgICAgICBCcm93c2VyQ29tcGF0aWJpbGl0eVdpdGhNdXRhdGlvbk9ic2VydmVyKCksXG4gICAgICAgICAgICBCcm93c2VyQ29tcGF0aWJpbGl0eVdpdGhDdXN0b21FbGVtZW50cygpXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHNldEJyb3dzZXJDb21wYXRpYmlsaXR5ID0gc2V0QnJvd3NlckNvbXBhdGliaWxpdHlcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdHMgPT4gdGhpcy5fcmVzdWx0cyA9IHJlc3VsdHMpXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5faGFuZGxlRXJyb3IpO1xuXG4gICAgICAgIHJldHVybiBzZXRCcm93c2VyQ29tcGF0aWJpbGl0eTtcbiAgICB9XG5cbiAgICBnZXQgcmVzdWx0cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3VsdHM7XG4gICAgfVxuXG4gICAgZ2V0IF9zZXRCcm93c2VyQ29tcGF0aWJpbGl0eSgpIHtcbiAgICAgICAgdGhpcy5yZXN1bHRzLmZvckVhY2gocmVzdWx0ID0+IHZhbXRpZ2VyLnNldC5tZXRhRGF0YShyZXN1bHQpKTtcbiAgICB9XG5cbiAgICBfaGFuZGxlRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBwYXJhbWV0ZXJzID0+IG5ldyBCcm93c2VyQ29tcGF0aWJpbGl0eShwYXJhbWV0ZXJzKS5tYWluOyIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgU2V0RWxlbWVudE5hbWUge1xuICAgIGNvbnN0cnVjdG9yKHtlbGVtZW50fSkge1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnROYW1lID0gbnVsbDtcbiAgICB9XG5cbiAgICBnZXQgX21haW4oKSB7XG4gICAgICAgIGNvbnN0IG1haW4gPSB0aGlzLl9zZXRFbGVtZW50TmFtZTtcblxuICAgICAgICByZXR1cm4gbWFpbjtcbiAgICB9XG5cbiAgICBnZXQgX3NldEVsZW1lbnROYW1lKCkge1xuICAgICAgICBjb25zdCBwb3NzaWJsZUVsZW1lbnROYW1lcyA9IHRoaXMuX3Bvc3NpYmxlRWxlbWVudE5hbWVzLFxuICAgICAgICAgICAgZWxlbWVudE5hbWUgPSBwb3NzaWJsZUVsZW1lbnROYW1lcy5maW5kKHBvc3NpYmxlRWxlbWVudE5hbWUgPT4gIVhSZWdFeHAubWF0Y2gocG9zc2libGVFbGVtZW50TmFtZSwgdmFtdGlnZXIucmVnZXguaW5kZXhGaWxlKSksXG4gICAgICAgICAgICBlbGVtZW50TmFtZVNob3VsZEJlU2V0ID0gZWxlbWVudE5hbWUgPyB0cnVlIDogZmFsc2U7XG5cbiAgICAgICAgaWYgKGVsZW1lbnROYW1lU2hvdWxkQmVTZXQpXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuZGF0YXNldC5uYW1lID0gZWxlbWVudE5hbWU7XG4gICAgfVxuXG4gICAgZ2V0IF9wb3NzaWJsZUVsZW1lbnROYW1lcygpIHtcbiAgICAgICAgbGV0IGVsZW1lbnRVcmwgPSB0aGlzLmVsZW1lbnQuc3JjID8gdGhpcy5lbGVtZW50LnNyYyA6IHRoaXMuZWxlbWVudC5ocmVmLFxuICAgICAgICAgICAgYWxsUG9zc2libGVFbGVtZW50TmFtZXMsXG4gICAgICAgICAgICBwb3NzaWJsZUVsZW1lbnROYW1lcyA9IFtdO1xuXG4gICAgICAgIGlmIChlbGVtZW50VXJsKSB7XG4gICAgICAgICAgICBlbGVtZW50VXJsID0gWFJlZ0V4cC5yZXBsYWNlKGVsZW1lbnRVcmwsIHZhbXRpZ2VyLnJlZ2V4LnVybFBhcmFtcywgJycpO1xuICAgICAgICAgICAgYWxsUG9zc2libGVFbGVtZW50TmFtZXMgPSBlbGVtZW50VXJsLnNwbGl0KCcvJyk7XG5cbiAgICAgICAgICAgIHBvc3NpYmxlRWxlbWVudE5hbWVzID0gYWxsUG9zc2libGVFbGVtZW50TmFtZXMuc2xpY2UoYWxsUG9zc2libGVFbGVtZW50TmFtZXMubGVuZ3RoIC0gMik7XG4gICAgICAgICAgICBwb3NzaWJsZUVsZW1lbnROYW1lcy5yZXZlcnNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcG9zc2libGVFbGVtZW50TmFtZXM7XG4gICAgfVxuXG4gICAgX2hhbmRsZUVycm9yKGVycm9yKSB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyYW1ldGVycyA9PiBuZXcgU2V0RWxlbWVudE5hbWUocGFyYW1ldGVycykuX21haW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBTZXRQb2x5ZmlsbHMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl91bnN1cHBvcnRlZEZlYXR1cmVzID0gbnVsbDtcbiAgICB9XG4gICAgXG4gICAgZ2V0IF9tYWluKCkge1xuICAgICAgICBjb25zdCBtYWluID0gdGhpcy5fc2V0VW5zdXBwb3J0ZWRGZWF0dXJlc1xuICAgICAgICAgICAgLnRoZW4odGhpcy5fc2V0UG9seWZpbGxNZXRhRGF0YSlcbiAgICAgICAgICAgIC50aGVuKHZhbXRpZ2VyLmxvYWQucG9seWZpbGxzKVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuX2hhbmRsZUVycm9yKTtcblxuICAgICAgICByZXR1cm4gbWFpbjtcbiAgICB9XG5cbiAgICBnZXQgX3NldFVuc3VwcG9ydGVkRmVhdHVyZXMoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB1bnN1cHBvcnRlZEZlYXR1cmVzID0gdmFtdGlnZXIuZ2V0LnVuc3VwcG9ydGVkRmVhdHVyZXMoKTtcblxuICAgICAgICAgICAgdGhpcy5fdW5zdXBwb3J0ZWRGZWF0dXJlcyA9IHVuc3VwcG9ydGVkRmVhdHVyZXM7XG5cbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0IF9zZXRQb2x5ZmlsbE1ldGFEYXRhKCkge1xuICAgICAgICBjb25zdCBwb2x5ZmlsbFBhcmFtZXRlcnMgPSB0aGlzLl91bnN1cHBvcnRlZEZlYXR1cmVzXG4gICAgICAgICAgICAubWFwKHRoaXMuX3BvbHlmaWxsUGFyYW1zKTtcblxuICAgICAgICBwb2x5ZmlsbFBhcmFtZXRlcnMuZm9yRWFjaChwYXJhbWV0ZXJzID0+IHZhbXRpZ2VyLnNldC5tZXRhRGF0YShwYXJhbWV0ZXJzKSk7XG4gICAgfVxuXG4gICAgX3BvbHlmaWxsUGFyYW1zKGZlYXR1cmUpIHtcbiAgICAgICAgY29uc3QgcGFyYW1ldGVycyA9IHtcbiAgICAgICAgICAgIGNsYXNzaWZpY2F0aW9uOiAnQnJvd3NlciBQb2x5ZmlsbCcsXG4gICAgICAgICAgICBmZWF0dXJlLFxuICAgICAgICAgICAgc3RhdGU6IFwiaW5pdGlhbFwiLFxuICAgICAgICAgICAgdXJsOiB2YW10aWdlci5nZXQucG9seWZpbGxVcmwoe2ZlYXR1cmV9KVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBwYXJhbWV0ZXJzO1xuICAgIH1cblxuICAgIF9oYW5kbGVFcnJvcihlcnJvcikge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcmFtZXRlcnMgPT4gbmV3IFNldFBvbHlmaWxscyhwYXJhbWV0ZXJzKS5fbWFpbjsiLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIFNldFZhbXRpZ2VyTWV0YUVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl92YW10aWdlck1ldGFFbGVtZW50ID0gbnVsbDtcbiAgICB9XG4gICAgXG4gICAgZ2V0IF9tYWluKCkge1xuICAgICAgICBjb25zdCBtYWluID0gdGhpcy5fc2V0VmFtdGlnZXJNZXRhRWxlbWVudFxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5fbG9hZFZhbXRpZ2VyTWV0YUVsZW1lbnQpXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5faGFuZGxlRXJyb3IpO1xuXG4gICAgICAgIHJldHVybiBtYWluO1xuICAgIH1cblxuICAgIGdldCBfc2V0VmFtdGlnZXJNZXRhRWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGxldCB2YW10aWdlck1ldGFFbGVtZW50ID0gZG9jdW1lbnQuaGVhZC5xdWVyeVNlbGVjdG9yKHRoaXMuX3NlbGVjdG9yKTtcblxuICAgICAgICAgICAgaWYgKCF2YW10aWdlck1ldGFFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdmFtdGlnZXJNZXRhRWxlbWVudCA9IHRoaXMuX25ld1ZhbXRpZ2VyTWV0YUVsZW1lbnQ7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl92YW10aWdlck1ldGFFbGVtZW50ID0gdmFtdGlnZXJNZXRhRWxlbWVudDtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldCBfbG9hZFZhbXRpZ2VyTWV0YUVsZW1lbnQoKSB7XG4gICAgICAgIGNvbnN0IHZhbXRpZ2VyTWV0YUVsZW1lbnQgPSB0aGlzLl92YW10aWdlck1ldGFFbGVtZW50LFxuICAgICAgICAgICAgbGFzdE1ldGFFbGVtZW50ID0gdmFtdGlnZXJNZXRhRWxlbWVudCA/IHRoaXMuX2xhc3RNZXRhRWxlbWVudCA6IG51bGwsXG4gICAgICAgICAgICByZWZlcmVuY2VFbGVtZW50ID0gbGFzdE1ldGFFbGVtZW50ID8gbGFzdE1ldGFFbGVtZW50Lm5leHRFbGVtZW50U2libGluZyA6IG51bGwsXG4gICAgICAgICAgICBwYXJlbnQgPSBkb2N1bWVudC5oZWFkLFxuICAgICAgICAgICAgdmFtdGlnZXJNZXRhRWxlbWVudFNob3VsZEJlTG9hZGVkID0gdmFtdGlnZXJNZXRhRWxlbWVudCA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgIHZhbXRpZ2VyTWV0YUVsZW1lbnRTaG91bGRCZUluc2VydGVkID0gdmFtdGlnZXJNZXRhRWxlbWVudFNob3VsZEJlTG9hZGVkICYmIHJlZmVyZW5jZUVsZW1lbnQgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgICB2YW10aWdlck1ldGFFbGVtZW50U2hvdWxkQmVBcHBlbmRlZCA9IHZhbXRpZ2VyTWV0YUVsZW1lbnRTaG91bGRCZUxvYWRlZCAmJiAhcmVmZXJlbmNlRWxlbWVudCA/IHRydWUgOiBmYWxzZTtcblxuICAgICAgICBpZiAodmFtdGlnZXJNZXRhRWxlbWVudFNob3VsZEJlSW5zZXJ0ZWQpXG4gICAgICAgICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKFxuICAgICAgICAgICAgICAgIHZhbXRpZ2VyTWV0YUVsZW1lbnQsXG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlRWxlbWVudFxuICAgICAgICAgICAgKTtcbiAgICAgICAgZWxzZSBpZiAodmFtdGlnZXJNZXRhRWxlbWVudFNob3VsZEJlQXBwZW5kZWQpXG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodmFtdGlnZXJNZXRhRWxlbWVudCk7XG4gICAgfVxuXG4gICAgZ2V0IF9uZXdWYW10aWdlck1ldGFFbGVtZW50KCkge1xuICAgICAgICBjb25zdCBuZXdWYW10aWdlck1ldGFFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbWV0YScpO1xuXG4gICAgICAgIG5ld1ZhbXRpZ2VyTWV0YUVsZW1lbnQuZGF0YXNldC52YW10aWdlciA9IHRydWU7XG4gICAgICAgIG5ld1ZhbXRpZ2VyTWV0YUVsZW1lbnQuZGF0YXNldC5uYW1lID0gJ1ZhbXRpZ2VyIE1ldGEgRWxlbWVudCc7XG5cbiAgICAgICAgcmV0dXJuIG5ld1ZhbXRpZ2VyTWV0YUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgZ2V0IF9sYXN0TWV0YUVsZW1lbnQoKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9yID0gJ21ldGE6bGFzdC1vZi10eXBlJyxcbiAgICAgICAgICAgIGxhc3RNZXRhRWxlbWVudCA9IGRvY3VtZW50LmhlYWQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5cbiAgICAgICAgcmV0dXJuIGxhc3RNZXRhRWxlbWVudDtcbiAgICB9XG5cbiAgICBfaGFuZGxlRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBwYXJhbWV0ZXJzID0+IG5ldyBTZXRWYW10aWdlck1ldGFFbGVtZW50KHBhcmFtZXRlcnMpLl9tYWluOyIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgU2V0TWV0YURhdGEge1xuICAgIGNvbnN0cnVjdG9yKHBhcmFtZXRlcnMpIHtcbiAgICAgICAgdGhpcy5fcGFyYW1ldGVycyA9IHBhcmFtZXRlcnM7XG4gICAgICAgIHRoaXMuX2NsYXNzaWZpY2F0aW9uID0gcGFyYW1ldGVycy5jbGFzc2lmaWNhdGlvbjtcblxuICAgICAgICB0aGlzLl9jbGFzc2lmaWNhdGlvbkVsZW1lbnQgPSBudWxsO1xuICAgIH1cblxuICAgIGdldCBfbWFpbigpIHtcbiAgICAgICAgbGV0IG1haW47XG5cbiAgICAgICAgaWYgKHRoaXMuX2RhdGFJc1ZhbGlkKVxuICAgICAgICAgICAgbWFpbiA9IHRoaXMuX3NldENsYXNzaWZpY2F0aW9uRWxlbWVudFxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuX3NldE1ldGFEYXRhRWxlbWVudClcbiAgICAgICAgICAgICAgICAuY2F0Y2godGhpcy5faGFuZGxlRXJyb3IpO1xuXG4gICAgICAgIHJldHVybiBtYWluO1xuICAgIH1cblxuICAgIGdldCBfZGF0YUlzVmFsaWQoKSB7XG4gICAgICAgIGxldCBkYXRhSXNWYWxpZCA9IHRoaXMuX2NsYXNzaWZpY2F0aW9uID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgICAgIHJldHVybiBkYXRhSXNWYWxpZDtcbiAgICB9XG5cbiAgICBnZXQgX3NldENsYXNzaWZpY2F0aW9uRWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGxldCBjbGFzc2lmaWNhdGlvbkVsZW1lbnQgPSB2YW10aWdlci5nZXQuY2xhc3NpZmllZE1ldGFEYXRhRWxlbWVudCh7XG4gICAgICAgICAgICAgICAgY2xhc3NpZmljYXRpb246IHRoaXMuX2NsYXNzaWZpY2F0aW9uXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5fY2xhc3NpZmljYXRpb25FbGVtZW50ID0gY2xhc3NpZmljYXRpb25FbGVtZW50O1xuXG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldCBfc2V0TWV0YURhdGFFbGVtZW50KCkge1xuICAgICAgICBjb25zdCBtZXRhRGF0YVByb3BlcnRpZXMgPSB0aGlzLl9tZXRhRGF0YVByb3BlcnRpZXMsXG4gICAgICAgICAgICBtZXRhRGF0YUVsZW1lbnQgPSBtZXRhRGF0YVByb3BlcnRpZXMubGVuZ3RoID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbWV0YScpIDogdmFtdGlnZXIuaWdub3JlO1xuXG4gICAgICAgIGlmIChtZXRhRGF0YUVsZW1lbnQpIHtcbiAgICAgICAgICAgIG1ldGFEYXRhUHJvcGVydGllcy5mb3JFYWNoKHByb3BlcnR5ID0+IG1ldGFEYXRhRWxlbWVudC5kYXRhc2V0W3Byb3BlcnR5XSA9IHRoaXMuX3BhcmFtZXRlcnNbcHJvcGVydHldKTtcblxuICAgICAgICAgICAgdGhpcy5fY2xhc3NpZmljYXRpb25FbGVtZW50LmFwcGVuZENoaWxkKG1ldGFEYXRhRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgX21ldGFEYXRhUHJvcGVydGllcygpIHtcbiAgICAgICAgY29uc3QgbWV0YURhdGFQcm9wZXJ0aWVzID0gT2JqZWN0XG4gICAgICAgICAgICAua2V5cyh0aGlzLl9wYXJhbWV0ZXJzKVxuICAgICAgICAgICAgLmZpbHRlcihwcm9wZXJ0eSA9PiAhWFJlZ0V4cC5tYXRjaChwcm9wZXJ0eSwgdmFtdGlnZXIucmVnZXguZXhjbHVkZU1ldGFEYXRhKSk7XG5cbiAgICAgICAgcmV0dXJuIG1ldGFEYXRhUHJvcGVydGllcztcbiAgICB9XG5cbiAgICBfaGFuZGxlRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBwYXJhbWV0ZXJzID0+IG5ldyBTZXRNZXRhRGF0YShwYXJhbWV0ZXJzKS5fbWFpbjsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBTZXRCcm93c2VyQ29tcGF0aWJpbGl0eSBmcm9tICcuL0Jyb3dzZXJDb21wYXRpYmlsaXR5L2luZGV4LmpzJztcbmltcG9ydCBTZXRFbGVtZW50TmFtZSBmcm9tICcuL0VsZW1lbnROYW1lL2luZGV4LmpzJztcbmltcG9ydCBTZXRQb2x5ZmlsbHMgZnJvbSAnLi9Qb2x5ZmlsbHMvaW5kZXguanMnO1xuaW1wb3J0IFNldFZhbXRpZ2VyTWV0YUVsZW1lbnQgZnJvbSAnLi9NZXRhRWxlbWVudC9pbmRleC5qcyc7XG5pbXBvcnQgU2V0TWV0YURhdGEgZnJvbSAnLi9NZXRhRGF0YS9pbmRleC5qcyc7XG5cbmNsYXNzIFZhbXRpZ2VyU2V0IHtcbiAgICBzdGF0aWMgZ2V0IGJyb3dzZXJDb21wYXRpYmlsaXR5KCkge1xuICAgICAgICByZXR1cm4gU2V0QnJvd3NlckNvbXBhdGliaWxpdHk7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBlbGVtZW50TmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIFNldEVsZW1lbnROYW1lO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgcG9seWZpbGxzKCkge1xuICAgICAgICByZXR1cm4gU2V0UG9seWZpbGxzO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgdmFtdGlnZXJNZXRhRWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIFNldFZhbXRpZ2VyTWV0YUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBtZXRhRGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIFNldE1ldGFEYXRhO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVmFtdGlnZXJTZXQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBWYW10aWdlckxvYWQge1xuICAgIGNvbnN0cnVjdG9yKHtzY3JpcHQsIHJlc29sdmUsIHJlamVjdH0pIHtcbiAgICAgICAgdGhpcy5zY3JpcHQgPSBzY3JpcHQ7XG4gICAgICAgIHRoaXMucmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgIHRoaXMucmVqZWN0ID0gcmVqZWN0O1xuXG4gICAgICAgIHRoaXMuX3NjcmlwdFR5cGUgPSBudWxsO1xuICAgICAgICB0aGlzLl9sYXN0RWxlbWVudFNlbGVjdG9yID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbGFzdEVsZW1lbnQgPSBudWxsO1xuICAgIH1cblxuICAgIGdldCBfbWFpbigpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IHRoaXMuX3NldFNjcmlwdFR5cGVcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuX3NldExhc3RFbGVtZW50U2VsZWN0b3IpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLl9zZXRMYXN0RWxlbWVudClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuX3NldFNvdXJjZVVybClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuX2xvYWRTY3JpcHQpXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5faGFuZGxlRXJyb3IpO1xuXG4gICAgICAgIHRoaXMuc2NyaXB0LmRhdGFzZXQudmFtdGlnZXIgPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiBtYWluO1xuICAgIH1cblxuICAgIGdldCBfc2V0U2NyaXB0VHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjcmlwdC5sb2NhbE5hbWUgPT09ICdzY3JpcHQnKVxuICAgICAgICAgICAgICAgIHRoaXMuX3NjcmlwdFR5cGUgPSAnc2NyaXB0JztcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuc2NyaXB0LmxvY2FsTmFtZSA9PT0gJ2xpbmsnICYmIHRoaXMuc2NyaXB0LnJlbCA9PT0gJ3N0eWxlc2hlZXQnKVxuICAgICAgICAgICAgICAgIHRoaXMuX3NjcmlwdFR5cGUgPSAnc3R5bGVzaGVldCc7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9zY3JpcHRUeXBlKVxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdTY3JpcHQgdHlwZSBub3Qgc2V0JykpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgX3NldExhc3RFbGVtZW50U2VsZWN0b3IoKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9ycyA9IG5ldyBTZXQoKTtcblxuICAgICAgICBsZXQgc2VsZWN0b3I7XG5cbiAgICAgICAgaWYgKHRoaXMuc2NyaXB0LmRhdGFzZXQuY2xhc3NpZmljYXRpb24pIHtcbiAgICAgICAgICAgIHNlbGVjdG9ycy5hZGQoYFtkYXRhLWNsYXNzaWZpY2F0aW9uPVwiJHt0aGlzLnNjcmlwdC5kYXRhc2V0LmNsYXNzaWZpY2F0aW9ufVwiXTpsYXN0LW9mLXR5cGVgKTtcbiAgICAgICAgICAgIHNlbGVjdG9ycy5hZGQoYFtkYXRhLWNsYXNzaWZpY2F0aW9uXTpsYXN0LW9mLXR5cGVgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGVjdG9ycy5hZGQoYCR7dGhpcy5zY3JpcHQubG9jYWxOYW1lfTpsYXN0LW9mLXR5cGVgKTtcblxuICAgICAgICBzZWxlY3RvciA9IEFycmF5XG4gICAgICAgICAgICAuZnJvbShzZWxlY3RvcnMpXG4gICAgICAgICAgICAuam9pbignLFxcbicpO1xuXG4gICAgICAgIHRoaXMuX2xhc3RFbGVtZW50U2VsZWN0b3IgPSBzZWxlY3RvcjtcbiAgICB9XG5cbiAgICBnZXQgX3NldExhc3RFbGVtZW50KCkge1xuICAgICAgICBjb25zdCBsYXN0RWxlbWVudCA9IGRvY3VtZW50LmhlYWQucXVlcnlTZWxlY3Rvcih0aGlzLl9sYXN0RWxlbWVudFNlbGVjdG9yKTtcblxuICAgICAgICB0aGlzLl9sYXN0RWxlbWVudCA9IGxhc3RFbGVtZW50O1xuICAgIH1cblxuICAgIGdldCBfc2V0U291cmNlVXJsKCkge1xuICAgICAgICBsZXQgc291cmNlVXJsID0gdGhpcy5zY3JpcHQuc3JjLFxuICAgICAgICAgICAgc2V0U291cmNlVXJsVG9EYXRhVXJsID0gIXNvdXJjZVVybCAmJiB0aGlzLnNjcmlwdC5kYXRhc2V0LnVybDtcbiAgICAgICAgXG4gICAgICAgIGlmIChzZXRTb3VyY2VVcmxUb0RhdGFVcmwpXG4gICAgICAgICAgICB0aGlzLnNjcmlwdC5zcmMgPSB0aGlzLnNjcmlwdC5kYXRhc2V0LnVybDtcbiAgICB9XG5cbiAgICBnZXQgX2xvYWRTY3JpcHQoKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuX2xhc3RFbGVtZW50LnBhcmVudEVsZW1lbnQsXG4gICAgICAgICAgICByZWZlcmVuY2VFbGVtZW50ID0gdGhpcy5fbGFzdEVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xuXG4gICAgICAgIHRoaXMuc2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBldmVudCA9PiB0aGlzLnJlc29sdmUodGhpcy5zY3JpcHQpKTtcbiAgICAgICAgdGhpcy5zY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvciA9PiB0aGlzLnJlamVjdCh7XG4gICAgICAgICAgICBlcnJvcixcbiAgICAgICAgICAgIHNjcmlwdDogdGhpcy5zY3JpcHRcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoXG4gICAgICAgICAgICB0aGlzLnNjcmlwdCxcbiAgICAgICAgICAgIHJlZmVyZW5jZUVsZW1lbnRcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBfaGFuZGxlRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBwYXJhbWV0ZXJzID0+IG5ldyBWYW10aWdlckxvYWQocGFyYW1ldGVycykuX21haW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBMb2FkUG9seWZpbGxzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fcG9seWZpbGxNZXRhRWxlbWVudHMgPSBudWxsO1xuICAgICAgICB0aGlzLl9zY3JpcHRNYXAgPSBudWxsO1xuICAgIH1cbiAgICBcbiAgICBnZXQgX21haW4oKSB7XG4gICAgICAgIGNvbnN0IG1haW4gPSBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5fc2V0UG9seWZpbGxNZXRhRWxlbWVudHMpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLl9zZXRTY3JpcHRNYXApXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLl9sb2FkU2NyaXB0cylcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLl9oYW5kbGVFcnJvcik7XG4gICAgfVxuXG4gICAgZ2V0IF9zZXRQb2x5ZmlsbE1ldGFFbGVtZW50cygpIHtcbiAgICAgICAgY29uc3QgcG9seWZpbGxNZXRhRWxlbWVudHMgPSB2YW10aWdlci5nZXQucG9seWZpbGxNZXRhRWxlbWVudHMoKTtcblxuICAgICAgICB0aGlzLl9wb2x5ZmlsbE1ldGFFbGVtZW50cyA9ICBwb2x5ZmlsbE1ldGFFbGVtZW50cztcbiAgICB9XG5cbiAgICBnZXQgX3NldFNjcmlwdE1hcCgpIHtcbiAgICAgICAgY29uc3Qgc2NyaXB0TWFwID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGxldCBzY3JpcHQsXG4gICAgICAgICAgICBkYXRhUHJvcGVydGllcztcblxuICAgICAgICB0aGlzLl9wb2x5ZmlsbE1ldGFFbGVtZW50cy5mb3JFYWNoKHBvbHlmaWxsTWV0YUVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgICAgICBkYXRhUHJvcGVydGllcyA9IE9iamVjdC5rZXlzKHBvbHlmaWxsTWV0YUVsZW1lbnQuZGF0YXNldCk7XG5cbiAgICAgICAgICAgIHNjcmlwdC5zcmMgPSBwb2x5ZmlsbE1ldGFFbGVtZW50LmRhdGFzZXQudXJsO1xuXG4gICAgICAgICAgICBzY3JpcHRNYXAuc2V0KHNjcmlwdCwgcG9seWZpbGxNZXRhRWxlbWVudCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX3NjcmlwdE1hcCA9IHNjcmlwdE1hcDtcbiAgICB9XG5cbiAgICBnZXQgX3NjcmlwdHMoKSB7XG4gICAgICAgIGNvbnN0IHNjcmlwdHMgPSBBcnJheS5mcm9tKHRoaXMuX3NjcmlwdE1hcC5rZXlzKCkpO1xuXG4gICAgICAgIHJldHVybiBzY3JpcHRzO1xuICAgIH1cblxuICAgIGdldCBfbG9hZFNjcmlwdHMoKSB7XG4gICAgICAgIGxldCBsb2FkU2NyaXB0cyA9IFByb21pc2UuYWxsKFxuICAgICAgICAgICAgdGhpcy5fc2NyaXB0cy5tYXAoc2NyaXB0ID0+IHRoaXMuX2xvYWRTY3JpcHQoc2NyaXB0KSlcbiAgICAgICAgKTtcblxuICAgICAgICBsb2FkU2NyaXB0cyA9IGxvYWRTY3JpcHRzXG4gICAgICAgICAgICAudGhlbihzY3JpcHRzID0+IHRoaXMuX3VwZGF0ZU1ldGFEYXRhKHNjcmlwdHMpKVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuX2hhbmRsZUVycm9yKTtcblxuICAgICAgICByZXR1cm4gbG9hZFNjcmlwdHM7XG4gICAgfVxuXG4gICAgX2xvYWRTY3JpcHQoc2NyaXB0KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZXRhRWxlbWVudCA9IHRoaXMuX3NjcmlwdE1hcC5nZXQoc2NyaXB0KTtcblxuICAgICAgICAgICAgc2NyaXB0LmRhdGFzZXQuc3RhdGUgPSAnbG9hZGluZyc7XG4gICAgICAgICAgICBtZXRhRWxlbWVudC5kYXRhc2V0LnN0YXRlID0gJ2xvYWRpbmcnO1xuXG4gICAgICAgICAgICB2YW10aWdlci5sb2FkLnNjcmlwdCh7XG4gICAgICAgICAgICAgICAgc2NyaXB0LFxuICAgICAgICAgICAgICAgIHJlc29sdmUsXG4gICAgICAgICAgICAgICAgcmVqZWN0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX3VwZGF0ZU1ldGFEYXRhKHNjcmlwdHMpIHtcbiAgICAgICAgbGV0IG1ldGFFbGVtZW50O1xuICAgICAgICBcbiAgICAgICAgc2NyaXB0cy5mb3JFYWNoKHNjcmlwdCA9PiB7XG4gICAgICAgICAgICBtZXRhRWxlbWVudCA9IHRoaXMuX3NjcmlwdE1hcC5nZXQoc2NyaXB0KTtcblxuICAgICAgICAgICAgc2NyaXB0LmRhdGFzZXQuc3RhdGUgPSAnbG9hZGVkJztcbiAgICAgICAgICAgIG1ldGFFbGVtZW50LmRhdGFzZXQuc3RhdGUgPSAnbG9hZGVkJztcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBfaGFuZGxlRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXJyb3JcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcmFtZXRlcnMgPT4gbmV3IExvYWRQb2x5ZmlsbHMocGFyYW1ldGVycykuX21haW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBVc2VySW50ZXJmYWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fcHJpbWFyeSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5fc2Vjb25kYXJ5ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLl90ZXJ0aWFyeSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgXG4gICAgZ2V0IF9tYWluKCkge1xuICAgICAgICBjb25zdCBtYWluID0gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuX2xvYWRVaVNjcmlwdHMpXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5faGFuZGxlRXJyb3IpO1xuXG4gICAgICAgIHJldHVybiBtYWluO1xuICAgIH1cblxuICAgIGdldCBfbG9hZFVpU2NyaXB0cygpIHtcbiAgICAgICAgbGV0IGxvYWRVaVNjcmlwdHMgPSBQcm9taXNlLnJlc29sdmUoKTtcblxuICAgICAgICB0aGlzLl91aVNjcmlwdHMuZm9yRWFjaChzY3JpcHQgPT4gbG9hZFVpU2NyaXB0cyA9IGxvYWRVaVNjcmlwdHMudGhlbigoKSA9PiB0aGlzLl9sb2FkVWlTY3JpcHQoc2NyaXB0KSkpO1xuXG4gICAgICAgIGxvYWRVaVNjcmlwdHMuY2F0Y2godGhpcy5faGFuZGxlRXJyb3IpO1xuXG4gICAgICAgIHJldHVybiBsb2FkVWlTY3JpcHRzO1xuICAgIH1cblxuICAgIF9sb2FkVWlTY3JpcHQoc2NyaXB0KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB2YW10aWdlci5sb2FkLnNjcmlwdCh7c2NyaXB0LCByZXNvbHZlLCByZWplY3R9KSk7XG4gICAgfVxuXG4gICAgZ2V0IF91aVNjcmlwdHMoKSB7XG4gICAgICAgIGNvbnN0IHVybHMgPSBbXG4gICAgICAgICAgICAgICAgJ1ByaW1hcnkvaW5kZXguanMnLFxuICAgICAgICAgICAgICAgICdTZWNvbmRhcnkvaW5kZXguanMnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgdWlTY3JpcHRzID0gW107XG4gICAgICAgIFxuICAgICAgICBsZXQgc2NyaXB0O1xuICAgICAgICBcbiAgICAgICAgdXJscy5mb3JFYWNoKHVybCA9PiB7XG4gICAgICAgICAgICBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuICAgICAgICAgICAgc2NyaXB0LnNyYyA9IGBKcy9VSS8ke3VybH1gO1xuXG4gICAgICAgICAgICB1aVNjcmlwdHMucHVzaChzY3JpcHQpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdWlTY3JpcHRzO1xuICAgIH1cblxuICAgIF9oYW5kbGVFcnJvcihlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcblxuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcmFtZXRlcnMgPT4gbmV3IFVzZXJJbnRlcmZhY2UocGFyYW1ldGVycykuX21haW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBWYW10aWdlclRlc3Qge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9zY3JpcHQgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIFxuICAgIGdldCBfbWFpbigpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IFByb21pc2UucmVzb2x2ZSgpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLl9zZXRTY3JpcHQpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLl9sb2FkVGVzdClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuX3NldE1ldGFEYXRhKVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuX2hhbmRsZUVycm9yKTtcbiAgICB9XG5cbiAgICBnZXQgX3NldFNjcmlwdCgpIHtcbiAgICAgICAgY29uc3QgbG9jYWxVcmwgPSBYUmVnRXhwLm1hdGNoKGRvY3VtZW50LlVSTCwgdmFtdGlnZXIucmVnZXgubG9jYWxVcmwpO1xuXG4gICAgICAgIGxldCBzY3JpcHQ7XG5cbiAgICAgICAgaWYgKGxvY2FsVXJsKSB7XG4gICAgICAgICAgICBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuICAgICAgICAgICAgc2NyaXB0LnNyYyA9IHRoaXMuX3VybDtcblxuICAgICAgICAgICAgdGhpcy5fc2NyaXB0ID0gc2NyaXB0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IF9sb2FkVGVzdCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zY3JpcHQpXG4gICAgICAgICAgICAgICAgdmFtdGlnZXIubG9hZC5zY3JpcHQoe1xuICAgICAgICAgICAgICAgICAgICBzY3JpcHQ6IHRoaXMuX3NjcmlwdCxcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgX3VybCgpIHtcbiAgICAgICAgY29uc3QgdXJsID0gJ0pzL1Rlc3QvaW5kZXguanMnO1xuXG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuXG4gICAgX2hhbmRsZUVycm9yKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBhcmFtZXRlcnMgPT4gbmV3IFZhbXRpZ2VyVGVzdChwYXJhbWV0ZXJzKS5fbWFpbjsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBMb2FkU2NyaXB0IGZyb20gJy4vU2NyaXB0L2luZGV4LmpzJztcbmltcG9ydCBQb2x5ZmlsbHMgZnJvbSAnLi9Qb2x5ZmlsbHMvaW5kZXguanMnO1xuaW1wb3J0IFVzZXJJbnRlcmZhY2UgZnJvbSAnLi9Vc2VySW50ZXJmYWNlL2luZGV4LmpzJztcbmltcG9ydCBWYW10aWdlclRlc3QgZnJvbSAnLi9UZXN0L2luZGV4LmpzJztcblxuY2xhc3MgVmFtdGlnZXJMb2FkIHtcbiAgICBzdGF0aWMgZ2V0IHNjcmlwdCgpIHtcbiAgICAgICAgcmV0dXJuIExvYWRTY3JpcHQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBwb2x5ZmlsbHMoKSB7XG4gICAgICAgIHJldHVybiBQb2x5ZmlsbHM7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCB1c2VySW50ZXJmYWNlKCkge1xuICAgICAgICByZXR1cm4gVXNlckludGVyZmFjZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IHRlc3QoKSB7XG4gICAgICAgIHJldHVybiBWYW10aWdlclRlc3Q7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBWYW10aWdlckxvYWQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBJbmRleEZpbGVSZWdleCB7XG4gICAgc3RhdGljIGdldCBfbWFpbigpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IHRoaXMuX3JlZ2V4O1xuXG4gICAgICAgIHJldHVybiBtYWluO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgX3JlZ2V4KCkge1xuICAgICAgICBjb25zdCBwYXR0ZXJuID0gJ15pbmRleCcsXG4gICAgICAgICAgICByZWdleCA9IFhSZWdFeHAocGF0dGVybik7XG5cbiAgICAgICAgcmV0dXJuIHJlZ2V4O1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW5kZXhGaWxlUmVnZXguX21haW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBVcmxQYXJhbXMge1xuICAgIHN0YXRpYyBnZXQgX21haW4oKSB7XG4gICAgICAgIGNvbnN0IG1haW4gPSB0aGlzLl9yZWdleDtcblxuICAgICAgICByZXR1cm4gbWFpbjtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IF9yZWdleCgpIHtcbiAgICAgICAgY29uc3QgcGF0dGVybiA9IGBcbiAgICAgICAgICAgICAgICBcXFxcP1xuICAgICAgICAgICAgICAgICg/PHVybFBhcmFtcz5cbiAgICAgICAgICAgICAgICAgICAgLipcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAkYCxcbiAgICAgICAgICAgIHJlZ2V4ID0gWFJlZ0V4cChwYXR0ZXJuLCAneG1ucycpO1xuXG4gICAgICAgIHJldHVybiByZWdleDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFVybFBhcmFtcy5fbWFpbjsiLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIEV4Y2x1ZGVNZXRhRGF0YSB7XG4gICAgc3RhdGljIGdldCBfbWFpbigpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IHRoaXMuX3JlZ2V4O1xuXG4gICAgICAgIHJldHVybiBtYWluO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgX3JlZ2V4KCkge1xuICAgICAgICBjb25zdCBwYXR0ZXJuID0gYF5cbiAgICAgICAgICAgICAgICBjbGFzc2lmaWNhdGlvblxuICAgICAgICAgICAgICAgIHxcbiAgICAgICAgICAgICAgICB2YW10aWdlclxuICAgICAgICAgICAgJGAsXG4gICAgICAgICAgICByZWdleCA9IFhSZWdFeHAocGF0dGVybiwgJ3hpbicpO1xuXG4gICAgICAgIHJldHVybiByZWdleDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV4Y2x1ZGVNZXRhRGF0YS5fbWFpbjsiLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIFVybFBhcmFtcyB7XG4gICAgc3RhdGljIGdldCBfbWFpbigpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IHRoaXMuX3JlZ2V4O1xuXG4gICAgICAgIHJldHVybiBtYWluO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgX3JlZ2V4KCkge1xuICAgICAgICBjb25zdCBwYXR0ZXJuID0gYF5cbiAgICAgICAgICAgICAgICAoPzxsb2NhbFVybD5cbiAgICAgICAgICAgICAgICAgICAgZmlsZTpcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICBgLFxuICAgICAgICAgICAgcmVnZXggPSBYUmVnRXhwKHBhdHRlcm4sICd4bW5zJyk7XG5cbiAgICAgICAgcmV0dXJuIHJlZ2V4O1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVXJsUGFyYW1zLl9tYWluOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGluZGV4RmlsZSBmcm9tICcuL0luZGV4RmlsZS9pbmRleC5qcyc7XG5pbXBvcnQgdXJsUGFyYW1zIGZyb20gJy4vVXJsUGFyYW1zL2luZGV4LmpzJztcbmltcG9ydCBleGNsdWRlTWV0YURhdGEgZnJvbSAnLi9FeGNsdWRlTWV0YURhdGEvaW5kZXguanMnO1xuaW1wb3J0IGxvY2FsVXJsIGZyb20gJy4vTG9jYWxVcmwvaW5kZXguanMnO1xuXG5jbGFzcyBWYW10aWdlclJlZ2V4IHtcbiAgICBzdGF0aWMgZ2V0IGluZGV4RmlsZSgpIHtcbiAgICAgICAgcmV0dXJuIGluZGV4RmlsZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IHVybFBhcmFtcygpIHtcbiAgICAgICAgcmV0dXJuIHVybFBhcmFtcztcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IGV4Y2x1ZGVNZXRhRGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIGV4Y2x1ZGVNZXRhRGF0YTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IGxvY2FsVXJsKCkge1xuICAgICAgICByZXR1cm4gbG9jYWxVcmw7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBWYW10aWdlclJlZ2V4OyIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgVmFtdGlnZXJSZW1vdmVFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3Rvcih7ZWxlbWVudH0pIHtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB9XG5cbiAgICBnZXQgX21haW4oKSB7XG4gICAgICAgIGxldCBtYWluID0gdGhpcy5lbGVtZW50ID8gdGhpcy5fcmVtb3ZlRWxlbWVudCA6IHZhbXRpZ2VyLmlnbm9yZTtcblxuICAgICAgICBpZiAodGhpcy5lbGVtZW50KVxuICAgICAgICAgICAgbWFpbiA9IHRoaXMuX3JlbW92ZUVsZW1lbnQ7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZUVycm9yKG5ldyBFcnJvcignRWxlbWVudCBub3QgcmVtb3ZlZDogTm8gZWxlbWVudCBkZWZpbmVkJykpO1xuXG4gICAgICAgIHJldHVybiBtYWluO1xuICAgIH1cblxuICAgIGdldCBfcmVtb3ZlRWxlbWVudCgpIHtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5lbGVtZW50LnBhcmVudEVsZW1lbnQsXG4gICAgICAgICAgICBlbGVtZW50Q2FuQmVSZW1vdmVkID0gcGFyZW50ID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgICAgIGlmIChlbGVtZW50Q2FuQmVSZW1vdmVkKVxuICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKHRoaXMuZWxlbWVudCk7XG4gICAgfVxuXG4gICAgX2hhbmRsZUVycm9yKGVycm9yKSB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyYW1ldGVycyA9PiBuZXcgVmFtdGlnZXJSZW1vdmVFbGVtZW50KHBhcmFtZXRlcnMpLl9tYWluOyIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgQnJvd3NlckNvbXBhdGliaWxpdHlTY3JpcHRzIHtcbiAgICBnZXQgX21haW4oKSB7XG4gICAgICAgIGNvbnN0IG1haW4gPSB0aGlzLl9yZW1vdmVCcm93c2VyQ29tcGF0aWJpbGl0eVNjcmlwdHNcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLl9oYW5kbGVFcnJvcik7XG5cbiAgICAgICAgcmV0dXJuIG1haW47XG4gICAgfVxuXG4gICAgZ2V0IF9yZW1vdmVCcm93c2VyQ29tcGF0aWJpbGl0eVNjcmlwdHMoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZW1vdmVTY3JpcHRQYXJhbXMgPSBBcnJheVxuICAgICAgICAgICAgICAgIC5mcm9tKHRoaXMuX3NjcmlwdHMpXG4gICAgICAgICAgICAgICAgLm1hcChzY3JpcHQgPT4gT2JqZWN0KHtlbGVtZW50OiBzY3JpcHR9KSk7XG5cbiAgICAgICAgICAgIHJlbW92ZVNjcmlwdFBhcmFtcy5mb3JFYWNoKHZhbXRpZ2VyLnJlbW92ZS5lbGVtZW50KTtcblxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgX3NjcmlwdHMoKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuX3BhcmVudCxcbiAgICAgICAgICAgIHNlbGVjdG9yID0gdGhpcy5fc2VsZWN0b3IsXG4gICAgICAgICAgICBzY3JpcHRzID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXG4gICAgICAgIHJldHVybiBzY3JpcHRzO1xuICAgIH1cblxuICAgIGdldCBfcGFyZW50KCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuaGVhZDtcbiAgICB9XG5cbiAgICBnZXQgX3NlbGVjdG9yKCkge1xuICAgICAgICBjb25zdCBzZWxlY3RvciA9IGBcbiAgICAgICAgICAgIHNjcmlwdFtkYXRhLWJyb3dzZXItY29tcGF0aWJpbGl0eV1cbiAgICAgICAgYDtcblxuICAgICAgICByZXR1cm4gc2VsZWN0b3I7XG4gICAgfVxuXG4gICAgX2hhbmRsZUVycm9yKGVycm9yKSB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyYW1ldGVycyA9PiBuZXcgQnJvd3NlckNvbXBhdGliaWxpdHlTY3JpcHRzKCkuX21haW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgVmFtdGlnZXJFbGVtZW50IGZyb20gJy4vRWxlbWVudC9pbmRleC5qcyc7XG5pbXBvcnQgQnJvd3NlckNvbXBhdGliaWxpdHlTY3JpcHRzIGZyb20gJy4vQnJvd3NlckNvbXBhdGliaWxpdHlTY3JpcHRzL2luZGV4LmpzJztcblxuY2xhc3MgVmFtdGlnZXJSZW1vdmUge1xuICAgIHN0YXRpYyBnZXQgZWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIFZhbXRpZ2VyRWxlbWVudDtcbiAgICB9XG4gICAgXG4gICAgc3RhdGljIGdldCBicm93c2VyQ29tcGF0aWJpbGl0eVNjcmlwdHMoKSB7XG4gICAgICAgIHJldHVybiBCcm93c2VyQ29tcGF0aWJpbGl0eVNjcmlwdHM7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBWYW10aWdlclJlbW92ZTsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBWYW10aWdlckdldCBmcm9tICcuL0dldC9pbmRleC5qcyc7XG5pbXBvcnQgVmFtdGlnZXJTZXQgZnJvbSAnLi9TZXQvaW5kZXguanMnO1xuaW1wb3J0IFZhbXRpZ2VyTG9hZCBmcm9tICcuL0xvYWQvaW5kZXguanMnO1xuaW1wb3J0IFZhbXRpZ2VyUmVnZXggZnJvbSAnLi9SZWdleC9pbmRleC5qcyc7XG5pbXBvcnQgVmFtdGlnZXJSZW1vdmUgZnJvbSAnLi9SZW1vdmUvaW5kZXguanMnO1xuXG5jbGFzcyBWYW10aWdlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkRWxlbWVudHMgPSB7fTtcbiAgICB9XG4gICAgXG4gICAgbWFpbigpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IHRoaXMuc2V0LnZhbXRpZ2VyTWV0YUVsZW1lbnQoKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5zZXQuYnJvd3NlckNvbXBhdGliaWxpdHkoKSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuc2V0LnBvbHlmaWxscygpKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5sb2FkLnVzZXJJbnRlcmZhY2UoKSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMubG9hZC50ZXN0KCkpXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5faGFuZGxlRXJyb3IpO1xuXG4gICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvYWQnLCB0aGlzLm1haW4pO1xuXG4gICAgICAgIHJldHVybiBtYWluO1xuICAgIH1cblxuICAgIGdldCBpZ25vcmUoKSB7fVxuXG4gICAgZ2V0IGdldCgpIHtcbiAgICAgICAgcmV0dXJuIFZhbXRpZ2VyR2V0O1xuICAgIH1cblxuICAgIGdldCBzZXQoKSB7XG4gICAgICAgIHJldHVybiBWYW10aWdlclNldDtcbiAgICB9XG5cbiAgICBnZXQgbG9hZCgpIHtcbiAgICAgICAgcmV0dXJuIFZhbXRpZ2VyTG9hZDtcbiAgICB9XG5cbiAgICBnZXQgcmVnZXgoKSB7XG4gICAgICAgIHJldHVybiBWYW10aWdlclJlZ2V4O1xuICAgIH1cblxuICAgIGdldCBzZWxlY3RlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkRWxlbWVudHM7XG4gICAgfVxuXG4gICAgZ2V0IHJlbW92ZSgpIHtcbiAgICAgICAgcmV0dXJuIFZhbXRpZ2VyUmVtb3ZlO1xuICAgIH1cblxuICAgIF9oYW5kbGVFcnJvcihlcnJvcikge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFZhbXRpZ2VyOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFZhbXRpZ2VyIGZyb20gJy4vTWFpbi9pbmRleC5qcyc7XG5cbndpbmRvdy52YW10aWdlciA9IG5ldyBWYW10aWdlcigpO1xuXG5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZXZlbnQgPT4gdmFtdGlnZXIubWFpbigpKTsiXSwibmFtZXMiOlsiVmFtdGlnZXJNZXRhRWxlbWVudCIsIkNsYXNzaWZpZWRNZXRhRGF0YUVsZW1lbnQiLCJVbnN1cHBvcnRlZEZlYXR1cmVzIiwiQnJvd3NlckNvbXBhdGliaWxpdHlFbGVtZW50IiwiUG9seWZpbGxVcmwiLCJQb2x5ZmlsbE1ldGFFbGVtZW50cyIsIlBvbHlmaWxsTWV0YUVsZW1lbnQiLCJCcm93c2VyQ29tcGF0aWJpbGl0eVdlYlN0b3JhZ2UiLCJCcm93c2VyQ29tcGF0aWJpbGl0eVdpdGhNdXRhdGlvbk9ic2VydmVyIiwiQnJvd3NlckNvbXBhdGliaWxpdHlXaXRoQ3VzdG9tRWxlbWVudHMiLCJTZXRFbGVtZW50TmFtZSIsIlNldFBvbHlmaWxscyIsIlNldFZhbXRpZ2VyTWV0YUVsZW1lbnQiLCJTZXRNZXRhRGF0YSIsIlZhbXRpZ2VyTG9hZCIsIlVzZXJJbnRlcmZhY2UiLCJWYW10aWdlclRlc3QiLCJVcmxQYXJhbXMiLCJCcm93c2VyQ29tcGF0aWJpbGl0eVNjcmlwdHMiXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sbUJBQW1CLENBQUM7SUFDdEIsSUFBSSxLQUFLLEdBQUc7UUFDUixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUM7O1FBRXZDLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7O0lBRUQsSUFBSSxvQkFBb0IsR0FBRztRQUN2QixJQUFJLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsQ0FBQzs7UUFFekUsSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQ3RCLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxJQUFJ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