<script>
  import Button from '../components/Button.svelte';

  import { STATES } from '../consts/states';
  import { ICONS } from '../consts/icons';
  import { state } from '../stores/state';

  let currentState;

  const stateListener = state.subscribe(value => {
    currentState = value;
  });

  function onButtonClick() {
    state.set(currentState === STATES.stopped ? STATES.action : STATES.stopped)
  }
</script>

<div class="{`bt-panel ${$$props.class}`}">
  <div class="{`bt-panel__state-icon bt-panel__state-icon_${ICONS[currentState].replace('.png', '')}`}" />
  <Button class="bt-panel__button" on:click={onButtonClick}>
    {#if currentState === STATES.stopped }
      <span class="bt-start-icon" />
    {:else}
      <span class="bt-pause-icon" />
    {/if}
  </Button>
</div>

<style global lang="scss">
.bt-panel {
  position: relative;

  &__button {
    display: block;
    width: 15rem;
    height: 15rem;
    color: #fff;
    background: #6289ff;
    border-radius: 50%;
    transition: all 0.125s;

    &:hover {
      background: #426cef;
    }

    &:active {
      background: #3251b3;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 5px 0 rgba(0, 0, 0, 1);
    }
  }

  &__state-icon {
    position: absolute;
    top: -40px;
    right: -40px;
    width: 128px;
    height: 128px;
    pointer-events: none;
    transform: rotate(0);

    &_timer {
      background: url('/images/timer.png');
      background-size: cover;
    }

    &_palm {
      background: url('/images/palm.png');
      background-size: cover;
    }

    &_sandtime {
      animation: spin 3s ease-in-out infinite;
      background: url('/images/sandtime.png');
      background-size: cover;
    }
  }
}

.bt-pause-icon {
  display: block;
  width: 70px;
  height: 40%;
  margin: auto;
  border-left: 20px solid #fff;
  border-right: 20px solid #fff;
}

.bt-start-icon {
  display: block;
  width: 0;
  height: 0;
  margin: 0 auto;
  transform: translateX(30px);
  border: 48px solid transparent;
  border-left-color: #fff;
}

@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform:rotate(360deg);
  }
}
</style>
