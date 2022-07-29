import {Popup} from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popupSelector, onSubmit) {
        super(popupSelector);
        this._popupSelector = popupSelector;
        this._onSubmit = onSubmit;
        this._form = this._popup.querySelector('.form');
        this._inputList = this._form.querySelectorAll('.form__input');
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
    _setInputValues(userInfoValues) {
        this._userInfoValues = Object.values(userInfoValues); //оставляет массив со значением поля title и subtitle в профиле
        this._inputList.forEach((input, index) => {
            input.value = this._userInfoValues[index]; //forEach принимает инпут и его индекс, присваивает полям формы данные из профиля со страницы
        });
    }
   
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._onSubmit(this._getInputValues());
            
            this.close();
        });
    }
    
    close() {
        super.close();
        this._form.reset();
    }
}

export {PopupWithForm};