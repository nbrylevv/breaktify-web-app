import { writable, derived } from 'svelte/store';

export const intervalTime = writable(15);
export const breakTime = writable(15);
export const notificationMessage = writable('Пришло время перерыва!')

export const settingsWatcher = derived(
  [intervalTime, breakTime, notificationMessage],
  ([intervalTime, breakTime, notificationMessage]) => ({
    intervalTime,
    breakTime,
    notificationMessage,
  })
);
