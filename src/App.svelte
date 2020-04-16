<script>
	import Panel from './views/Panel.svelte';
	import Settings from './views/Settings.svelte';
	import Links from './views/Links.svelte';
	import NoBrowserSupport from './views/NoBrowserSupport.svelte';
	import AllowNotifications from './views/AllowNotifications.svelte';
	import Button from './components/Button.svelte';

	import {
		settingsWatcher
	} from './stores/settings';
	import {
		state,
	} from './stores/state';

	import {
		Notifications,
	} from './utils/notifications';
	import {
		DocumentFavicon,
	} from './utils/document-favicon'

	import {
		STATES,
	} from './consts/states';
	import {
		FAVICONS,
	} from './consts/favicons';

	const notifications = new Notifications();
	const documentFavicon = new DocumentFavicon();

	let actionTimerId = null;
	let breakTimerId = null;
	let settings = {};
	let currentState = null;

 	const settingsListener = settingsWatcher.subscribe(value => {
 		settings = value;
		state.set(STATES.stopped);
	});
 	const stateListener = state.subscribe(value => {
 		currentState = value;

 		switch (value) {
			case STATES.action:
				documentFavicon.update(FAVICONS[value]);
				if (!actionTimerId) {
					startActionTimer();
				}
				break;
			case STATES.stopped:
				documentFavicon.update(FAVICONS[value]);
				stopActionTimer();
				stopBreakTimer();
				break;
			case STATES.break:
				documentFavicon.update(FAVICONS[value]);
				break;
			default:
				break;
		}
	});

 	function startActionTimer() {
 		stopActionTimer();

 		if (currentState !== STATES.action) {
			state.set(STATES.action);
		}

		actionTimerId = setInterval(() => {
			notificate();
			startBreakTimer();
		}, settings.intervalTime * 1000 * 60);
	}

	function stopActionTimer(changeStatus = false) {
		clearInterval(actionTimerId);

		if (changeStatus) {
			state.set(STATES.stopped);
		}
	}

	function startBreakTimer() {
 		state.set(STATES.break);
 		stopActionTimer();

		breakTimerId = setTimeout(() => {
			stopBreakTimer();
			startActionTimer();
		}, settings.breakTime * 1000)
	}

	function stopBreakTimer() {
 		clearTimeout(breakTimerId);
	}

	function notificate() {
		notifications.create('Breaktify!', {
			body: `${settings.notificationMessage}\nОтдохните следующие ${settings.breakTime} секунд`,
			// image: './images/palm.png', // app-logo
			icon: './images/palm.png',
		});
	}

</script>

<main class="bt-app">
	<div class="bt-layout">
<!--		<h1 class="bt-app__header">Breaktify</h1>-->
		{#if !notifications.hasBrowserSupport }
			<NoBrowserSupport />
		{:else if !notifications.hasPermission }
			<AllowNotifications />
		{:else}
			<div class="bt-layout__side bt-layout__side_left">
				<Panel class="bt-app__panel" />
			</div>
			<div class="bt-layout__side bt-layout__side_right">
				<Settings class="bt-app__settings" />
				<Links class="bt-app__links" />
			</div>
		{/if}
	</div>
</main>

<style global lang="scss">
@import "./assets/scss/app";

.bt-app {
	display: flex;
	width: 100vw;
	height: 100vh;

	.bt-app__links {
		margin-top: 20px;
	}
}

.bt-layout {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;

	&__side {
		display: inline-flex;
		align-items: center;
		height: 100%;

		&_left {
			width: 100%;
			justify-content: center;
		}

		&_right {
			flex: 1 0 380px;
			flex-direction: column;
			justify-content: space-between;
			width: 380px;
			padding: 20px;
			background: #fff;
			border-left: 1px solid #e8e8e8;
			overflow-x: hidden;
			overflow-y: auto;
		}
	}
}
</style>
