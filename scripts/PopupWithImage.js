const popupElement = document.querySelector('.popup-img');
const popupImage = popupElement.querySelector('.popup-img__image');
const popupText = popupElement.querySelector('.popup-img__figcaption'); 

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(imageName, imageSrc) {
        super.open();
        popupImage.src = imageSrc;
        popupImage.alt = imageName  + '. Иллюстрация на весь экран';
        popupText.textContent = imageName;
    }
}