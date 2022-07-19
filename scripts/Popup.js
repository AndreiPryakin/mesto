export default class Popup {
    constructor(popupSelector) {
        this._popup = ducument.querySelector(popupSelector);
        this._classOpened = 'popup_opened';
        this._classClose = 'popup__close';
    }

    open() {
        this._popup.classList.add(this._classOpened);
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove(this._classOpened);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {  //добавить и импортировать const ESC_CODE = 'Escape';
            //const openedPopup = document.querySelector('.popup_opened');
            close(this._popup); 
        }
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {  //слушатель для попапа с кликом мыши над элементом и функция для этого действия
            if (evt.target.classList.contains(this._classOpened)) {  //если элемент, над которым кликнули мышью, содержит класс 'popup_opened'
                close(); //выполнить функцию закрытия попапа
            }
            if (evt.target.classList.contains(this._classClose)) { //нужно использовать событие 'mousedown', а не click, чтобы не закрыть случайно попап по оверлею, 
              close();                                  //если нажать мышкой внутри попапа, а потом, не разжимая, передвинуть курсор на оверлей. Такой баг появляется с событием click
            } 
        })
    }
}