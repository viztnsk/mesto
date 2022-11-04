import Popup from './Popup.js'
export default class PopupWithImage extends Popup {
  constructor(selector, confirmedDelete) {
    super(selector);
    this._confirmButton = this._popup.querySelector('.submit-button');
    this.confirmedDelete = confirmedDelete;
    this._isLoading = false;
  }
  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", () => {
      if (!this._isLoading) {
        const initialText = this._confirmButton.textContent;
        this._isLoading = true;
        this._confirmButton.textContent = "Сохранение...";
        this.confirmedDelete(this.card)
          .then(() => this.close())
          .catch((err) => console.error(err.message))
          .finally(() => {
            this._confirmButton.textContent = initialText;
            this._isLoading = false;
          });
      }
    })
  }
  chooseCard (card) {
    this.card = card;
  }
}