import key$ from '../utils/keyStream';

export default function intent (DOM) {
  key$.subscribe(v => console.log(v));
  return {
    changeBPM$      : DOM.select('#bpm').events('input').map(ev => +ev.target.value),
    incrementLoops$ : DOM.select('.LoopCount__Increment').events('click').map(1).startWith(1),
    decrementLoops$ : DOM.select('.LoopCount__Decrement').events('click').map(-1).startWith(-1),
    toggleSlider$   : key$.filter(k => k === '/'),
    addNote$        : key$.filter(k => /[A-Z]/.test(k)),
  };
}
