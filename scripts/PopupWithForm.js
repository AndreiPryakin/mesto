export default class PopupWithForm extends Popup {
    constructor(popupSelector, onSubmit) {
        super(popupSelector);
        this._onSubmit = onSubmit;
        this._form = this._popup.querySelector('.form');
    }

    _getInputValues() {
        this._inputList = this._form.querySelectorAll('.form__input');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }
}