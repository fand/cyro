import key$ from '../utils/keyStream';

const configIntents = (DOM) => {
  const incrementLoops$ = DOM.select('.LoopCount__Increment').events('click')
    .map(1).startWith(1);
  const decrementLoops$ = DOM.select('.LoopCount__Decrement').events('click')
    .map(-1).startWith(-1);

  const setLoopCount$ = incrementLoops$.merge(decrementLoops$).startWith(1)
    .scan((prev, next) => Math.min(Math.max(1, prev + next), 4));

  return { setLoopCount$ };
};

export default function intent (DOM) {
  key$.subscribe(v => console.log(v));
  return {
    changeBPM$      : DOM.select('#bpm').events('input').map(ev => +ev.target.value),
    toggleSlider$   : key$.filter(k => k === '/'),
    addNote$        : key$.filter(k => /[A-Z]/.test(k)),
    ...configIntents(DOM),
  };
}
