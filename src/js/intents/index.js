import KeyStringDetector from 'key-string';
const detector = new KeyStringDetector();

export default function intent (DOM) {
  const key$ = DOM.select(':root').events('keydown').map((event) => detector.detect(event));

  return {
    changeBPM$ : DOM.select('#bpm').events('input').map(ev => +ev.target.value).startWith(144),
    addNote$   : DOM.select('.Clicker').events('mousedown').startWith([0, 16, 32, 48]),
    addSnare$  : key$.filter(k => k === 'Z'),
  };
}
