const body = document.querySelector('.page');
const profilePopup = document.querySelector('.popup-profile');
const profileOpenBtn = document.querySelector('.profile__button-edit');

const profile = document.querySelector('.profile');
const profileInfo = profile.querySelector('.profile__info');
const profileTitle = profile.querySelector('.profile__title'); /*Имя в профиле*/
const profileSubtitle = profile.querySelector('.profile__subtitle'); /*Кто есть в профиле*/

const headingInputProfile = profilePopup.querySelector('.form__input_type_heading'); //имя в попап
const subheadingInputProfile = profilePopup.querySelector('.form__input_type_subheading'); //данные в попап
const profileForm = document.forms['profile-form'];
const popups = document.querySelectorAll('.popup'); //все попапы

//функция обнуления отступа для скролла после закрытия попапа

function unlockBody() {
  body.style.overflow = '';
  body.style.paddingRight = 0;
}

//общая функция закрытия попапа

function closePopup(currentPopup) {
  currentPopup.classList.remove('popup_opened')
  setTimeout(unlockBody, 500); //отложенный запуск 
}

//открытие попапа 

profileOpenBtn.addEventListener('click', function() {
  
  headingInputProfile.value = profileTitle.textContent;
  subheadingInputProfile.value = profileSubtitle.textContent;
  const formElement = profilePopup.querySelector('form');
  enableValidation(profileForm, config); //проверка валидации формы при открытии попапа
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
function getCard(item) {

  const cardElement = elementTemplate.querySelector('.element').cloneNode(true); //клонирует содержимое template для создания карточки (заготовку карточки)
  const nameCard = cardElement.querySelector('.element__figcaption'); //заголовок карточек 
  const cardImage = cardElement.querySelector('.element__caption'); //изображение в карточке

  nameCard.textContent = item.name; //передает значение поля 'name' из элемента массива
  cardImage.src = item.link;
  cardImage.alt = item.name; 
  
  //слушатель для кнопки лайка
  cardElement.querySelector('.element__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
  });
  //слушатель для корзины
  const trashButton = cardElement.querySelector('.element__trash'); //кнопка корзина
  trashButton.addEventListener('click', () => {
      trashButton.closest('.element').remove(); //closest выбирает родительский элемент, remove удаляет его 
    });
  //слушатель для попапа с картинкой
  cardImage.addEventListener('click', () => showImage(item));  //ленточная функция нужна для передачи параметров в функцию showImage

  return cardElement
}; 

//функция для добавления карточки в DOM
function createCard(el) {
  const element = getCard(el)
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
function openPopup(currentPopup) {
  lockBody();
  currentPopup.classList.add('popup_opened');
}

//popup для показа изображения
const popupImg = document.querySelector('.popup-img'); //сам попап
const bigImage = popupImg.querySelector('.popup-img__image'); //большое изображение 
const popupImgFigcaption = popupImg.querySelector('.popup-img__figcaption'); //подпись под большим изображением

//новая функция открытия попапа с большим изображением
function showImage(el) { //принимает ссылку и название изображения 
  openPopup(popupImg); 
  bigImage.src = el.link; //заменил evt.target
  bigImage.alt = el.name + '. Иллюстрация на весь экран'; 
  popupImgFigcaption.textContent = el.name;
};

const cardForm = document.forms['card-form']; //форма добавления карточки с названием и картинкой
const buttonPlus = document.querySelector('.profile__button-add'); //кнопка плюс для открытия попапа карточки
const popupItem = document.querySelector('.popup-item'); //попап для добавления новой карточки
const titleCard = cardForm.title; //название карточки при добавлении в форме
const linkCard = cardForm.link; //ссылка на картинку при добавлении в форме

//клик по кнопке плюс для открытия попапа
buttonPlus.addEventListener('click', function() {
  openPopup(popupItem);
  const formElement = popupItem.querySelector('form'); 
  enableValidation(cardForm, config);
});

//отправка формы для новой карточки
cardForm.addEventListener('submit', (event) => {
  const newEl = {};
  newEl.name = titleCard.value;
  newEl.link = linkCard.value;
  createCard(newEl); 
  event.preventDefault(); //обработчик чтобы страница не перезагружалась после отправки формы
  event.target.reset(); //Метод HTMLFormElement.reset() позволяет легко произвести очистку форму после отправки или вернуть до значений по умолчанию
  closePopup(popupItem);
});

//закрытие попапа по Esc
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
});
