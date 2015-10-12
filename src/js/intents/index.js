import { keydown$, keyup$ } from '../utils/keyStream';

// keydown$.subscribe(::console.log);

const configIntents = (DOM) => {
  const incrementLoops$ = DOM.select('.LoopCount__Increment').events('click')
    .map(1).startWith(1);
  const decrementLoops$ = DOM.select('.LoopCount__Decrement').events('click')
    .map(-1).startWith(-1);

  const setLoopCount$ = incrementLoops$.merge(decrementLoops$).startWith(1)
    .scan((prev, next) => Math.min(Math.max(1, prev + next), 4));

  const changeBPM$    = DOM.select('#bpm').events('input').map(ev => +ev.target.value);
  const toggleSlider$ = keydown$.filter(k => k === '/');

  return {
    changeBPM$,
    setLoopCount$,
    toggleSlider$,
  };
};

const noteIntents = () => {
  const requestAddNote$ = keydown$.filter(k => /^[A-Z]$/.test(k));

  const shiftOn$  = keydown$.filter(k => k === 'Shift').map(true);
  const shiftOff$ = keyup$.filter(k => k === 'Shift').map(false);

  const isResetMode$ = shiftOn$.merge(shiftOff$).startWith(false);

  const addNote$   = requestAddNote$.pausable(isResetMode$.map(x => !x));
  const resetNote$ = requestAddNote$.pausable(isResetMode$);

  return {
    addNote$,
    resetNote$,
  };
};

export default function intent (DOM) {
  return {
    ...noteIntents(),
    ...configIntents(DOM),
  };
}
