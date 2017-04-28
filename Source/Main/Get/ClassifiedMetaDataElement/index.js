'use strict';

class ClassifiedMetaDataElement {
    constructor({classification}) {
        this.classification = classification;
    }

    get _main() {
        let main;

        if (this.classification)
            main = this._getClassifiedMetaDataElement;
        else
            this._handleError(new Error('Did not get classified meta data element: No classification defined'));

        return main;
    }

    get _getClassifiedMetaDataElement() {
        const selector = this._selector,
            parent = this._parent;
        
        let classifiedMetaDataElement = parent.querySelector(selector);

        if (!classifiedMetaDataElement) {
            classifiedMetaDataElement = document.createElement('meta');
            
            classifiedMetaDataElement.dataset['classification'] = this.classification;

            parent.appendChild(classifiedMetaDataElement);
        }

        return classifiedMetaDataElement;
    }

    get _parent() {
        const parent = vamtiger.get.vamtigerMetaElement();

        return parent;
    }

    get _selector() {
        const selector = `meta[data-classification="${this.classification}"]`;

        return selector;
    }
}

export default parameters => new ClassifiedMetaDataElement(parameters)._main;