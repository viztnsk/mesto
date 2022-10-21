import Popup from './Popup.js'
export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
    this._form = this._popup.querySelector('.form');
    this._handleSubmit = handleSubmit;
    this._inputList = Array.from(this._form.querySelectorAll('.form__input'));
  }

  _getInputValues() {
    const data = {};
    this._inputList.forEach((input) => {
      data[input.name] = input.value;
    });

    return data;
  }

  setInputValues(values) {
    this._inputList.forEach((input) => {
      if (values[input.name]) {
        input.value = values[input.name];
      }
    });
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
      console.log(this._getInputValues());
      this.close();
    });
  }
  getFormElement() {
    return this._form;
  }
  close() {
    super.close()
    this._form.reset();
  }

}