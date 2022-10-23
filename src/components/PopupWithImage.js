import Popup from './Popup.js'
export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = document.querySelector('.popup__image');
    this._caption = document.querySelector('.popup__text');
  }
  open(name, link) {
    super.open();
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
  }
  close() {
    super.close();
    this._image.src = '';
    this._image.alt = '';
    this._caption.textContent = '';
  }
}