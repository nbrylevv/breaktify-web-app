<script>
  import Input from '../components/Input.svelte';
  import Select from '../components/Select.svelte';
  import Button from '../components/Button.svelte';

  import { SOUNDS } from '../consts/sounds';

  import {
    intervalTime as storeIntervalTime,
    breakTime as storeBreakTime,
    notificationMessage as storeMessage,
  } from '../stores/settings';

  let intervalTime;
  let breakTime;
  let message;
  let sound;

  const intervalTimeListener = storeIntervalTime.subscribe(value => {
    intervalTime = value;
  });
  const breakTimeListener = storeBreakTime.subscribe(value => {
    breakTime = value;
  });
  const messageListener = storeMessage.subscribe(value => {
    message = value;
  });

  function onIntervalChange(event) {
    const value = parseInt(event.target.value);
    storeIntervalTime.set(value)
  }

  function onBreakChange(event) {
    const value = parseInt(event.target.value);
    storeBreakTime.set(value)
  }

  function onMessageChange(event) {
    storeMessage.set(event.target.value)
  }

  function onSoundSelect(event) {
    const { value } = event.target;

    sound = value;
  }

  function playSound(){
    const selectedSound = SOUNDS.find(_ => _.id === parseInt(sound, 10));

    if (!selectedSound) {
      document.getElementById("sound").innerHTML = '';
      return;
    }

    var mp3Source = '<source src="' + selectedSound.mp3 + '" type="audio/mpeg">';
    var oggSource = '<source src="' + selectedSound.ogg + '" type="audio/ogg">';
    document.getElementById("sound").innerHTML='<audio autoplay="autoplay">' + mp3Source + oggSource + '</audio>';
  }
</script>

<div class="{`bt-settings ${$$props.class}`}">
  <form class="bt-settings__form">
    <div on:click={playSound}>
      TEST SOUND
      <div id="sound"></div>
    </div>
    <h1 class="bt-settings__header">Breaktify!</h1>

    <h2 class="bt-settings__sub-header">Настройки уведомлений</h2>
    <div class="bt-settings__row">
      <label class="bt-settings__label">Интервал (мин)</label>
      <Input class="bt-settings__control"
             type="number"
             placeholder="Интервал"
             min="1"
             value={intervalTime}
             on:input={onIntervalChange} />
    </div>
    <div class="bt-settings__row">
      <label class="bt-settings__label">Перерыв (сек)</label>
      <Input class="bt-settings__control"
             type="number"
             placeholder="Перерыв"
             min="1"
             value={breakTime}
             on:input={onBreakChange} />
    </div>
    <div class="bt-settings__row">
      <label class="bt-settings__label">Сообщение</label>
      <Input class="bt-settings__control"
             placeholder="Сообщение"
             value={message}
             on:input={onMessageChange} />
    </div>
    <div class="bt-settings__row">
      <label class="bt-settings__label">Звуковое уведомление</label>
      <Select class="bt-settings__control"
              on:input={onSoundSelect}>
        <option value="''">Без звука</option>
        {#each SOUNDS as sound }
          <option value="{sound.id}">{sound.name}</option>
        {/each}
      </Select>
    </div>
  </form>

  <form class="bt-settings__form">
    <h2 class="bt-settings__sub-header">Настройки приложения</h2>
    <div class="bt-settings__row">
      <label class="bt-settings__label">Язык</label>
      <Select class="bt-settings__control"
              on:input={onSoundSelect}>
        <option>Русский</option>
        <option>English</option>
      </Select>
    </div>
    <div class="bt-settings__row">
      <label class="bt-settings__label">Тема оформления</label>
      <Select class="bt-settings__control"
              on:input={onSoundSelect}>
        <option>Темная тема</option>
        <option>Светлая тема</option>
      </Select>
    </div>
  </form>
</div>

<style global lang="scss">
.bt-settings {
  width: 100%;

  &__form {

  }

  &__header {
    margin-top: 0;
    font-size: 42px;
  }

  &__sub-header {
    display: block;
    font-size: 20px;
    padding-bottom: 10px;
    margin: 20px 0;
    color: #484848;
    border-bottom: 1px solid #e4e4e4;
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

  &__control {
    width: 100%;
  }
}
</style>
