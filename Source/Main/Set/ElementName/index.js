'use strict';

class SetElementName {
    constructor({element}) {
        this.element = element;

        this._elementName = null;
    }

    get _main() {
        const main = this._setElementName;

        return main;
    }

    get _setElementName() {
        const possibleElementNames = this._possibleElementNames,
            elementName = possibleElementNames.find(possibleElementName => !XRegExp.match(possibleElementName, vamtiger.regex.indexFile)),
            elementNameShouldBeSet = elementName ? true : false;

        if (elementNameShouldBeSet)
            this.element.dataset.name = elementName;
    }

    get _possibleElementNames() {
        let elementUrl = this.element.src ? this.element.src : this.element.href,
            allPossibleElementNames,
            possibleElementNames = [];

        if (elementUrl) {
            elementUrl = XRegExp.replace(elementUrl, vamtiger.regex.urlParams, '');
            allPossibleElementNames = elementUrl.split('/');

            possibleElementNames = allPossibleElementNames.slice(allPossibleElementNames.length - 2);
            possibleElementNames.reverse();
        }

        return possibleElementNames;
    }

    _handleError(error) {
        throw error;
    }
}

export default parameters => new SetElementName(parameters)._main;