const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButton: '.submit-button',
  buttonDisabled: 'submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input_error_active'
}

function validateInput(form, input, config) {
  const error = form.querySelector(`#${input.id}-error`);
  if (!input.validity.valid) {
    input.classList.add(config.inputErrorClass);
    error.classList.add(config.errorClass);
    error.textContent = input.validationMessage;
  }
  else {
    input.classList.remove(config.inputErrorClass);
    error.classList.remove(config.errorClass);
    error.textContent = '';
  }
}
function setEventListeners(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButton);
  toggleButtonState(inputList, button, config);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      validateInput(form, input, config);
      toggleButtonState(inputList, button, config);
    })
  })
}

function removeDisabledButton (button, config) {
  button.classList.remove(config.buttonDisabled);
  button.removeAttribute("disabled", "");
}

function addDisabledButton (button, config) {
  button.classList.add(config.buttonDisabled);
  button.setAttribute("disabled", "");
}

function toggleButtonState (inputList, button, config) {
  const hasErrors = inputList.some(input => !input.validity.valid);
  if (hasErrors) {
    addDisabledButton(button, config);
  } else {
    removeDisabledButton(button, config);
  }
}

function enableValidation (config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
    evt.preventDefault();
  })
    setEventListeners(form, config);
})
}
enableValidation(validationConfig);