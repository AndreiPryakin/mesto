export default class Section {
    constructor({ data, renderer }, containerSelector) {
        this._renderedItems = data;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    rendererItems() {
        if (this._renderedItems.lenght > 1) {
            this._renderedItems.forEach(item => {
                this._renderer(item);
            });
        } else {
            this._renderer(this._renderedItems);
        }
        
              
    }

    addItem(element) {
        this._container.prepend(element);
    }
}