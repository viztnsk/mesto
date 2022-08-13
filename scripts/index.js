let popup = document.querySelector('.popup'); 
let editButton = document.querySelector('.edit-button'); 
let submitButton = document.querySelector('.submit-button'); 
let closeButton = document.querySelector('.close-button'); 
let title = document.querySelector('.profile__title');
let job = document.querySelector('.profile__subtitle');

// Находим форму в DOM
let formElement = document.querySelector('.form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.form__input_type-name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.form__input_type-about'); // Воспользуйтесь инструментом .querySelector()

function open() { 
  popup.classList.add('popup_opened');
  nameInput.value = title.textContent;
  jobInput.value = job.textContent;
} 
function close() { 
  popup.classList.remove('popup_opened'); 
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
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', open);
closeButton.addEventListener('click', close);