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
    const json = await res.json()
    if (res.ok) {
      return json
    }
    else {
      Promise.reject(`Ошибка: ${res.status}`)
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
    setAvatar(data) {
      return this._fetch('/users/me/avatar', 'PATCH', data)
    }
    addCard(data) {
      return this._fetch('/cards', "POST", data)
    }
    deleteCard() {
      return this._fetch('/cards' + id, "DELETE")
    }
    setLike() {
      return this._fetch('/cards' + id + '/likes', "PUT")
    }
    removeLike() {
      return this._fetch('/cards' + id + '/likes', "DELETE")
    }
  }
