const popup = document.querySelector('.popup'); 
const popupPlace = document.querySelector('.popup_place'); 
const popupCard = document.querySelector('.popup__card');
const popupImage = document.querySelector('.popup__image');
const popupText = document.querySelector('.popup__text');
const editButton = document.querySelector('.edit-button'); 
const imageButton = document.querySelector('.image-button');
const submitButton = document.querySelector('.submit-button'); 
const closeButton = document.querySelector('.close-button'); 
const closeButtonPlace = document.querySelector('.close-button_place');
const closeButtonImage = document.querySelector('.close-button_image');
const title = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');
const addButton = document.querySelector('.add-button'); 
const elements = document.querySelector('.elements');
const formElement = document.querySelector('.form');
const addFormElement = document.querySelector('.form_add');
const nameInput = formElement.querySelector('.form__input_type_name');
const jobInput = formElement.querySelector('.form__input_type_about');
const cardName = addFormElement.querySelector('.form__input_type_card-name');
const cardLink = addFormElement.querySelector('.form__input_type_card-link');

const initialCards = [
  {
    name: 'Константиново',
    link: './images/konstantinovo.jpg'
  },
  {
    name: 'Тула',
    link: './images/tula.jpg'
  },
  {
    name: 'Суздаль',
    link: './images/suzdal.jpg'
  },
  {
    name: 'Сочи',
    link: './images/sochi.jpg'
  },
  {
    name: ' Санкт-Петербург',
    link: './images/petersburg.jpg'
  },
  {
    name: 'Москва',
    link: './images/moscow.jpg'
  }
];
function open(element) { 
  element.classList.add('popup_opened');
  nameInput.value = title.textContent;
  jobInput.value = job.textContent;
} 
function close(element) { 
  element.classList.remove('popup_opened'); 
};
function deleteCard(e) {
  const cardElement = e.target.closest('.element');
  cardElement.remove();
};
function likeCard(e) {
    e.target.classList.toggle('like-button_active');
  };
function openImage(e) {
  const cardImage = e.target.closest('.element__image');
  imageSource = cardImage.getAttribute('src');
  imageAlt = cardImage.getAttribute('alt');
  popupImage.setAttribute('src', imageSource);
  popupImage.setAttribute('alt', imageAlt);
  popupText.textContent = imageAlt;
  open(popupCard);
};
function addCard(card) {
  const templateCard = document.querySelector('.template');
  const newCard = templateCard.content.cloneNode(true);
  newCard.querySelector('.element__image').setAttribute('src', card.link);
  newCard.querySelector('.element__image').setAttribute('alt', card.name);
  newCard.querySelector('.element__title').textContent = card.name;
  newCard.querySelector('.delete-button').addEventListener('click', deleteCard);
  newCard.querySelector('.like-button').addEventListener('click', likeCard);
  newCard.querySelector('.image-button').addEventListener('click', openImage);
  elements.prepend(newCard);
};
function formSubmitHandler (evt) {
    evt.preventDefault();
    title.textContent = nameInput.value;
    job.textContent = jobInput.value;
    close(popup);
};
function formAddHandler (evt) {
  evt.preventDefault();
  const card = {
    name: cardName.value,
    link: cardLink.value
  };
  cardName.value = '';
  cardLink.value = '';
  addCard(card);
  close(popupPlace);
};

initialCards.forEach(addCard);
formElement.addEventListener('submit', formSubmitHandler);
addFormElement.addEventListener('submit', formAddHandler);
editButton.addEventListener('click', function () {
  open(popup)
});
addButton.addEventListener('click', function () {
  open(popupPlace)
});
closeButton.addEventListener('click', function (){
  close(popup);
});
closeButtonPlace.addEventListener('click', function (){
  close(popupPlace);
});
closeButtonImage.addEventListener('click', function (){
  close(popupCard);
});