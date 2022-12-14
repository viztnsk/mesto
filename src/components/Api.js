export default class Api {
  constructor({url, ...headers}) {
    this._url = url;
    this._headers = headers;
  }

  async _fetch(path, method='GET', body) {
    const opt = { ...this._headers, method };
    if (body) {
      if (typeof body === 'string') {
        opt.body = body; 
      }
      else {
        opt.body = JSON.stringify(body);
      }
    }
    const res = await fetch(this._url + path, opt)
    if(res.ok) {
      return res.json()
    }
    else {
      return Promise.reject(`Ошибка: ${json.message}`)
    }
  }
    getCards() {
      return this._fetch('/cards', "GET");
    }
    getUser() {
      return this._fetch('/users/me', "GET");
    }
    patchUser(values) {
      return this._fetch('/users/me', 'PATCH', values)
    }
    setAvatar(avatar) {
      return this._fetch('/users/me/avatar', 'PATCH', avatar)
    }
    addCard({name, link}) {
      return this._fetch('/cards', "POST", {name, link})
    }
    deleteCard(card) {
      return this._fetch(`/cards/${card._id}`, "DELETE")
    }
    setLike(card) {
      return this._fetch(`/cards/${card._id}/likes`, "PUT")
    }
    removeLike(card) {
      return this._fetch(`/cards/${card._id}/likes`, "DELETE")
    }
  }
