import Card from "./Card.js";
import { initialCards } from './cards.js';
import FormValidator from "./FormValidator.js";

// переменные

const editButton = document.querySelector('.edit-button');
const addButton = document.querySelector('.add-button');
const cardGrid = document.querySelector('.elements');
const popupInfo = document.querySelector('.popup_type_info'); 
const popupPlace = document.querySelector('.popup_type_place'); 
const popupCard = document.querySelector('.popup_type_card');
const popupImage = document.querySelector('.popup__image');
const popupText = document.querySelector('.popup__text');
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const infoFormElement = document.querySelector('.form_type_info');
const cardFormElement = document.querySelector('.form_type_add');
const nameInput = infoFormElement.querySelector('.form__input_type_name');
const jobInput = infoFormElement.querySelector('.form__input_type_about');
const cardName = cardFormElement.querySelector('.form__input_type_card-name');
const cardLink = cardFormElement.querySelector('.form__input_type_card-link');
const popups = document.querySelectorAll('.popup')

const validationConfig = { 
  formSelector: '.form', 
  inputSelector: '.form__input', 
  submitButton: '.submit-button', 
  buttonDisabled: 'submit-button_disabled', 
  inputErrorClass: 'form__input_type_error', 
  errorClass: 'form__input_error_active'
} 

// функции

function openPopup(element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);
};

function closePopup(element) {
  element.classList.remove('popup_opened'); 
  document.removeEventListener('keydown', handleEscape);
};

function handleEscape(evt) {
  if (evt.key === 'Escape') {
    const popupActive = document.querySelector('.popup_opened');
      closePopup(popupActive);
  }
};

function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupInfo);
};

function handleOpenPopup (name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupText.textContent = name;
  openPopup(popupCard);
}
function handleClosePopup() {
  popupImage.src = '';
  closePopup(popupCard);
}
const placeCard = function (card){
  cardGrid.prepend(card);
}
const addCard = function(name, link) {
  const newCard = new Card({name, link}, '.template', handleOpenPopup, handleClosePopup);
  return newCard.generateCard();
}

function handleCardAdd (evt) {
  evt.preventDefault();
  const card = addCard(cardName.value, cardLink.value);
  cardFormElement.reset();
  placeCard(card);
  closePopup(popupPlace);
};

const infoFormValidator = new FormValidator(validationConfig, popupInfo);
const addFormValidator = new FormValidator(validationConfig, popupPlace);

infoFormValidator.enableValidation();
addFormValidator.enableValidation();

initialCards.forEach((item) => {
  const card = addCard(item.name,item.link);
  placeCard(card);
});

// слушатели 

infoFormElement.addEventListener('submit', handleProfileFormSubmit);

cardFormElement.addEventListener('submit', handleCardAdd);

editButton.addEventListener('click', function () {
  openPopup(popupInfo);
  nameInput.value = profileTitle.textContent; 
  jobInput.value = profileJob.textContent;
  infoFormElement.removeDisabledButton;
  infoFormElement.resetValidation();
});

addButton.addEventListener('click', function () {
  cardFormElement.reset();
  addFormValidator.resetValidation();
  openPopup(popupPlace);
});

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('close-button')) {
          closePopup(popup)
        }
    })
})