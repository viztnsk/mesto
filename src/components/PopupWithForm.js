import Popup from './Popup.js'
export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
    this._form = this._popup.querySelector('.form');
    this._handleSubmit = handleSubmit;
    this._inputList = this._form.querySelectorAll('.form__input');
    this._submitButton = this._popup.querySelector('.submit-button');
    this._isLoading = false;
  }
  _getInputValues() {
    const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value
    })
    return values;
  }
  setInputValues(values) {
    this._inputList.forEach((input) => {
      if (values[input.name]) {
        input.value = values[input.name];
      }
    });
  }
  getFormElement() {
    return this._form;
  }
  close() {
    super.close()
    this._form.reset();
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      if (!this._isLoading) {
        const initialText = this._submitButton.textContent;
        this._isLoading = true;
        this._submitButton.textContent = 'Сохранение...';
        this._handleSubmit(this._getInputValues())
        .then(() => {
          this.close()
        })
        .catch(err => console.log(err))
        .finally(() => {
          this._submitButton.textContent = initialText;
          this._isLoading = false;
        })
      }}
  )}
}