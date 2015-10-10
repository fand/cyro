import key$ from '../utils/keyStream';

export default function intent (DOM) {
  key$.subscribe(v => console.log(v));
  return {
    changeBPM$    : DOM.select('#bpm').events('input').map(ev => +ev.target.value),
    setLoopCount$ : DOM.select('#loop').events('change').map(ev => +ev.target.value),
    toggleSlider$ : key$.filter(k => k === '/'),
    addNote$      : key$.filter(k => /[A-Z]/.test(k)),
  };
}
