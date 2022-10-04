export default class Card {
  constructor (obj, cardSelector, handleOpenPopup) {
    this._link = obj.link;
    this._name = obj.name;
    this._cardSelector = cardSelector;
    this._handleOpenPopup = handleOpenPopup;
  }
  _getTemplate () {
    const cardElement = 
    document.querySelector(this._cardSelector)
    .content.querySelector('.element')
    .cloneNode(true);
    return cardElement;
  }
  _setEventListeners () {
    this._likeButton = this._element.querySelector('.like-button')
    this._likeButton.addEventListener('click', () => {
      this._handleLike();
    });
    this._element.querySelector('.delete-button').addEventListener('click', () => {
      this._handleDelete();
    })
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleOpenPopup(this._name, this._link);
    })
  }
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._setEventListeners();

    return this._element;
  }
  _handleLike () {
    this._likeButton.classList.toggle('like-button_active');
  }
  _handleDelete () {
    this._element.remove();
    this._element = null;
  }
}