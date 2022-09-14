// переменные
const editButton = document.querySelector('.edit-button');
const addButton = document.querySelector('.add-button');
const cardGrid = document.querySelector('.elements');
const popupInfo = document.querySelector('.popup_type_info'); 
const popupPlace = document.querySelector('.popup_type_place'); 
const popupCard = document.querySelector('.popup_type_card');
const popupImage = document.querySelector('.popup__image');
const popupText = document.querySelector('.popup__text');
const submitButtonAdd = document.querySelector('.submit-button_type_add');
const submitButtonSave = document.querySelector('.submit-button_type_save'); 
const closeButtonInfo = document.querySelector('.close-button_type_info'); 
const closeButtonPlace = document.querySelector('.close-button_type_place');
const closeButtonImage = document.querySelector('.close-button_type_image');
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const infoFormElement = document.querySelector('.form_type_info');
const addFormElement = document.querySelector('.form_type_add');
const nameInput = infoFormElement.querySelector('.form__input_type_name');
const jobInput = infoFormElement.querySelector('.form__input_type_about');
const cardName = addFormElement.querySelector('.form__input_type_card-name');
const cardLink = addFormElement.querySelector('.form__input_type_card-link');
const templateCard = document.querySelector('.template');
const popups = document.querySelectorAll('.popup')

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
    if (popupActive) {
      closePopup(popupActive);
    }
  }
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
  const imageSource = cardImage.getAttribute('src');
  const imageAlt = cardImage.getAttribute('alt');
  popupImage.setAttribute('src', imageSource);
  popupImage.setAttribute('alt', imageAlt);
  popupText.textContent = imageAlt;
  openPopup(popupCard);
};

function createCard(card) {
  const newCard = templateCard.content.cloneNode(true);
  const elementImage = newCard.querySelector('.element__image');
  const elementTitle = newCard.querySelector('.element__title');
  elementImage.setAttribute('src', card.link);
  elementImage.setAttribute('alt', card.name);
  elementTitle.textContent = card.name;
  newCard.querySelector('.delete-button').addEventListener('click', deleteCard);
  newCard.querySelector('.like-button').addEventListener('click', likeCard);
  newCard.querySelector('.image-button').addEventListener('click', openImage);
  return newCard;
};

initialCards.forEach((card) => {
  const newCard = createCard(card);
  cardGrid.prepend(newCard);
});

function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupInfo);
};

function handleCardAdd (evt) {
  evt.preventDefault();
  const card = {
    name: cardName.value,
    link: cardLink.value
  };
  addFormElement.reset();
  cardGrid.prepend(createCard(card));
  closePopup(popupPlace);
};

// вызовы функций
infoFormElement.addEventListener('submit', handleProfileFormSubmit);
addFormElement.addEventListener('submit', handleCardAdd);

editButton.addEventListener('click', function () {
  openPopup(popupInfo);
  nameInput.value = profileTitle.textContent; 
  jobInput.value = profileJob.textContent;
  removeDisabledButton(submitButtonSave, validationConfig);
});

addButton.addEventListener('click', function () {
  openPopup(popupPlace);
  removeDisabledButton(submitButtonAdd, validationConfig);
  addDisabledButton (submitButtonAdd, validationConfig)
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