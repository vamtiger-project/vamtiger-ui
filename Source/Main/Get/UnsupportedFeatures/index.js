'use strict';

class UnsupportedFeatures {
    get _main() {
        const main = this._unsupportedFeatures;

        return main;
    }

    get _unsupportedFeatures() {
        const browserCompatibilityElement = vamtiger.get.browserCompatibilityElement(),
            unsupportedFeatures = Array
                .from(browserCompatibilityElement.children)
                .filter(element => element.dataset.browserCompatibility === "false")
                .map(element => element.dataset.feature);

        return unsupportedFeatures;
    }
}

export default parameters => new UnsupportedFeatures(parameters)._main;