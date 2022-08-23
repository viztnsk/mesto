let popup = document.querySelector('.popup'); 
let popupPlace = document.querySelector('.popup_place'); 
let editButton = document.querySelector('.edit-button'); 
let submitButton = document.querySelector('.submit-button'); 
let closeButton = document.querySelector('.close-button'); 
let closeButtonPlace = document.querySelector('.close-button_place'); 
const likes = document.querySelectorAll('.like-button')
let title = document.querySelector('.profile__title');
let job = document.querySelector('.profile__subtitle');
let addButton = document.querySelector('.add-button'); 
const elements = document.querySelector('.elements');
// Находим форму в DOM
let formElement = document.querySelector('.form'); // Воспользуйтесь методом querySelector()
let addFormElement = document.querySelector('.form_add');
// Находим поля формы в DOM
let nameInput = document.querySelector('.form__input_type_name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.form__input_type_about'); // Воспользуйтесь инструментом .querySelector()

let cardName = popup.querySelector('.form__input_type_card-name');
let cardLink = popup.querySelector('.form__input_type_card-link');

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


initialCards.forEach(card => {
  const html = 
  `<article class="element">
    <img class="element__image" src="${card.link}" alt="${card.name}">
    <button class="delete-button" type="button"></button>
    <div class="element__info">
      <h2 class="element__title">${card.name}</h2>
      <button class="like-button" type="button"></button>
    </div>
  </article>`;
  elements.insertAdjacentHTML('afterbegin', html);
}); 

function open(element) { 
  element.classList.add('popup_opened');
  nameInput.value = title.textContent;
  jobInput.value = job.textContent;
} 
function close(element) { 
  element.classList.remove('popup_opened'); 
} 

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    title.textContent = nameInput.value;
    job.textContent = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    close();
}
function formAddHandler (evt) {
  evt.preventDefault();
  card.name = form__input_type_card-name.value;
  card.link = form__input_type_card-link.value;
  initialCards.unshift(card);
  close();
}


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
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
