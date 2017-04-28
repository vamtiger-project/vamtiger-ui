'use strict';

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

export default ExcludeMetaData._main;