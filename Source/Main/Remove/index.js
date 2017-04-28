'use strict';

import VamtigerElement from './Element/index.js';
import BrowserCompatibilityScripts from './BrowserCompatibilityScripts/index.js';

class VamtigerRemove {
    static get element() {
        return VamtigerElement;
    }
    
    static get browserCompatibilityScripts() {
        return BrowserCompatibilityScripts;
    }
}

export default VamtigerRemove;