'use strict';

import VamtigerGet from './Get/index.js';
import VamtigerSet from './Set/index.js';
import VamtigerLoad from './Load/index.js';
import VamtigerRegex from './Regex/index.js';
import VamtigerRemove from './Remove/index.js';

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

export default Vamtiger;