const body = document.querySelector('.page');
const popup = document.querySelector('.popup');
const openPopup = document.querySelector('.profile__button-edit');
//const closePopup = popup.querySelector('.popup__close');

const profile = document.querySelector('.profile');
const profileInfo = profile.querySelector('.profile__info');
const profileTitle = profile.querySelector('.profile__title'); /*Имя в профиле*/
const profileSubtitle = profile.querySelector('.profile__subtitle'); /*Кто есть в профиле*/

const heading = popup.querySelector('.form__input_type_heading'); //имя в попап
const subheading = popup.querySelector('.form__input_type_subheading'); //данные в попап
const submitButton = popup.querySelector('.form__submit'); //кнопка Сохранить в попап
const popupForm = document.forms[0];
//let popupForm = popup.querySelector('.form'); //форма отправки
const modals = document.querySelectorAll('.modal'); //все попапы

//функция обнуления отступа для скролла после закрытия попапа

function unlockBody() {
  body.style.overflow = '';
  body.style.paddingRight = 0;
}

//общая функция закрытия попапа

function closePopup(currentPopup) {
  currentPopup.style.opacity = '0';
  currentPopup.style.visibility = 'hidden';
  setTimeout(unlockBody, 500); //отложенный запуск 
}

//открытие попапа 

openPopup.addEventListener('click', function() {
  openPopupFunc(popup);
  heading.value = profileTitle.textContent;
  subheading.value = profileSubtitle.textContent;
}); 

//новая функция закрытия попапа с одним классом у всех попапов и у всех кнопок

const closePopupIcons = document.querySelectorAll('.modal__close'); //все кнопки закрытия

for (let index = 0; index < closePopupIcons.length; index++ ) {
  const el = closePopupIcons[index];
  el.addEventListener('click', () => {
    closePopup(el.closest('.modal'));
  });
}

//закрытие любого попапа при клике за границей формы

for (let index = 0; index < modals.length; index++) {
  const el = modals[index];
  el.addEventListener('click', function(event) {
    if (event.target === event.currentTarget) {
      closePopup(el);
    }
  });
}

//функция для отправки формы с информацией о человеке

function addInfo(e) {
  profileTitle.textContent = heading.value; //записать текст(код) в парный тег (<h1>) 
  profileSubtitle.textContent = subheading.value; //value - получить текст из input 'имя'
  e.preventDefault(); //обработчик чтобы страница не перезагружалась после отправки формы
  closePopup(popup); //функция для закрытия попапа после успешной отправки формы
  heading.value = ''; //очистить поля после отправки
  subheading.value = '';
} 

popupForm.addEventListener('submit', addInfo); //отправка формы с информацией о человеке

//массив карточек по умолчанию
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

const elementTemplate = document.querySelector('#elementTemplate').content; //код новой карточки в template

const elementItems = document.querySelector('.elements__items'); //список элементов-карточек 'ul'

//функция для создания карточки с данными из элемента массива
function createCard(el) {

  const element = elementTemplate.querySelector('.element').cloneNode(true); //клонирует содержимое template для создания карточки (заготовку карточки)
  const nameCard = element.querySelector('.element__figcaption'); //заголовок карточек 
  const imgCard = element.querySelector('.element__caption'); //изображение в карточке
  
  nameCard.textContent = el.name; //передает значение поля 'name' из элемента массива
  imgCard.src = el.link;
  
  //слушатель для кнопки лайка
  element.querySelector('.element__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
  });
  //слушатель для корзины
  const trashButton = element.querySelector('.element__trash'); //кнопка корзина
  trashButton.addEventListener('click', () => {
      trashButton.closest('.element').remove(); //closest выбирает родительский элемент, remove удаляет его 
    });
  //слушатель для попапа с картинкой
  imgCard.addEventListener('click', showImage);

  elementItems.prepend(element); //добавление карточки 'li' в список 'ul'
};

//цикл для отрисовки карточек по умолчанию
for (i = initialCards.length; i--;) {
  createCard(initialCards[i]);
};

const style = window.getComputedStyle(body, null); //ширина body вместе с padding и margin
const paddingValue = window.innerWidth - (parseFloat(style.marginRight) + parseFloat(style.width) + parseFloat(style.marginLeft)) + 'px';  //значение ширины скролла, parseFloat оставляет числовое значение

function lockBody() {
  body.style.overflow = 'hidden'; //запрещает скроллить страницу за попапом
  if (window.innerWidth > 1023) {
    body.style.paddingRight = paddingValue; //добавляет паддинг странице чтобы не было сдвига при открытии попапа с условием для ширины окна
  } else {
    body.style.paddingRight = 0;
  }
}

//функция для открытия попапа по клику
function openPopupFunc(element) {
  lockBody();
  element.style.opacity = '1';
  element.style.visibility = 'visible';
}

//console.log(window.innerWidth);
//console.log(parseFloat(style.marginRight) + parseFloat(style.width) + parseFloat(style.marginLeft));
//console.log(paddingValue); 

//popup для показа изображения
const popupImg = document.querySelector('.popup-img'); //сам попап
const bigImage = popupImg.querySelector('.popup-img__image'); //большое изображение 
const popupImgFigcaption = popupImg.querySelector('.popup-img__figcaption'); //подпись под большим изображением
//const popupImgClose = popupImg.querySelector('.popup-img__close'); //кнопка закрытия попапа

//функция открытия попапа с большим изображением
function showImage() {
  openPopupFunc(popupImg);
  bigImage.src = this.src;
  const parrent = this.closest('.element'); //родительский элемент выбранной картинки
  const figcaption = parrent.querySelector('.element__figcaption'); //название карточки выбранной картинки
  popupImgFigcaption.textContent = figcaption.textContent; //добавляет название карточки в подпись попап
};

const formCard = document.forms[1]; //форма добавления карточки с названием и картинкой
const buttonPlus = document.querySelector('.profile__button-add'); //кнопка плюс для открытия попапа карточки
const popupItem = document.querySelector('.popup-item'); //попап для добавления новой карточки
//const popupItemClose = document.querySelector('.popup-item__close'); //кнопка закрытия попапа карточки
const titleCard = formCard.title; //название карточки при добавлении в форме
const linkCard = formCard.link; //ссылка на картинку при добавлении в форме

//клик по кнопке плюс для открытия попапа
buttonPlus.addEventListener('click', function() {
  openPopupFunc(popupItem);
  titleCard.value = ''; //очистить поля перед открытием
  linkCard.value = '';
});

let newEl = {name: '', link: ''};
//отправка формы для новой карточки
formCard.addEventListener('submit', (event) => {
  newEl.name = titleCard.value;
  newEl.link = linkCard.value;
  createCard(newEl); 
  event.preventDefault(); //обработчик чтобы страница не перезагружалась после отправки формы
  closePopup(popupItem);
});

