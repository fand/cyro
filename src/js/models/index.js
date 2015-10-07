import Cycle, {Rx} from '@cycle/core';
import { EventEmitter } from 'events';


const bpmToInterval = bpm => (60000 / bpm) * 4;

const cyroModel = (actions) => {

  const interval$ = actions.changeBPM$.map(bpmToInterval);

  const loop$ = (() => {
    let currentInterval;
    const eventEmitter = new EventEmitter();
    const looper = () => {
      eventEmitter.emit('loop', 1);
      setTimeout(looper, currentInterval);
    };

    interval$.subscribe((interval) => {
      currentInterval = interval;
    });
    looper();

    return Rx.Observable.fromEvent(eventEmitter, 'loop').startWith(1);
  })();

  // loopの頭にintervalを生成
  const intervalForLoop$ = loop$.withLatestFrom(
    interval$,
    (loop, interval) => (interval)
  );

  const timestamp$ = loop$.map(() => performance.now());

  const intervalAndTimestamp$ = Rx.Observable.combineLatest(
    interval$,
    timestamp$,
  );

  const note$ = actions.addNote$
    .withLatestFrom(intervalAndTimestamp$, (e, [interval, timestamp]) => {
      return ((performance.now() - timestamp) / interval * 64) | 0;
    }).startWith([0, 16, 32, 48]);

  const notes$ = note$.scan((prev, note) => prev.concat(note));

  const notesAndLoop$ = Rx.Observable.combineLatest(notes$, loop$);

  const stateForLoop$ = notesAndLoop$.withLatestFrom(
    intervalAndTimestamp$,
    ([notes], [interval, startTime]) => ({
      notes, interval, startTime,
    })
  );

  stateForLoop$.subscribe(s => console.log(s.notes.length));
  return stateForLoop$;
};

export default function models (actions) {

  const cyroState$ = cyroModel(actions);

  return Cycle.Rx.Observable.combineLatest(
    actions.changeBPM$.startWith(144),
    cyroState$,
    (bpm, cyro) => {
      return { bpm, cyro };
    }
  );
}
