import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import Card from "../components/Card.js";
import { initialCards } from '../utils/cards.js';
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from '../components/UserInfo.js';
import { validationConfig, editButton, addButton } from '../utils/constants.js';
// переменные

const popupImage = document.querySelector('.popup__image');
const infoFormElement = document.querySelector('.form_type_info');
const cardFormElement = document.querySelector('.form_type_add');


const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

const createCard = function({ name, link }) {
  const card = new Card({ name, link }, '.template', popupWithImage.open.bind(popupWithImage));
  return card.generateCard();
}

const popupWithInfoForm = new PopupWithForm('.popup_type_info', ({name, info}) => {
  userInfo.setUserInfo(name, info);
});
const popupWithCardForm = new PopupWithForm('.popup_type_place', (values) => {
  cardSection.addItem(createCard(values));
});
const popupWithImage = new PopupWithImage('.popup_type_card');


const cardSection = new Section({
  items: initialCards,
  renderer: (item) => cardSection.addItem(createCard(item)),
  },
  '.elements'
);

function openInfoPopup() {
  popupWithInfoForm.open();
  const userData = userInfo.getUserInfo();
  const {name, info} = userData;
  popupWithInfoForm.setInputValues({name, info});
  
  infoFormValidator.resetValidation();
}

function openCardPopup() {
  popupWithCardForm.open();
  addFormValidator.resetValidation();
}

const infoFormValidator = new FormValidator(validationConfig, popupWithInfoForm.getFormElement());
const addFormValidator = new FormValidator(validationConfig, popupWithCardForm.getFormElement());

editButton.addEventListener('click', openInfoPopup);
addButton.addEventListener('click', openCardPopup);

infoFormValidator.enableValidation();
addFormValidator.enableValidation();

popupWithInfoForm.setEventListeners();
popupWithCardForm.setEventListeners();
popupWithImage.setEventListeners();

cardSection.renderItems();