const popupElement = document.querySelector('.popup-img');
const popupImage = popupElement.querySelector('.popup-img__image');
const popupText = popupElement.querySelector('.popup-img__figcaption'); 

import {openPopup} from './index.js';
export {Card};

class Card {
    constructor({name, link}, template) {
        this._name = name;
        this._link = link;
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


