export default class Card {
  constructor ({ name, link }, cardSelector, getUserInfo, handleCardClick) {
    this._link = link;
    this._name = name;
    this._getUserInfo = getUserInfo;
    this._cardSelector = cardSelector;

    this._handleCardClick = handleCardClick;
  }
  _getTemplate () {
    return document
    .querySelector(this._cardSelector)
    .content.querySelector('.element')
    .cloneNode(true);
  }
  _handleLike () {
    this._likeButton.classList.toggle('like-button_active');
  }
  _handleDelete () {
    this._element.remove();
    this._element = null;
  }
  _handleClickCardImage () {
    this._handleCardClick({
      name: this._name,
      link: this.link
    }) 
  }
  _setEventListeners () {
    this._likeButton.addEventListener('click', () => {
      this._handleLike();
    });
    this._element.querySelector('.delete-button').addEventListener('click', () => {
      this._handleDelete();
    })
    this._cardImage.addEventListener('click', () => {
      this._handleClickCardImage();
    })
  }
  generateCard() {
    this._element = this._getTemplate();

    this._likeButton = this._element.querySelector('.like-button');
    this._cardImage = this._element.querySelector('.element__image');
    this._cardName = this._element.querySelector('.element__title');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardName.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}