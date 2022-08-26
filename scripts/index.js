let popup = document.querySelector('.popup'); 
let popupPlace = document.querySelector('.popup_place'); 
let popupImage = document.querySelector('.popup__image');
let editButton = document.querySelector('.edit-button'); 
let imageButton = document.querySelector('.image-button');
let submitButton = document.querySelector('.submit-button'); 
let closeButton = document.querySelector('.close-button'); 
let closeButtonPlace = document.querySelector('.close-button_place'); 
let title = document.querySelector('.profile__title');
let job = document.querySelector('.profile__subtitle');
let addButton = document.querySelector('.add-button'); 
const elements = document.querySelector('.elements');
let formElement = document.querySelector('.form');
let addFormElement = document.querySelector('.form_add');
let nameInput = formElement.querySelector('.form__input_type_name');
let jobInput = formElement.querySelector('.form__input_type_about');
let cardName = addFormElement.querySelector('.form__input_type_card-name');
let cardLink = addFormElement.querySelector('.form__input_type_card-link');

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
  popupImage.classList.add('.popup_opened');
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
}

function formAddHandler (evt) {
  evt.preventDefault();
  let card = {
    name: cardName.value,
    link: cardLink.value
  };
  cardName.value = '';
  cardLink.value = '';
  addCard(card);
  close(popupPlace);
}

initialCards.forEach(addCard);

// <section class="popup popup__image">
// <button class="close-button close-button_image" type="button"></button>
// <img class="element__image popup__image" src="" alt="">
// </section>

// <template class="template">
//      <article class="element">
//        <button class="image-button" type="button"><img class="element__image" src="" alt=""></button>
//        <button class="delete-button" type="button"></button>
//        <div class="element__info">
//          <h2 class="element__title"></h2>
//          <button class="like-button" type="button"></button>
//        </div>
//      </article>
//    </template>



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
