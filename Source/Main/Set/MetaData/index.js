'use strict';

class SetMetaData {
    constructor(parameters) {
        this._parameters = parameters;
        this._classification = parameters.classification;

        this._classificationElement = null;
    }

    get _main() {
        let main;

        if (this._dataIsValid)
            main = this._setClassificationElement
                .then(() => this._setMetaDataElement)
                .catch(this._handleError);

        return main;
    }

    get _dataIsValid() {
        let dataIsValid = this._classification ? true : false;

        return dataIsValid;
    }

    get _setClassificationElement() {
        return new Promise((resolve, reject) => {
            let classificationElement = vamtiger.get.classifiedMetaDataElement({
                classification: this._classification
            });

            this._classificationElement = classificationElement;

            resolve();
        });
    }

    get _setMetaDataElement() {
        const metaDataProperties = this._metaDataProperties,
            metaDataElement = metaDataProperties.length ? document.createElement('meta') : vamtiger.ignore;

        if (metaDataElement) {
            metaDataProperties.forEach(property => metaDataElement.dataset[property] = this._parameters[property]);

            this._classificationElement.appendChild(metaDataElement);
        }
    }

    get _metaDataProperties() {
        const metaDataProperties = Object
            .keys(this._parameters)
            .filter(property => !XRegExp.match(property, vamtiger.regex.excludeMetaData));

        return metaDataProperties;
    }

    _handleError(error) {
        return Promise.reject(error);
    }
}

export default parameters => new SetMetaData(parameters)._main;