const popup = document.querySelector('.popup');
const openPopup = document.querySelector('.profile__button-edit');
const closePopup = popup.querySelector('.popup__close');

let profile = document.querySelector('.profile');
let profileInfo = profile.querySelector('.profile__info');
let profileTitle = profile.querySelector('.profile__title'); /*Имя в профиле*/
let profileSubtitle = profile.querySelector('.profile__subtitle'); /*Кто есть в профиле*/

let heading = popup.querySelector('.form__input_type_heading'); //имя в попап
let subheading = popup.querySelector('.form__input_type_subheading'); //данные в попап
let submitButton = popup.querySelector('.form__submit'); //кнопка Сохранить в попап
let popupForm = popup.querySelector('.form'); //форма отправки

//открытие попапа 
openPopup.addEventListener('click', function() {
  popup.classList.add('popup_opened');
  heading.value = profileTitle.textContent;
  subheading.value = profileSubtitle.textContent;
});

//функция закрытия попапа
function funcClosePopup() {
  popup.classList.remove('popup_opened');
}

//закрытие попапа
closePopup.addEventListener('click', funcClosePopup);

//закрытие попапа при клике за границей формы
popup.addEventListener('click', function(event) {
  if (event.target === event.currentTarget) {
    funcClosePopup();
  }
});

//функция для отправки формы 
function addInfo() {
  profileTitle.textContent = heading.value; //записать текст(код) в парный тег (<h1>) 
  profileSubtitle.textContent = subheading.value; //value - получить текст из input 'имя'
  event.preventDefault(); //обработчик чтобы страница не перезагружалась после отправки формы
  funcClosePopup(); //функция для закрытия попапа после успешной отправки формы
  heading.value = ''; //очистить поля после отправки
  subheading.value = '';
} 

popupForm.addEventListener('submit', addInfo); //отправка формы









