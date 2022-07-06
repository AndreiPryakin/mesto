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

const popupElement = document.querySelector('.popup-img');
const popupImage = popupElement.querySelector('.popup-img__image');
const popupText = popupElement.querySelector('.popup-img__figcaption'); 

import {openPopup} from './index.js';
export {Card};

class Card {
    constructor(data, template) {
        this._name = data.name;
        this._link = data.link;
        this._template = template;
    }

    //возвращает карточку из template-шаблона
    _getTemplate() {
        const cardElement = document
        .querySelector(this._template)
        .content
        .querySelector('.element')
        .cloneNode(true);
        
        return cardElement;
    } 

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.element__figcaption').textContent = this._name;
        this._element.querySelector('.element__caption').src = this._link;
        this._element.querySelector('.element__caption').alt = this._name;

        this._setEventListeners();
        
        return this._element;
    } 

    //функция добавления/удаления лайка
    _handleClickLike() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }

    //функция удаления карточки
    _handleClickTrash() {
        this._element.remove();
    }

    //функция открытия попапа
    _handleOpenPopup() {
        openPopup(popupElement);
        popupImage.src = this._link;
        popupImage.alt = this._name  + '. Иллюстрация на весь экран';
        popupText.textContent = this._name;
    }

    //слушатели
    _setEventListeners() {
        //слушатель на кнопку лайк
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._handleClickLike();
        });
        //слушатель на корзину
        this._element.querySelector('.element__trash').addEventListener('click', () => {
            this._handleClickTrash();
        });
        //слушатель для попапа с картинкой
        this._element.querySelector('.element__caption').addEventListener('click', () => {
            this._handleOpenPopup();
        });
    }

}

// добавление карточек
initialCards.forEach((item) => {
    // Создадим экземпляр карточки
    const card = new Card(item, '#elementTemplate');
    // Создаём карточку и возвращаем наружу
    const cardElement = card.generateCard();
  
    // Добавляем в DOM
    document.querySelector('.elements__items').append(cardElement);
  }); 
