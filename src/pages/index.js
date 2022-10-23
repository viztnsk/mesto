import './index.css';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from '../components/UserInfo.js';
import { validationConfig, editButton, addButton } from '../utils/constants.js';

import Konstantinovo from '../images/konstantinovo.jpg';
import Tula from '../images/tula.jpg';
import Suzdal from '../images/suzdal.jpg';
import Sochi from '../images/sochi.jpg';
import Petersburg from '../images/petersburg.jpg';
import Moscow from '../images/moscow.jpg';
const initialCards = [
  {
    name: 'Константиново',
    link: Konstantinovo
  },
  {
    name: 'Тула',
    link: Tula
  },
  {
    name: 'Суздаль',
    link: Suzdal
  },
  {
    name: 'Сочи',
    link: Sochi
  },
  {
    name: 'Санкт-Петербург',
    link: Petersburg
  },
  {
    name: 'Москва',
    link: Moscow
  }
];




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