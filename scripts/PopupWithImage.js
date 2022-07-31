const popupElement = document.querySelector('.popup-img');
const popupImage = popupElement.querySelector('.popup-img__image');
const popupText = popupElement.querySelector('.popup-img__figcaption'); 

import {Popup} from './Popup.js';

export default class PopupWithImage extends Popup {

    constructor(popupSelector) {
        
        super(popupSelector);
        this._image = this._popup.querySelector('.popup-img__image');
        this._text = this._popup.querySelector('.popup-img__figcaption');
    }

    open(data) {
        super.open();
        this._image.src = data.link;
        this._image.alt = data.name  + '. Иллюстрация на весь экран';
        this._text.textContent = data.name;
    } 

}