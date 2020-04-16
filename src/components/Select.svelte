<select class="{`bt-select ${$$props.class}`}"
        on:input>
  <slot />
</select>

<style global lang="scss">
.bt-select {
  height: 38px;
  min-width: 100px;
  padding: 0 10px;
  font-size: 16px;
  border: 1px solid #d0d0d0;
  border-radius: 3px;
  background: transparent;
  transition: all 0.125s;
}
</style>
