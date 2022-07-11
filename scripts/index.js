const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const body = document.querySelector('.page');
const profilePopup = document.querySelector('.popup-profile');
const profileOpenBtn = document.querySelector('.profile__button-edit');

const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title'); /*Имя в профиле*/
const profileSubtitle = profile.querySelector('.profile__subtitle'); /*Кто есть в профиле*/

const headingInputProfile = profilePopup.querySelector('.form__input_type_heading'); //имя в попап
const subheadingInputProfile = profilePopup.querySelector('.form__input_type_subheading'); //данные в попап
const profileForm = document.forms['profile-form'];
const popups = document.querySelectorAll('.popup'); //все попапы
const cardsContainer = document.querySelector('.elements__items');

//popup для показа изображения
const cardForm = document.forms['card-form']; //форма добавления карточки с названием и картинкой
const buttonPlus = document.querySelector('.profile__button-add'); //кнопка плюс для открытия попапа карточки
const popupItem = document.querySelector('.popup-item'); //попап для добавления новой карточки
const titleCard = cardForm.title; //название карточки при добавлении в форме
const linkCard = cardForm.link; //ссылка на картинку при добавлении в форме

const ESC_CODE = 'Escape';

export {openPopup};
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js'

const config = {
  inputElement: '.form__input',
  inputErrorClass: 'form__input_type_error',
  buttonElement: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  errorSpanClass: 'form__input-error_active'
}

const formProfile = new FormValidator(config, 'profile-form');
formProfile.enableValidation(); 
const formCard = new FormValidator(config, 'card-form');
formCard.enableValidation();

//функция обнуления отступа для скролла после закрытия попапа

function unlockBody() {
  body.style.overflow = '';
  body.style.paddingRight = 0;
}

//функция закрытия попапа по нажатию Esc
function closeByEsc(evt) {
  if (evt.key === ESC_CODE) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup); 
  }
}

//общая функция закрытия попапа

function closePopup(currentPopup) {
  currentPopup.classList.remove('popup_opened')
  setTimeout(unlockBody, 500); //отложенный запуск 
  document.removeEventListener('keydown', closeByEsc);
}

//открытие попапа 

profileOpenBtn.addEventListener('click', function() {
  headingInputProfile.value = profileTitle.textContent;
  subheadingInputProfile.value = profileSubtitle.textContent;
  formProfile.resetError(profileForm); //сброс ошибок инпута при открытии формы
  openPopup(profilePopup);
}); 

//новая функция закрытия попапа, объединяющая крестики и оверлей с универсальными классами 

popups.forEach((popup) => {  //метод forEach берет каждый попап и выполняет для него ленточную функцию
  popup.addEventListener('mousedown', (evt) => {  //слушатель для попапа с кликом мыши над элементом и функция для этого действия
      if (evt.target.classList.contains('popup_opened')) {  //если элемент, над которым кликнули мышью, содержит класс 'popup_opened'
          closePopup(popup) //выполнить функцию закрытия попапа
          
      }
      if (evt.target.classList.contains('popup__close')) { //нужно использовать событие 'mousedown', а не click, чтобы не закрыть случайно попап по оверлею, 
        closePopup(popup)                                  //если нажать мышкой внутри попапа, а потом, не разжимая, передвинуть курсор на оверлей. Такой баг появляется с событием click
      } 
  })
}) 

//функция для отправки формы с информацией о человеке

function addInfo(e) {
  profileTitle.textContent = headingInputProfile.value; //записать текст(код) в парный тег (<h1>) 
  profileSubtitle.textContent = subheadingInputProfile.value; //value - получить текст из input 'имя'
  e.preventDefault(); //обработчик чтобы страница не перезагружалась после отправки формы

  closePopup(profilePopup); //функция для закрытия попапа после успешной отправки формы
} 

profileForm.addEventListener('submit', addInfo); //отправка формы с информацией о человеке

function lockBody() {

  const pageWidth = document.documentElement.scrollWidth; //ширина веб-страницы без ширины полосы прокрутки
  const paddingValue = window.innerWidth - pageWidth + 'px'; //значение ширины скролла

  body.style.overflow = 'hidden'; //запрещает скроллить страницу за попапом
  if (window.innerWidth > 1023) {
    body.style.paddingRight = paddingValue; //добавляет паддинг странице чтобы не было сдвига при открытии попапа с условием для ширины окна
  } else {
    body.style.paddingRight = 0;
  }
}

//функция для открытия попапа по клику
function openPopup(currentPopup) {
  lockBody();
  currentPopup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);  
}

//клик по кнопке плюс для открытия попапа
buttonPlus.addEventListener('click', function() {
  openPopup(popupItem);
});

function returnNewCard(el, selector) {
  // Создадим экземпляр карточки
  const card = new Card(el, selector);
  // Создаём карточку и возвращаем её
  return card.generateCard();
}

//отправка формы для новой карточки
cardForm.addEventListener('submit', (event) => {
  const newEl = {};
  newEl.name = titleCard.value;
  newEl.link = linkCard.value;
  // Добавляем в DOM
  cardsContainer.prepend(returnNewCard(newEl, '#elementTemplate'));
  event.preventDefault(); //обработчик чтобы страница не перезагружалась после отправки формы
  event.target.reset(); //Метод HTMLFormElement.reset() позволяет легко произвести очистку форму после отправки или вернуть до значений по умолчанию
  formCard.toggleButtonState(cardForm); //деактивирует кнопку сабмита после отправки формы
  closePopup(popupItem); 
});

// добавление карточек
initialCards.forEach((item) => {
  cardsContainer.append(returnNewCard(item, '#elementTemplate'));
}); 