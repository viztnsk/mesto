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
  addItems(element, toEnd = false) {
    if (toEnd) this._container.append(this.renderItem(element));
    else this._container.prepend(this.renderItem(element));
  }
}