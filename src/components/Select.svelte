<script>
  export let value;
</script>

<select class="{`bt-select ${$$props.class}`}"
        value="{value}"
        on:input>
  <slot />
</select>

<style global lang="scss">
.bt-select {
  height: 38px;
  min-width: 100px;
  padding: 0 10px;
  font-size: 16px;
  color: var(--control-color);
  background: var(--control-background);
  border: 1px solid var(--control-border-color);
  border-radius: 3px;
  transition: all 0.125s;

  &:hover,
  &:focus {
    border-color: var(--control-border-color_hover);
  }

  &::placeholder {
  }
}
</style>
