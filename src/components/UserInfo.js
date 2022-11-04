export default class UserInfo {
  constructor(nameSelector, infoSelector, avatarSelector) {
    this._nameSelector = document.querySelector(nameSelector);
    this._infoSelector = document.querySelector(infoSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      about: this._infoSelector.textContent,
    }
  }
  getAvatarInfo() {
    return avatar = this._avatarSelector.src;
  }
  setUserInfo(data) {
    this._nameSelector.textContent = data.name;
    this._infoSelector.textContent = data.about;
    this.setAvatar(data);
    this.id = data._id;
  }
  setAvatar(avatar) {
    this._avatarSelector.src = avatar;
  }
}