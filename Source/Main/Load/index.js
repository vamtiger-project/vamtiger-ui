'use strict';

import LoadScript from './Script/index.js';
import Polyfills from './Polyfills/index.js';
import UserInterface from './UserInterface/index.js';
import VamtigerTest from './Test/index.js';

class VamtigerLoad {
    static get script() {
        return LoadScript;
    }

    static get polyfills() {
        return Polyfills;
    }

    static get userInterface() {
        return UserInterface;
    }

    static get test() {
        return VamtigerTest;
    }
}

export default VamtigerLoad;