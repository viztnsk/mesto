import './index.css';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { validationConfig, editButton, addButton, avatarButton } from '../utils/constants.js';

/* import Konstantinovo from '../images/konstantinovo.jpg';
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
]; */

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-52',
  headers: {
    authorization: 'e8a4f0e7-1d5e-411a-bb18-94fb266d4955',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');

api.getUser()
.then((data) => {
  const info = data;
  userInfo.setUserInfo(info);
  userInfo.setAvatar(info.avatar);
  userInfo.setId(info._id);
})
const popupWithInfoForm = new PopupWithForm('.popup_type_info', (values) =>
  api.patchUser(values)
    .then((values) => userInfo.setUserInfo(values.name, values.about))
);

const popupWithImage = new PopupWithImage('.popup_type_card');
const popupWithCardForm = new PopupWithForm('.popup_type_place', (values) => {
  api.addCard(values)
  .then((data) => {
    cardSection.addItem(data)
  })
})
const createCard = function({ name, link }) {
  const card = new Card({ name, link }, '.template', popupWithImage.open.bind(popupWithImage));
  return card.generateCard();
}

api.getCards()
.then((data) => {
  const cards = data;
  const cardSection = new Section({items: cards, renderer: (item) => cardSection.addItem(createCard(item))}, '.elements');
  cardSection.renderItems();
})

const popupWithAvatar = new PopupWithForm('.popup_type_avatar', (values) => {
  console.log(values); api.setAvatar({ avatar: values.link }).then(userInfo.setAvatar(values.link))
});

//const popupWithDelConfirm = new PopupWithConfirm('.popup_type_delete', ({id, callback}) => api.removeCard(id).then(() => {callback()}));


function openInfoPopup() {
  popupWithInfoForm.open();
  popupWithInfoForm.setInputValues(userInfo.getUserInfo());
  infoFormValidator.resetValidation();
}

function openCardPopup() {
  popupWithCardForm.open();
  addFormValidator.resetValidation();
}

function openAvatarPopup() {
  popupWithAvatar.open();
  avatarFormValidator.resetValidation();
}

const infoFormValidator = new FormValidator(validationConfig, popupWithInfoForm.getFormElement());
const addFormValidator = new FormValidator(validationConfig, popupWithCardForm.getFormElement());
const avatarFormValidator = new FormValidator(validationConfig, popupWithAvatar.getFormElement());

editButton.addEventListener('click', openInfoPopup);
addButton.addEventListener('click', openCardPopup);
avatarButton.addEventListener('click', openAvatarPopup);


infoFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();


popupWithInfoForm.setEventListeners();
popupWithCardForm.setEventListeners();
popupWithAvatar.setEventListeners();
popupWithImage.setEventListeners();

//cardSection.renderItems();

