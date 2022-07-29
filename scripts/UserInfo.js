export default class UserInfo {
    constructor(configUserInfo) {
        this._configUserInfo = configUserInfo;
        this._userNameElement = document.querySelector(this._configUserInfo.userNameSelector);
        this._userInfoElement = document.querySelector(this._configUserInfo.userInfoSelector);
    }

    //собирает данные со страницы, чтобы заполнить поля формы при её открытии
    getUserInfo() {
        this._userInfoValues = {  };
        this._userInfoValues.title = this._userNameElement.textContent;
        this._userInfoValues.subtitle = this._userInfoElement.textContent;

        return this._userInfoValues;
    }

    //получает новые данные из формы и добавляет их на страницу
    setUserInfo(data) {
        this._userNameElement.textContent = data.name;
        this._userInfoElement.textContent = data.description;
    }
}