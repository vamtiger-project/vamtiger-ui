'use strict';

import indexFile from './IndexFile/index.js';
import urlParams from './UrlParams/index.js';
import excludeMetaData from './ExcludeMetaData/index.js';

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
}

export default VamtigerRegex;