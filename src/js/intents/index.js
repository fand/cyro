export default function intent (DOM) {
  return {
    changeBPM$ : DOM.select('#bpm').events('input').map(ev => +ev.target.value).startWith(144),
    mousedown$ : DOM.select('body').events('mousedown'),
  };
}
