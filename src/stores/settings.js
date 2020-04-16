import { writable, derived } from 'svelte/store';

export const intervalTime = writable(15);
export const breakTime = writable(15);
export const notificationMessage = writable('Пора размяться!')

export const settingsWatcher = derived(
  [intervalTime, breakTime, notificationMessage],
  ([intervalTimeCb, breakTimeCb, notificationMessageCb]) => {
    if (intervalTimeCb < 1 || Number.isNaN(intervalTimeCb)) {
      intervalTime.set(1);
    }
    if (breakTimeCb < 1 || Number.isNaN(breakTimeCb)) {
      breakTime.set(1);
    }

    return {
      intervalTime: intervalTimeCb,
      breakTime: breakTimeCb,
      notificationMessage: notificationMessageCb,
    }
  }
);
