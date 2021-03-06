'use strict';

class UrlParams {
    static get _main() {
        const main = this._regex;

        return main;
    }

    static get _regex() {
        const pattern = `^
                (?<localUrl>
                    file:
                )
            `,
            regex = XRegExp(pattern, 'xmns');

        return regex;
    }
}

export default UrlParams._main;