<script>
  import Button from '../components/Button.svelte';

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

  let countdownStartedAt = NaN;
  let startDiffInterval = NaN;
  let fillHeight = 0;
  let countdown = 0;

  $: remainingTime = countdown > 1 ? `${Math.round(countdown)} минут` : `${Math.round(countdown * 60)} секунд`;

  const stateListener = state.subscribe(value => {
    currentState = value;

    console.log('stateListener', value);
    switch (value) {
      case STATES.action:
        fillHeight = 0;
        startTimeDiff();
        break;
      case STATES.stopped:
        fillHeight = 0;
        stopTimeDiff();
        resetCountdown();
        break;
      case STATES.break:
        fillHeight = 100;
        stopTimeDiff();
        break;
    }
    if (value === STATES.action) {
      countdownStartedAt = new Date().getTime();
      startTimeDiff();
    } else {
      stopTimeDiff();
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
    startDiffInterval = setInterval(() => {
      updateFillHeight();
    }, 1000);
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
    {#if currentState === STATES.stopped }
      <span class="bt-start-icon" />
      <div class="bt-panel__remaining-time">
        Начать
      </div>
    {:else}
      <span class="bt-pause-icon" />
      <div class="bt-panel__remaining-time">
        До следующего перерыва:
        <span>{remainingTime}</span>
      </div>
    {/if}
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
    margin-top: 10px;
    font-size: 24px;
    
    span {
      display: block;
    }
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

.bt-pause-icon {
  display: block;
  width: 70px;
  height: 120px;
  margin: auto;
  border-left: 20px solid currentColor;
  border-right: 20px solid currentColor;
}

.bt-start-icon {
  display: block;
  width: 0;
  height: 0;
  margin: 0 auto;
  transform: translateX(50px);
  border: 70px solid transparent;
  border-left-color: currentColor;
}

@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform:rotate(360deg);
  }
}
</style>
