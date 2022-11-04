export default class Card {
  constructor (data, cardSelector, handleCardClick, handleLikeClick, confirmDelete, userId)
    {
    this._cardSelector = cardSelector;
    this._card = document.querySelector(this._cardSelector)
    .content.querySelector('.element')
    .cloneNode(true);
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this.confirmDelete = confirmDelete;
    this.userId = userId;
    this.likeButton = this._card.querySelector('.like-button');
    this._likeCount = this._card.querySelector('.element__like-count');
    this.deleteButton = this._card.querySelector('.delete-button');
    this._cardImage = this._card.querySelector('.element__image');
  }
  handleLike () {
    this.likeButton.classList.toggle('like-button_active');
  }
  setLikeCount(likes) {
    this._likeCount.textContent = likes;
  }
  _handleClickCard () { 
    this._handleCardClick(this._name, this._link)
  }
  handleDelete () { 
    this._card.remove(); 
    this._card = null; 
  } 
  generateCard() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    if (this._owner !== this.userId) {
      this.deleteButton.classList.add('delete-button_inactive')
    }
    else {
      this.deleteButton.addEventListener('click', () => this.confirmDelete(this));
    }
    this._card.querySelector('.element__title').textContent = this._name;
    this._likeCount.textContent = this._likes.length;
    this.likeButton.addEventListener('click', () => this._handleLikeClick(this));
    this._cardImage.addEventListener('click', () => this._handleClickCard())
    return this._card;
  }
} 



