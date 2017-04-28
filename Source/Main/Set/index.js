'use strict';

import SetBrowserCompatibility from './BrowserCompatibility/index.js';
import SetElementName from './ElementName/index.js';
import SetPolyfills from './Polyfills/index.js';
import SetVamtigerMetaElement from './MetaElement/index.js';
import SetMetaData from './MetaData/index.js';

class VamtigerSet {
    static get browserCompatibility() {
        return SetBrowserCompatibility;
    }

    static get elementName() {
        return SetElementName;
    }

    static get polyfills() {
        return SetPolyfills;
    }

    static get vamtigerMetaElement() {
        return SetVamtigerMetaElement;
    }

    static get metaData() {
        return SetMetaData;
    }
}

export default VamtigerSet;