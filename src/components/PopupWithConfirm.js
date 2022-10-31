import Popup from './Popup.js'
export default class PopupWithImage extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
    this._deleteButton = this._popup.querySelector('.submit-button');
    this._handleSubmit = handleSubmit;
  }
}