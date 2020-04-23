<script>
  export let type;
  export let placeholder;
  export let value;
  export let min;
</script>

<input class="{`bt-input ${$$props.class}`}"
       type="{type}"
       placeholder="{placeholder}"
       min="{min}"
       value={value}
       on:input>

<style global lang="scss">
.bt-input {
  height: 38px;
  min-width: 100px;
  padding: 0 10px;
  font-size: 16px;
  color: var(--control-color);
  background: var(--control-background);
  border: 1px solid var(--control-border-color);
  border-radius: 3px;
  transition: all 0.125s;
  appearance: none;

  &:hover,
  &:focus {
    border-color: var(--control-border-color_hover);
  }

  &::placeholder {
  }
}
</style>
