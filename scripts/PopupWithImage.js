const popupElement = document.querySelector('.popup-img');
const popupImage = popupElement.querySelector('.popup-img__image');
const popupText = popupElement.querySelector('.popup-img__figcaption'); 

export default class PopupWithImage extends Popup {
    constructor(popupSelector, image) {
        super(popupSelector);
        this._image = image;
    }

    open() {
        
    }
}