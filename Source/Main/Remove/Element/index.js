'use strict';

class VamtigerRemoveElement {
    constructor({element}) {
        this.element = element;
    }

    get _main() {
        let main = this.element ? this._removeElement : vamtiger.ignore;

        if (this.element)
            main = this._removeElement;
        else
            this._handleError(new Error('Element not removed: No element defined'));

        return main;
    }

    get _removeElement() {
        const parent = this.element.parentElement,
            elementCanBeRemoved = parent ? true : false;

        if (elementCanBeRemoved)
            parent.removeChild(this.element);
    }

    _handleError(error) {
        throw error;
    }
}

export default parameters => new VamtigerRemoveElement(parameters)._main;