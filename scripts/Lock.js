class Lock {
    constructor() {
        this._body = document.querySelector('.page');
    }
    //блокировка прокрутки и добавление отступа, равного ширине правой полосы прокрутки 
    BodyLock() {
        const pageWidth = document.documentElement.scrollWidth;
        const paddingValue = window.innerWidth - pageWidth + 'px';
        this._body.style.overflow = 'hidden'; //запрещает скроллить страницу за попапом
        if (window.innerWidth > 1023) {
            this._body.style.paddingRight = paddingValue; //добавляет паддинг странице чтобы не было сдвига при открытии попапа с условием для ширины окна
        } else {
            this._body.style.paddingRight = 0;
        }
    }
    //разблокировка прокрутки и обнуление отступов полосы прокрутки после закрытия попапа
    BodyUnlock() {
        this._body.style.overflow = '';
        this._body.style.paddingRight = 0;
    }
}

export {Lock};