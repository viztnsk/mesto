import Popup from './Popup.js'
export default class PopupWithImage extends Popup {
  constructor(selector, confirmedDelete) {
    super(selector);
    this._confirmButton = this._popup.querySelector('.submit-button');
    this.confirmedDelete = confirmedDelete;
  }
  setEventListeners() {
    super.setEventListeners();
    if(this._confirmButton) {
      this._confirmButton.addEventListener("click", () => {
        this.confirmedDelete(this.card)
      })
    }
}
  chooseCard (card) {
    this.card = card;
  }
}