<script>
  import { _ } from 'svelte-i18n';

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
    breakTime as storeBreakTime,
  } from '../stores/notification-settings';

  let currentState;
  let intervalTime;
  let breakTime;

  let actionCountdownStartedAt;
  let breakCountdownStartedAt;
  let actionTimerInterval;
  let breakTimerInterval;
  let fillHeight = 0;
  let actionCountdown = 0;
  let breakCountdown = 0;

  $: actionRemainingTimeValue = actionCountdown > 1 ? Math.round(actionCountdown) : Math.round(actionCountdown * 60);
  $: actionRemainingTimeLabel = actionCountdown > 1 ? 'panel.in_minutes' : 'panel.in_seconds';

  const stateListener = state.subscribe(value => {
    currentState = value;

    switch (value) {
      case STATES.action:
        actionCountdownStartedAt = new Date().getTime();
        fillHeight = 0;
        stopBreakTimer();
        startActionTimer();
        break;
      case STATES.stopped:
        stopActionTimer();
        stopBreakTimer();
        resetCountdown();
        fillHeight = 0;
        break;
      case STATES.break:
        breakCountdownStartedAt = new Date().getTime();
        stopActionTimer();
        startBreakTimer();
        fillHeight = 100;
        break;
    }
  });
  const intervalTimeListener = storeIntervalTime.subscribe(value => {
    intervalTime = value;
  });
  const breakTimeListener = storeBreakTime.subscribe(value => {
    breakTime = value;
  })

  function onButtonClick() {
    state.set(currentState === STATES.stopped ? STATES.action : STATES.stopped);
  }

  function startActionTimer() {
    updateActionCountdown();
    actionTimerInterval = setInterval(updateActionCountdown, 1000);
  }

  function updateActionCountdown() {
    const now = new Date().getTime();
    const timeDiffMinutes = (now - actionCountdownStartedAt) / (1000 * 60);

    actionCountdown = intervalTime - (timeDiffMinutes);
    fillHeight = (timeDiffMinutes / intervalTime) * 100;
  }

  function stopActionTimer() {
    clearInterval(actionTimerInterval);
  }

  function resetCountdown() {
    actionCountdownStartedAt = NaN;
    breakCountdownStartedAt = NaN;
  }

  function startBreakTimer() {
    breakTimerInterval = setInterval(updateBreakCountdown, 1000);
  }

  function updateBreakCountdown() {
    const now = new Date().getTime();
    const timeDiffMinutes = (now - breakCountdownStartedAt) / 1000;

    breakCountdown = breakTime - (timeDiffMinutes);
  }

  function stopBreakTimer() {
    clearInterval(breakTimerInterval);
  }
</script>

<div class="{`bt-panel ${$$props.class}`}">
  <Button class="bt-panel__button"
          on:click={onButtonClick}>
    <PlayStopIcon value="{currentState === STATES.stopped}" />
    <div class="bt-panel__remaining-time">
      {#if currentState === STATES.stopped }
        {$_('panel.start_timer')}
      {:else if currentState === STATES.action }
        {$_('panel.next_break_in')}
        <span class="bt-panel__remaining-time-value">
          {actionRemainingTimeValue} {$_(actionRemainingTimeLabel)}
        </span>
      {:else }
        {$_('panel.break_ends_in')}
        <span class="bt-panel__remaining-time-value">
          {Math.round(breakCountdown)} {$_('panel.in_seconds')}
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
