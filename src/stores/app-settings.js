import { writable } from 'svelte/store';

import {
  lsHelper,
} from '../utils/ls-helper';
import  {
  ThemeCatcher,
} from '../utils/theme-catcher';

import {
  LANGUAGES,
} from '../consts/languages';

const lsSettings = lsHelper.getObject('app-settings');

function getDefaultLanguage() {
  const availableLanguages = LANGUAGES.map(lang => lang.value);
  const systemLanguage = navigator.language.split('-')[0];

  if (lsSettings && lsSettings.language) {
    return availableLanguages.includes(lsSettings.language) ? lsSettings.language : 'ru';
  }

  return availableLanguages.includes(systemLanguage) ? systemLanguage : 'ru';
}

function getDefaultTheme() {
  const systemTheme = new ThemeCatcher().isLightTheme ? 'light' : 'dark';

  if (lsSettings && lsSettings.theme) {
    return lsSettings.theme;
  }

  return systemTheme;
}

export const language = writable(getDefaultLanguage());
export const theme = writable(getDefaultTheme());
