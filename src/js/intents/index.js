export default function intent (DOM) {
  return {
    changeBPM$ : DOM.select('#bpm').events('input').map(ev => +ev.target.value).startWith(144),
    addNote$   : DOM.select('.Clicker').events('mousedown').startWith([0, 16, 32, 48]),
  };
}
