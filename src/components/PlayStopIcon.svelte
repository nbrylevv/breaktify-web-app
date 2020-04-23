<script>
  export let value;

  $: state = value ? 'play' : 'stop';
</script>


<div class="{`bt-play-stop-icon bt-play-stop-icon_${state}`}" />

<style global lang="scss">
.bt-play-stop-icon {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  border: 50px solid #fff;
  transition: all 0.125s linear;

  &_play {
    border-left-color: transparent;
  }

  &_stop {
    border-color: #fff;
  }
}
</style>
