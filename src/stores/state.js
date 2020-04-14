import { writable } from 'svelte/store';
import { STATES } from '../consts/states';

export const state = writable(STATES.stopped)
