<script>
  import Button from '../components/Button.svelte';
  import PlayStopIcon from '../components/PlayStopIcon.svelte';

  import {
    STATES,
  } from '../consts/states';
  import {
    state,
  } from '../stores/state';
  import {
    intervalTime as storeIntervalTime,
  } from '../stores/notification-settings';

  let currentState;
  let intervalTime;

  let countdownStartedAt;
  let startDiffInterval;
  let fillHeight = 0;
  let countdown = 0;

  $: remainingTimeValue = countdown > 1 ? Math.round(countdown) : Math.round(countdown * 60);
  $: remainingTimeLabel = countdown > 1 ? 'минут' : 'секунд';

  const stateListener = state.subscribe(value => {
    currentState = value;

    switch (value) {
      case STATES.action:
        countdownStartedAt = new Date().getTime();
        fillHeight = 0;
        startTimeDiff();
        break;
      case STATES.stopped:
        stopTimeDiff();
        resetCountdown();
        fillHeight = 0;
        break;
      case STATES.break:
        stopTimeDiff();
        fillHeight = 100;
        break;
    }
  });
  const intervalTimeListener = storeIntervalTime.subscribe(value => {
    intervalTime = value;
  })

  function onButtonClick() {
    state.set(currentState === STATES.stopped ? STATES.action : STATES.stopped);
  }

  function startTimeDiff() {
    updateFillHeight();
    startDiffInterval = setInterval(updateFillHeight, 1000);
  }

  function updateFillHeight() {
    const now = new Date().getTime();
    const timeDiffMinutes = (now - countdownStartedAt) / (1000 * 60);

    countdown = intervalTime - (timeDiffMinutes);
    fillHeight = (timeDiffMinutes / intervalTime) * 100;
  }

  function stopTimeDiff() {
    clearInterval(startDiffInterval);
  }

  function resetCountdown() {
    countdownStartedAt = NaN;
  }
</script>

<div class="{`bt-panel ${$$props.class}`}">
  <Button class="bt-panel__button"
          on:click={onButtonClick}>
    <PlayStopIcon value="{currentState === STATES.stopped}" />
    <div class="bt-panel__remaining-time">
      {#if currentState === STATES.stopped }
        Начать отсчет
      {:else}
        До следующего перерыва:
        <span class="bt-panel__remaining-time-value">
          {remainingTimeValue} {remainingTimeLabel}
        </span>
      {/if}
    </div>
  </Button>
  <div class="bt-panel__countdown-line"
       style="{`height: ${fillHeight}%`}" />
</div>

<style global lang="scss">
.bt-panel {
  position: relative;
  width: 100%;
  height: 100%;

  &__button {
    display: block;
    width: 100%;
    height: 100%;
    z-index: 1;
    font-size: 18px;
    color: var(--action-button-color);
    background: var(--action-button-background);
    border-radius: 0;
    transition: all 0.125s;

    &:hover {
      background: var(--action-button-background_hover);
    }

    &:focus {
      outline: none;
    }
  }

  &__remaining-time {
    height: 56px;
    margin-top: 10px;
    font-size: 20px;
  }

  &__remaining-time-value {
    display: block;
    font-size: 24px;
  }

  &__countdown-line {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    background: var(--countdown-background);
    transition: height 0.125s linear;
    pointer-events: none;
  }
}
</style>
