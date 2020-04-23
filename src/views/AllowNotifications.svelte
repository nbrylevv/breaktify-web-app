<script>
  import { _ } from 'svelte-i18n';

  import Button from '../components/Button.svelte';

  import {
    Notifications,
  } from '../utils/notifications';

  const notifications = new Notifications();

  function requestPermissionCallback(permission) {
    if (permission === 'granted') {
      location.reload();
    }
  }
</script>

<div class="bt-allow-notify">
  {#if notifications.permissionStatus === 'denied' }
    <div class="bt-allow-notify__arrow">
      <span class="bt-allow-notify__arrow-message">{$_('allow_notifications.allow')}</span>
    </div>
  {/if}
  <div class="bt-allow-notify__message">
    {#if notifications.permissionStatus === 'denied' }
      {$_('allow_notifications.to_use_app_you_need_allow_notifications')}
    {:else}
      {$_('allow_notifications.you_need_allow_notifications')}
      <Button on:click={() => notifications.requestPermission(requestPermissionCallback)}
              class="bt-button_blue bt-allow-notify__button">
        {$_('allow_notifications.allow')}
      </Button>
    {/if}
  </div>
</div>

<style global lang="scss">
.bt-allow-notify {
  &__arrow {
    position: fixed;
    top: 10px;
    left: 104px;
    width: 102px;
    height: 120px;
    background: url('images/notification-arrow-top.png');
    background-repeat: no-repeat;
    background-size: cover;
  }

  &__arrow-message {
    position: absolute;
    top: 100%;
    left: 100%;
    margin-top: -16px;
    margin-left: 10px;
    font-size: 22px;
    font-style: italic;
    color: #4a4a4a;
  }

  &__message {
    font-size: 20px;
  }

  &__button {
    display: block;
    margin: 10px auto 0;
  }
}
</style>
