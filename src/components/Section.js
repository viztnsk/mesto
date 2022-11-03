export default class Section {
  constructor ({renderer}, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector); 
  }
  renderItems(cards) {
    cards.forEach(
      card => this.addItem(
        this._renderer(card)
      )
    );
  }
  addItem(element) {
    this._container.prepend(element);
  }
}