'use strict';

import '../../node_modules/mocha/mocha.js';
import '../../node_modules/chai/chai.js';
import '../../node_modules/xregexp/xregexp-all.js';

if (chai)
    window.expect = chai.expect;

mocha.setup('bdd');