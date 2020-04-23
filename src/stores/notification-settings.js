import { writable, derived } from 'svelte/store';
import { lsHelper } from '../utils/ls-helper';

const lsSettings = lsHelper.getObject('notification-settings');

function getDefaultValue(lsKey, defaultValue) {
  return lsSettings && lsSettings[lsKey] ? lsSettings[lsKey] : defaultValue;
}

export const intervalTime = writable(getDefaultValue('interval', 15));
export const breakTime = writable(getDefaultValue('break', 15));
export const message = writable(getDefaultValue('message', ''));
export const sound = writable(getDefaultValue('sound', ''))

export const settingsWatcher = derived(
  [intervalTime, breakTime, message, sound],
  ([intervalTimeCb, breakTimeCb, messageCb, soundCb]) => {
    if (intervalTimeCb < 1 || Number.isNaN(intervalTimeCb)) {
      intervalTime.set(1);
    }
    if (breakTimeCb < 1 || Number.isNaN(breakTimeCb)) {
      breakTime.set(1);
    }

    return {
      intervalTime: intervalTimeCb,
      breakTime: breakTimeCb,
      message: messageCb,
      sound: soundCb,
    }
  }
);
