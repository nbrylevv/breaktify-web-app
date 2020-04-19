<script>
  export let type;
</script>

<button class="{`bt-button ${$$props.class}`}"
        type="{type}"
        on:click>
  <slot />
</button>

<style global lang="scss">
.bt-button {
  height: 46px;
  min-width: 100px;
  padding: 0;
  font-size: 16px;
  color: var(--control-color);
  cursor: pointer;
  background: var(--button-background);
  border: 1px solid transparent;
  border-radius: 3px;
  transition: color 0.125s, background 0.125s;
  appearance: none;
}
</style>
