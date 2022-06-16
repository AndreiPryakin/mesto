 //будет показывать span под инпутом 
 function showInputError(formElement, config, errorMessage, inputElement) {  //inputElement появится при установке слушателя в setEventListeners
  inputElement.classList.add(config.inputErrorClass); //добавить красноё подчёркивание
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`); //берём span по имени инпута
  errorElement.textContent = errorMessage; //записать в span текст ошибки
  errorElement.classList.add(config.errorSpanClass); //добавить активный класс span для его появления
}

//будет скрывать span под инпутом
function hideInputError(formElement, config, inputElement) { //inputElement появится при установке слушателя в setEventListeners
  inputElement.classList.remove(config.inputErrorClass); //убрать красноё подчёркивание
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`); //берём span по имени инпута
  errorElement.textContent = ''; //обнулить содержимое span
  errorElement.classList.remove(config.errorSpanClass); //скрыть span
}

//проверка валидности инпутов  //передаём аргументами форму и инпут в этой форме
function checkInputValidity(formElement, config, inputElement) {
  if (!inputElement.validity.valid) { 
    showInputError(formElement, config, inputElement.validationMessage, inputElement); //если инпут не проходит валидацию, берём функцию показа ошибки и невалидный инпут
  } else {
    hideInputError(formElement, config, inputElement); //если инпут прохоидт валидацию, скрываем ошибку под ним
  }
}

//функция добавления слушателей на все инпуты формы, переданной в качестве аргумента
function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputElement));    //создаём в переменной массив из всех инпутов в форме
  toggleButtonState(formElement, config); //кнопка перестанет быть активной при первой загрузке страницы до валидации

  //проходим по массиву инпутов и вешаем слушатель на ввод
  inputList.forEach((input) => {
    input.addEventListener('input', (event) => {
      const inputElement = event.target;
      checkInputValidity(formElement, config, inputElement);
      toggleButtonState(formElement, config);  //Такой вызов проверит состояние кнопки при каждом изменении символа в любом из полей
    });
  });
}


//функция, ответственная за блокировку кнопки отправить
function toggleButtonState(formElement, config) {
  const buttonElement = formElement.querySelector(config.buttonElement);
  if (!formElement.checkValidity()) {
    buttonElement.setAttribute("disabled", true); //кнопка не активна до валидности формы
    buttonElement.classList.add(config.inactiveButtonClass); 
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass); 
    buttonElement.removeAttribute("disabled");
  }
}

const config = {
  inputElement: '.form__input',
  inputErrorClass: 'form__input_type_error',
  buttonElement: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  errorSpanClass: 'form__input-error_active'
}


function enableValidation(formElement, config) {
  formElement.addEventListener('submit', function(evt) {
    evt.preventDefault(); //отменяем перезагрузку страницы при сабмите
  }); 
    setEventListeners(formElement, config); //проходим по массиву и вешаем слушатели на все инпуты каждой форме
}
