'use strict';

import LoadScript from './Script/index.js';
import Polyfills from './Polyfills/index.js'

class VamtigerLoad {
    static get script() {
        return LoadScript;
    }

    static get polyfills() {
        return Polyfills;
    }
}

export default VamtigerLoad;