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
  border: 1px solid #d0d0d0;
  border-radius: 3px;
  transition: all 0.125s;
  -webkit-appearance: none;

  &:hover,
  &:focus {
    border-color: #a1a1a1;
  }

  &::placeholder {
  }
}
</style>
