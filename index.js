let popup = document.querySelector('.popup')
let editButton = document.querySelector('.editButton');
let submitButton = document.querySelector('.submitButton');
let closeButton = document.querySelector('.closeButton');
function open() {
  popup.classList.add('popup_opened');
}
editButton.addEventListener('click', open);
function close() {
  popup.classList.remove('popup_opened');
}
closeButton.addEventListener('click', close);

let nameInput = document.querySelector('.popup__info')
let jobInput = document.querySelector('.popup__about')

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    let newJob = jobInput.getAttribute('value');
    let newName = nameInput.getAttribute('value');
    let name = document.querySelector('.profile__title')
    let job = document.querySelector('.profile__subtitle')
    name.textContent = newName;
    job.textContent = newJob;
}

submitButton.addEventListener('submit', formSubmitHandler); 

let likeButton = document.querySelector('.likeButton')
 function like() {
  likeButton.classList.toggle('likeButton_active');
}
likeButton.addEventListener('click', like);