<script>
  import Input from '../components/Input.svelte';
  import Button from '../components/Button.svelte';

  import {
    intervalTime as storeIntervalTime,
    breakTime as storeBreakTime,
    notificationMessage as storeMessage,
  } from '../stores/settings';

  let intervalTime;
  let breakTime;
  let message;

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
</script>

<form class="{`bt-settings ${$$props.class}`}">
  <h1 class="bt-settings__header">Breaktify</h1>
  <div class="bt-settings__row">
    <label class="bt-settings__label">Интервал (мин)</label>
    <Input class="bt-settings__control"
           type="number"
           placeholder="Интервал"
           min="0"
           value={intervalTime}
           on:input={onIntervalChange} />
  </div>
  <div class="bt-settings__row">
    <label class="bt-settings__label">Перерыв (сек)</label>
    <Input class="bt-settings__control"
           type="number"
           placeholder="Перерыв"
           min="0"
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
</form>

<style global lang="scss">
.bt-settings {
  &__header {
    margin-top: 0;
  }

  &__row {
    margin-bottom: 10px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  &__label {

  }

  &__control {
    width: 100%;
  }
}
</style>
