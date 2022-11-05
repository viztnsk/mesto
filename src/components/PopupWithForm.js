import Popup from './Popup.js'
export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
    this._form = this._popup.querySelector('.form');
    this._handleSubmit = handleSubmit;
    this._inputList = this._form.querySelectorAll('.form__input');
    this._submitButton = this._popup.querySelector('.submit-button');
  }
  _getInputValues() {
    this._values = {};
    this._inputList.forEach((input) => {
      this._values[input.name] = input.value
    })
    return this._values;
  }
  _disableButton() {
    this._submitButton.classList.add('submit-button_disabled');
    this._submitButton.disabled = true;
  }
  setInputValues(values) {
    this._inputList.forEach((input) => {
        input.value = values[input.name];
      })
  }
  getFormElement() {
    return this._form;
  }
  close() {
    this._form.reset();
    super.close()
  }
  setButtonText(isLoading) {
    if (isLoading) {
      this._disableButton();
      this._initialText = this._submitButton.textContent;
      this._submitButton.textContent = 'Сохранение...';
    }
    else {
      this._submitButton.textContent = this._initialText;
    }
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleSubmit(this._getInputValues())
    })
  }
}