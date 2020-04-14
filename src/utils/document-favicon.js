import { FAVICON_PATH } from '../consts/favicons';

export class DocumentFavicon {
  constructor() {}

  get tag() {
    return document.getElementById('document-favicon');
  }

  update(name) {
    this.tag.setAttribute('href', `${FAVICON_PATH}/${name}`)
  }
}
