class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._form = document.forms[formElement];
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputElement));  //создаём в переменной массив из всех инпутов в форме
    this._buttonElement = this._form.querySelector(this._config.buttonElement);
  }

  enableValidation() {
    this._form.addEventListener('submit', this._handleFormSubmit);
    this._setEventListeners();
  }

  _handleFormSubmit = (evt) => {
    evt.preventDefault();
  }

  //функция добавления слушателей на все инпуты формы, переданной в качестве аргумента
  _setEventListeners() {
    this.toggleButtonState();  //кнопка перестанет быть активной при первой загрузке страницы до валидации
    //проходим по массиву инпутов и вешаем слушатель на ввод
    this._inputList.forEach((input) => {
        input.addEventListener('input', (event) => {
            const inputElement = event.target;
            this._checkInputValidity(inputElement);
            this.toggleButtonState();  //Такой вызов проверит состояние кнопки при каждом изменении символа в любом из полей
        });
    });
  }

  //функция, ответственная за блокировку кнопки отправить
  toggleButtonState() {
    if (!this._form.checkValidity()) {
        this._buttonElement.setAttribute("disabled", true); //кнопка не активна до валидности формы
        this._buttonElement.classList.add(this._config.inactiveButtonClass); 
    } else {
        this._buttonElement.classList.remove(this._config.inactiveButtonClass); 
        this._buttonElement.removeAttribute("disabled");
    }
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
        this._showInputError(inputElement.validationMessage, inputElement); //если инпут не проходит валидацию, берём функцию показа ошибки и невалидный инпут
    } else {
        this._hideInputError(inputElement); //если инпут прохоидт валидацию, скрываем ошибку под ним
    }
  }

  resetError() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);                 
    });
    this.toggleButtonState();
  }

  _showInputError(errorMessage, inputElement) {
    inputElement.classList.add(this._config.inputErrorClass); //добавить красноё подчёркивание
    const errorElement = this._form.querySelector(`.${inputElement.name}-error`); //берём span по имени инпута
    errorElement.textContent = errorMessage; //записать в span текст ошибки
    errorElement.classList.add(this._config.errorSpanClass); //добавить активный класс span для его появления
  }

  _hideInputError(inputElement) { //inputElement появится при установке слушателя в setEventListeners
    inputElement.classList.remove(this._config.inputErrorClass); //убрать красноё подчёркивание
    const errorElement = this._form.querySelector(`.${inputElement.name}-error`); //берём span по имени инпута
    errorElement.textContent = ''; //обнулить содержимое span
    errorElement.classList.remove(this._config.errorSpanClass); //скрыть span
  }
}

export {FormValidator};