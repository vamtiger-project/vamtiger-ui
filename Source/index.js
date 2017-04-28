'use strict';

import Vamtiger from './Main/index.js';

window.vamtiger = new Vamtiger();

addEventListener('load', event => vamtiger.main());