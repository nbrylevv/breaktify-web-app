<script>
  import { createEventDispatcher } from 'svelte';
  import { _ } from 'svelte-i18n';

  import {
    lsHelper,
  } from '../utils/ls-helper';

  import Input from '../components/Input.svelte';
  import Select from '../components/Select.svelte';
  import Button from '../components/Button.svelte';

  import { SOUNDS } from '../consts/sounds';
  import { LANGUAGES } from '../consts/languages';
  import { THEMES } from '../consts/themes';

  import {
    intervalTime as storeIntervalTime,
    breakTime as storeBreakTime,
    message as storeMessage,
    sound as storeSound,
  } from '../stores/notification-settings';
  import {
    theme as storeTheme,
    language as storeLanguage,
  } from '../stores/app-settings';

  const dispatch = createEventDispatcher();

  let intervalTime;
  let breakTime;
  let message;
  let sound;

  let theme;
  let language;

  const intervalTimeListener = storeIntervalTime.subscribe(value => {
    intervalTime = value;
  });
  const breakTimeListener = storeBreakTime.subscribe(value => {
    breakTime = value;
  });
  const messageListener = storeMessage.subscribe(value => {
    message = value;
  });
  const soundListener = storeSound.subscribe(value => {
    sound = value;
  });
  const themeListener = storeTheme.subscribe(value => {
    theme = value;
  });
  const languageListener = storeLanguage.subscribe(value => {
    language = value;
  });

  function onIntervalChange(event) {
    const value = parseInt(event.target.value);

    storeIntervalTime.set(value)
    lsHelper.setObject('notification-settings', 'interval', value);
  }

  function onBreakChange(event) {
    const value = parseInt(event.target.value);

    storeBreakTime.set(value)
    lsHelper.setObject('notification-settings', 'break', value);
  }

  function onMessageChange(event) {
    const { value } = event.target;

    storeMessage.set(event.target.value);
    lsHelper.setObject('notification-settings', 'message', value);
  }

  function onSoundSelect(event) {
    const { value } = event.target;

    storeSound.set(value);
    lsHelper.setObject('notification-settings', 'sound', value);
  }

  function onLanguageSelect(event) {
    const { value } = event.target;

    storeLanguage.set(value);
    lsHelper.setObject('app-settings', 'language', value);
    location.search = `lang=${value}`;
  }

  function onThemeSelect(event) {
    const { value } = event.target;

    storeTheme.set(value);
    lsHelper.setObject('app-settings', 'theme', value);
  }

  function dispatchRunExample(entity) {
    console.log('dispatchRunExample', entity);
    dispatch('run-example', { entity });
  }

  function playSound(){
    document.getElementById('bt-sound-audio').play();
  }
</script>

<div class="{`bt-settings ${$$props.class}`}">
  <form class="bt-settings__form">
    <h2 class="bt-settings__sub-header">{$_('notification_settings.caption')}</h2>
    <div class="bt-settings__row">
      <label class="bt-settings__label">{$_('notification_settings.interval_label')}</label>
      <Input class="bt-settings__control"
             type="number"
             placeholder="{$_('notification_settings.interval_label')}"
             min="1"
             value={intervalTime}
             on:input={onIntervalChange} />
    </div>
    <div class="bt-settings__row">
      <label class="bt-settings__label">{$_('notification_settings.break_label')}</label>
      <Input class="bt-settings__control"
             type="number"
             placeholder="{$_('notification_settings.break_label')}"
             min="1"
             value={breakTime}
             on:input={onBreakChange} />
    </div>
    <div class="bt-settings__row">
      <label class="bt-settings__label">{$_('notification_settings.message_label')}</label>
      <Input class="bt-settings__control"
             placeholder="{$_('notification_settings.message_label')}"
             value={message}
             on:input={onMessageChange} />
    </div>
    <div class="bt-settings__row">
      <label class="bt-settings__label">{$_('notification_settings.sound_label')}</label>
      <div class="bt-settings__row-splitter">
        <Select class="bt-settings__control"
                value="{sound}"
                on:input={onSoundSelect}>
          <option value="''">{$_('constants.sounds.no_sound')}</option>
          {#each SOUNDS as sound }
            <option value="{sound.id}">{sound.name}</option>
          {/each}
        </Select>
        <Button class="bt-settings__button bt-settings__button_sound-sample"
                type="button"
                on:click={() => dispatchRunExample('sound')}>
          <span class="bt-start-icon" />
        </Button>
      </div>
    </div>
    <div class="bt-settings__row">
      <Button class="bt-settings__button bt-settings__button_notification-sample"
              type="button"
              on:click={() => dispatchRunExample('notification')}>
        Пробное уведомление
      </Button>
    </div>
  </form>

  <form class="bt-settings__form">
    <h2 class="bt-settings__sub-header">{$_('app_settings.caption')}</h2>
    <div class="bt-settings__row">
      <label class="bt-settings__label">{$_('app_settings.language_label')}</label>
      <Select class="bt-settings__control"
              value="{language}"
              on:input={onLanguageSelect}>
        {#each LANGUAGES as language }
          <option value="{language.value}">{$_(`${language.translate}`)}</option>
        {/each}
      </Select>
    </div>
    <div class="bt-settings__row">
      <label class="bt-settings__label">{$_('app_settings.theme_label')}</label>
      <Select class="bt-settings__control"
              value="{theme}"
              on:input={onThemeSelect}>
        {#each THEMES as theme }
          <option value="{theme.value}">{$_(`${theme.translate}`)}</option>
        {/each}
      </Select>
    </div>
  </form>
</div>

<style global lang="scss">
.bt-settings {
  width: 100%;

  &__form {

  }

  &__sub-header {
    display: block;
    font-size: 20px;
    padding-bottom: 10px;
    margin: 20px 0;
    border-bottom: 1px solid var(--panel-border-color);
  }

  &__row {
    margin-bottom: 10px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  &__label {
    display: block;
    margin-bottom: 5px;
  }

  &__row-splitter {
    display: flex;
    align-content: center;
  }

  &__control {
    width: 100%;
  }

  &__button {
    &_sound-sample {
      height: 38px;
      min-width: unset;
      margin-left: 10px;
      padding: 0 10px;
      color: var(--text-color);

      .bt-start-icon {
        display: block;
        width: 0;
        height: 0;
        margin: 0 auto;
        transform: translateX(5px);
        border: 8px solid transparent;
        border-left-color: currentColor;
      }
    }

    &_notification-sample {
      width: 100%;
    }
  }
}
</style>
