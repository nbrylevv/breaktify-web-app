<button class="{`bt-button ${$$props.class}`}" on:click>
  <slot />
</button>

<style global lang="scss">
.bt-button {
  height: 46px;
  min-width: 100px;
  padding: 0;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: 3px;
  transition: color 0.125s, background 0.125s;
  appearance: none;

  &_blue {
    color: #fff;
    background: #6289ff;

    &:hover {
      background: #426cef;
    }

    &:active {
      background: #3251b3;
    }
  }
}
</style>
