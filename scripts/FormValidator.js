class FormValidator {
  constructor(config, formElement) {
      this._config = config;
      this._form = formElement;
  }

  enableValidation() {
      const form = document.forms[this._form]; //переданная в конструктор форма
      form.addEventListener('submit', this._handleFormSubmit);
      this._setEventListeners(form);
  }

  _handleFormSubmit = (evt) => {
      evt.preventDefault();
  }

  //функция добавления слушателей на все инпуты формы, переданной в качестве аргумента
  _setEventListeners(form) {
      const inputList = Array.from(form.querySelectorAll(this._config.inputElement));  //создаём в переменной массив из всех инпутов в форме
      this.toggleButtonState(form);  //кнопка перестанет быть активной при первой загрузке страницы до валидации
      //проходим по массиву инпутов и вешаем слушатель на ввод
      inputList.forEach((input) => {
          input.addEventListener('input', (event) => {
              const inputElement = event.target;
              this._checkInputValidity(form, inputElement);
              this.toggleButtonState(form);  //Такой вызов проверит состояние кнопки при каждом изменении символа в любом из полей
          });
      });
  }

  //функция, ответственная за блокировку кнопки отправить
  toggleButtonState(form) {
      const buttonElement = form.querySelector(this._config.buttonElement);
      if (!form.checkValidity()) {
          buttonElement.setAttribute("disabled", true); //кнопка не активна до валидности формы
          buttonElement.classList.add(this._config.inactiveButtonClass); 
      } else {
          buttonElement.classList.remove(this._config.inactiveButtonClass); 
          buttonElement.removeAttribute("disabled");
      }
  }

  _checkInputValidity(form, inputElement) {
      if (!inputElement.validity.valid) {
          this._showInputError(form, inputElement.validationMessage, inputElement); //если инпут не проходит валидацию, берём функцию показа ошибки и невалидный инпут
      } else {
          this._hideInputError(form, inputElement); //если инпут прохоидт валидацию, скрываем ошибку под ним
      }
  }

  _showInputError(form, errorMessage, inputElement) {
      inputElement.classList.add(this._config.inputErrorClass); //добавить красноё подчёркивание
      const errorElement = form.querySelector(`.${inputElement.name}-error`); //берём span по имени инпута
      errorElement.textContent = errorMessage; //записать в span текст ошибки
      errorElement.classList.add(this._config.errorSpanClass); //добавить активный класс span для его появления
  }

  _hideInputError(form, inputElement) { //inputElement появится при установке слушателя в setEventListeners
      inputElement.classList.remove(this._config.inputErrorClass); //убрать красноё подчёркивание
      const errorElement = form.querySelector(`.${inputElement.name}-error`); //берём span по имени инпута
      errorElement.textContent = ''; //обнулить содержимое span
      errorElement.classList.remove(this._config.errorSpanClass); //скрыть span
  }
}

export {FormValidator};