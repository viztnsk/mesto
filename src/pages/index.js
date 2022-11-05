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

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-52',
  headers: {
    authorization: 'e8a4f0e7-1d5e-411a-bb18-94fb266d4955',
    'Content-Type': 'application/json'
  }
})

Promise.all([api.getUser(), api.getCards()])
  .then(([values, cards]) => {
    userInfo.setUserInfo(values);
    cardSection.renderItems(cards);
  })
  .catch(err => console.log(err))


const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.avatar__image');
 
const popupWithInfoForm = new PopupWithForm('.popup_type_info', (values) => {
popupWithInfoForm.setButtonText(true)
  api.patchUser(values)
    .then(res => {
      popupWithInfoForm.close()
      userInfo.setUserInfo(res)
    })
    .catch(err => console.log(err))
    .finally(() => popupWithInfoForm.setButtonText(false))
  })

const popupWithAvatar = new PopupWithForm('.popup_type_avatar', (values) => {
  popupWithAvatar.setButtonText(true)
  api.setAvatar({ avatar: values.link })
    .then((values) => {
      popupWithAvatar.close()
      userInfo.setAvatar(values)
    })
    .catch(err => console.log(err))
    .finally(() => popupWithAvatar.setButtonText(false))
});


function createCard(data) { 
  const card = new Card(data, '.template', popupWithImage.open.bind(popupWithImage), handleLikeClick, confirmDelete, userInfo.id); 
  return card.generateCard(); 
} 
const confirmDelete = function(card) {
  popupWithDeleteConfirm.chooseCard(card);
  popupWithDeleteConfirm.open();
}
const cardSection = new Section({
  renderer: (data) =>{ return createCard(data)}
  }, 
  '.elements' 
); 

function handleLikeClick (card) {
  if(card.likeButton.classList.contains('like-button_active')) {
    api.removeLike(card)
    .then(res => {card.setLikeCount(res.likes.length);
      card.handleLike()}
    )
    .catch(err => console.log(err))
  }
  else {
    api.setLike(card)
    .then(res => {card.setLikeCount(res.likes.length);
    card.handleLike()}
    )
    .catch(err => console.log(err))
  }
}

const popupWithCardForm = new PopupWithForm('.popup_type_place', (data) => {
  popupWithCardForm.setButtonText(true);
  api.addCard(data)
  .then((data) => {
    popupWithCardForm.close();
    cardSection.addItem(createCard(data))
  })
  .catch(err => console.log(err))
  .finally(popupWithCardForm.setButtonText(false))
})
const popupWithImage = new PopupWithImage('.popup_type_card');

const popupWithDeleteConfirm = new PopupWithConfirm('.popup_type_delete', confirmedDelete);

function confirmedDelete(card) {
  api.deleteCard(card)
  .then(() => {
    card.handleDelete()
    popupWithDeleteConfirm.close();
  })
  .catch(err => console.log(err))
}

function openInfoPopup() {
  popupWithInfoForm.setInputValues(userInfo.getUserInfo());
  popupWithInfoForm.open();
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
popupWithDeleteConfirm.setEventListeners();


