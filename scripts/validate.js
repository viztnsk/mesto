const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}; 
function isValid (formSelector, inputSelector) {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage);
  } else {
    hideInputError(formSelector, inputSelector);
  }
};

function showInputError (formSelector, inputSelector, errorMessage) {
  const inputErrorClass = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add('form__input_type_error');
  inputErrorClass.textContent = errorMessage;
  inputErrorClass.classList.add('form__input_error_active');
};

function hideInputError (formSelector, inputSelector) {
  const inputErrorClass = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove('form__input_type_error');
  inputErrorClass.classList.remove('form__input_error_active');
  inputErrorClass.textContent = '';
}; 

function setEventListeners (formSelector) {
  const inputList = Array.from(formSelector.querySelectorAll('.form__input'));
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', () => {
      isValid(formSelector, inputSelector)
    });
  });
}; 
function enableValidation () {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formSelector) => {
    formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formSelector);
  });
};

function resetValidation() {
  enableValidation(validationConfig);

};

function hasInvalidInput (inputList) {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  })
};

function toggleButtonState (inputList, submitButtonSelector) {
  if (hasInvalidInput(inputList)) {
    submitButtonSelector.classList.add('submit-button_disabled');
  } else {
    submitButtonSelector.classList.remove('submit-button_disabled');
  }
}; 

function setEventListeners (formSelector) {
  const inputList = Array.from(formSelector.querySelectorAll(`.form__input`));
  const submitButtonSelector = formSelector.querySelector('.submit-button');
  toggleButtonState(inputList, submitButtonSelector);
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', () => {
      isValid(formSelector, inputSelector);
      toggleButtonState(inputList, submitButtonSelector);
    });
  });
}; 