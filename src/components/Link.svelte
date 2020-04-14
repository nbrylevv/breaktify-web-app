<script>
  export let href;
  export let target = '_blank';
</script>

<a class="{`bt-link ${$$props.class}`}"
   href="{href}"
   target="{target}">
  <slot />
</a>

<style global lang="scss">
.bt-link {
  color: currentColor;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>
