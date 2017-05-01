'use strict';

class VamtigerTest {
    constructor() {
        this._script = undefined;
    }
    
    get _main() {
        const main = Promise.resolve()
            .then(() => this._setScript)
            .then(() => this._loadTest)
            .then(() => this._setMetaData)
            .catch(this._handleError);
    }

    get _setScript() {
        const localUrl = XRegExp.match(document.URL, vamtiger.regex.localUrl);

        let script;

        if (localUrl) {
            script = document.createElement('script');

            script.src = this._url;

            this._script = script;
        }
    }

    get _loadTest() {
        return new Promise((resolve, reject) => {
            if (this._script)
                vamtiger.load.script({
                    script: this._script,
                    resolve,
                    reject
                });
            else
                resolve();
        });
    }

    get _url() {
        const url = 'Js/Test/index.js';

        return url;
    }

    _handleError(error) {
        console.error(error);

        throw error;
    }
};

export default parameters => new VamtigerTest(parameters)._main;