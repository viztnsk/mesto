export default class FormValidator {
  constructor(config, element) {
    this._inputSelector = config.inputSelector;
    this._submitButton = config.submitButton;
    this._buttonDisabled = config.buttonDisabled;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass
    this._formElement = element;
    this._buttonElement = this._formElement.querySelector(this._submitButton);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }
  _showInputError(input) {
    const error = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    error.classList.add(this._errorClass);
    error.textContent = input.validationMessage;
  }
  _hideInputError(input) {
    const error = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    error.classList.remove(this._errorClass);
    error.textContent = '';
  }
  _validateInput(input) {
  if (!input.validity.valid) {
    this._showInputError(input);
  }
  else {
    this._hideInputError(input);
  }
  }
  _addDisabledButton () {
    this._buttonElement.classList.add(this._buttonDisabled);
    this._buttonElement.setAttribute("disabled", "");
  }
  _removeDisabledButton () {
    this._buttonElement.classList.remove(this._buttonDisabled);
    this._buttonElement.removeAttribute("disabled", "");
  }
  _toggleButtonState () {
    const hasErrors = this._inputList.some(input => !input.validity.valid);
    if (hasErrors) {
      this._addDisabledButton();
    } else {
      this._removeDisabledButton();
    }
  }
  resetValidation (){
    this._toggleButtonState();
    this._inputList.forEach((inputElement)=>{
      this._hideInputError(inputElement);
    });
  }
  enableValidation () {
    this._toggleButtonState;
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._validateInput(inputElement);
        this._toggleButtonState();
      })
    })
  }
}