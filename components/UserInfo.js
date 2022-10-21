export default class UserInfo {
  constructor(nameSelector, infoSelector) {
    this._nameSelector = document.querySelector(nameSelector);
    this._infoSelector = document.querySelector(infoSelector);
  }
  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      info: this._infoSelector.textContent
    };
  }
  setUserInfo(name, info) {
    this._nameSelector.textContent = name;
    this._infoSelector.textContent = info;
  }
}