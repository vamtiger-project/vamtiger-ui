'use strict';

class IndexFileRegex {
    static get _main() {
        const main = this._regex;

        return main;
    }

    static get _regex() {
        const pattern = '^index',
            regex = XRegExp(pattern);

        return regex;
    }
}

export default IndexFileRegex._main;