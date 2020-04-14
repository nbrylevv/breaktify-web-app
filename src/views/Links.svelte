<script>
  import Link from '../components/Link.svelte';
</script>

<ul class="{`bt-links ${$$props.class}`}">
  <li class="bt-links__item">
    <Link href="http://github.com/nbrylevv">
      GitHub
    </Link>
  </li>
</ul>

<style global lang="scss">
.bt-links {
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 0;
  margin: 0;
  font-size: 14px;
  color: #696969;
  list-style: none;
}
</style>
