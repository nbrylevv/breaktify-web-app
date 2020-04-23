import {
  addMessages,
  init,
  getLocaleFromQueryString,
} from 'svelte-i18n'
import {
  lsHelper,
} from '../utils/ls-helper';

import ru from '../locales/ru.json'
import en from '../locales/en.json'

addMessages('ru', ru);
addMessages('en', en);

init({
  fallbackLocale: 'en',
  initialLocale: getLocaleFromQueryString('lang') || lsHelper.getObject('app-settings', 'language') || 'ru',
})
