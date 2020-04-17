const MEDIA_QUERY_NAME = 'prefers-color-scheme';

export class ThemeCatcher {
  constructor() {}

  get isLightTheme() {
    return this.checkMediaMatch('light');
  }

  get isDarkTheme() {
    return this.checkMediaMatch('dark');
  }

  checkMediaMatch(name) {
    return window.matchMedia(`(${MEDIA_QUERY_NAME}: ${name})`).matches;
  }
}
