import {Popup} from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popupSelector, onSubmit, resetError, getValuesCallback = null) {
        super(popupSelector);
        this._popupSelector = popupSelector;
        this._onSubmit = onSubmit;
        this._form = this._popup.querySelector('.form');
        this._inputList = this._form.querySelectorAll('.form__input');
        this._resetError = resetError;
        this._getValues = getValuesCallback;
    }

    //собирает данные со всех полей формы
    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    //записывает имеющиеся данные со страницы в поля формы при открытии попапа
    _setInputValues() {
        this._values = Object.values(this._getValues);
        this._inputList.forEach((input, index) => {
            //this._values[index] = input.value;
            input.value = this._values[index]
        });
        console.log(this._values);
    }
   
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._onSubmit(this._getInputValues());
            
            this.close();
        });
    }
    
    open() {
        this._setInputValues();        
        this._resetError();   
        super.open();
        
             
    }

    close() {
        super.close();
        this._form.reset();
    }
}

export {PopupWithForm};