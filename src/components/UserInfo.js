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
  }
  setAvatar(avatar) {
    this._avatarSelector.src = avatar;
  }
  setId(id) {
    this._id = id;
  }
  getId() {
    return this._id;
  }
}