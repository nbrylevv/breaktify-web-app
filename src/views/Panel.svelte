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
  width: 100%;
  height: 100%;

  &__button {
    display: block;
    width: 100%;
    height: 100%;
    color: #fff;
    background: #7897f5;
    border-radius: 0;
    transition: all 0.125s;

    &:hover {
      background: #6083ee;
    }

    &:active {
      background: #4762b3;
    }

    &:focus {
      outline: none;
    }
  }
}

.bt-pause-icon {
  display: block;
  width: 70px;
  height: 120px;
  margin: auto;
  border-left: 20px solid #fff;
  border-right: 20px solid #fff;
}

.bt-start-icon {
  display: block;
  width: 0;
  height: 0;
  margin: 0 auto;
  transform: translateX(50px);
  border: 70px solid transparent;
  border-left-color: #fff;
}

@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform:rotate(360deg);
  }
}
</style>
