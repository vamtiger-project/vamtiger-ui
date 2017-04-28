'use strict';

import VamtigerMetaElement from './VamtigerMetaElement/index.js';
import ClassifiedMetaDataElement from './ClassifiedMetaDataElement/index.js';
import UnsupportedFeatures from './UnsupportedFeatures/index.js';
import BrowserCompatibilityElement from './BrowserCompatibilityElement/index.js';
import PolyfillUrl from './PolyfillUrl/index.js';
import PolyfillMetaElements from './PolyfillMetaElements/index.js';
import PolyfillMetaElement from './PolyfillMetaElement/index.js';

class VamtigerGet {
    static get vamtigerMetaElement() {
        return VamtigerMetaElement;
    }
    
    static get classifiedMetaDataElement() {
        return ClassifiedMetaDataElement
    }

    static get unsupportedFeatures() {
        return UnsupportedFeatures;
    }

    static get browserCompatibilityElement() {
        return BrowserCompatibilityElement;
    }

    static get polyfillUrl() {
        return PolyfillUrl;
    }

    static get polyfillMetaElements() {
        return PolyfillMetaElements;
    }

    static get polyfillMetaElement() {
        return PolyfillMetaElement;
    }
}

export default VamtigerGet;