<script>
	import { onMount } from 'svelte';

	import Panel from './views/Panel.svelte';
	import Settings from './views/Settings.svelte';
	import Links from './views/Links.svelte';
	import NoBrowserSupport from './views/NoBrowserSupport.svelte';
	import AllowNotifications from './views/AllowNotifications.svelte';

	import {
		settingsWatcher,
		sound as storeSound,
	} from './stores/notification-settings';
	import {
		theme,
	} from './stores/app-settings';
	import {
		state,
	} from './stores/state';

	import {
		Notifications,
	} from './utils/notifications';
	import {
		DocumentFavicon,
	} from './utils/document-favicon';

	import {
		STATES,
	} from './consts/states';
	import {
		FAVICONS,
	} from './consts/favicons';
	import {
		SOUNDS,
	} from './consts/sounds';

	const notifications = new Notifications();
	const documentFavicon = new DocumentFavicon();

	let isMounted = false;

	let actionTimerId = null;
	let breakTimerId = null;
	let settings = {};
	let currentState = null;

 	const settingsListener = settingsWatcher.subscribe(value => {
 		settings = value;
		state.set(STATES.stopped);
	});
	const soundListener = storeSound.subscribe(value => {
		if (isMounted) {
			applySound(value);
		}
	});

	onMount(() => {
		isMounted = true;
		applySound(settings.sound);
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
 	const themeListener = theme.subscribe(value => applyTheme(value));

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
 		if (settings.sound) {
 			playSound();
		}

		notifications.create('Breaktify!', {
			body: `${settings.message}\nОтдохните следующие ${settings.breakTime} секунд`,
			// image: './images/palm.png', // app-logo
			icon: './images/palm.png',
		});
	}

	function applyTheme(value) {
 		const lightThemeClass = 'theme_light';
 		const darkThemeClass = 'theme_dark';

 		if (value === 'light') {
 			document.body.classList.add(lightThemeClass);
			document.body.classList.remove(darkThemeClass);
		} else {
			document.body.classList.add(darkThemeClass);
			document.body.classList.remove(lightThemeClass);
		}
	}

	function applySound(soundId) {
		const selectedSound = SOUNDS.find(_ => _.id === soundId);

		if (!document.getElementById('bt-sound-wrapper')) {
			return;
		}

		if (!selectedSound) {
			document.getElementById('bt-sound-wrapper').innerHTML = '';
			return;
		}

		const mp3Source = '<source src="' + selectedSound.mp3 + '" type="audio/mpeg">';
		const oggSource = '<source src="' + selectedSound.ogg + '" type="audio/ogg">';
		document.getElementById('bt-sound-wrapper').innerHTML='<audio id="bt-sound-audio">' + mp3Source + oggSource + '</audio>';
	}

	function playSound() {
 		const audio = document.getElementById('bt-sound-audio');

 		audio.currentTime = 0;
		audio.play();
	}

	function runExample(event) {
 		const { entity } = event.detail;

 		switch (entity) {
			case 'sound':
				playSound();
				break;
			case 'notification':
				notificate();
				break;
			default:
				break;
		}
	}

</script>

<main class="bt-app">
	<div class="bt-layout">
		{#if !notifications.hasBrowserSupport }
			<NoBrowserSupport />
		{:else if !notifications.hasPermission }
			<AllowNotifications />
		{:else}
			<div class="bt-layout__side bt-layout__side_left">
				<Panel class="bt-app__panel" />
			</div>
			<div class="bt-layout__side bt-layout__side_right">
				<Settings class="bt-app__settings"
									on:run-example={runExample} />
				<Links class="bt-app__links" />
			</div>
		{/if}
	</div>
	<div id="bt-sound-wrapper"
			 class="bt-app__sound">
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

	&__sound {
		position: absolute;
		top: 0;
		right: 0;
		width: 0;
		height: 0;
		opacity: 0;
		pointer-events: none;
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
			background: var(--panel-background);
			border-left: 1px solid var(--panel-border-color);
			overflow-x: hidden;
			overflow-y: auto;
		}
	}
}
</style>
