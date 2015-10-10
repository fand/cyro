import { Rx } from '@cycle/core';
import { EventEmitter } from 'events';

const bpmToInterval = bpm => (60000 / bpm) * 4;

const cyroModel = (actions) => {

  const interval$ = actions.changeBPM$.map(bpmToInterval).startWith(bpmToInterval(144));

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

  const timestamp$ = loop$.map(() => performance.now());

  const intervalAndTimestamp$ = Rx.Observable.combineLatest(
    interval$,
    timestamp$,
  );

  const note$ = actions.addNote$
    .withLatestFrom(intervalAndTimestamp$, (key, [interval, timestamp]) => {
      return [
        key,
        ((performance.now() - timestamp) / interval * 64) | 0,
      ];
    }).startWith([]);

  const notes$ = note$.scan((prev, [key, pos]) => {
    return {
      ...prev,
      [key] : prev[key] ? prev[key].concat(pos) : [pos],
    };
  }).startWith({});

  const notesAndLoop$ = Rx.Observable.combineLatest(notes$, loop$);

  const stateForLoop$ = notesAndLoop$.withLatestFrom(
    intervalAndTimestamp$,
    ([notes], [interval, startTime]) => ({
      notes, interval, startTime,
    })
  );

  // stateForLoop$.subscribe(s => console.log(s.notes.length));

  return stateForLoop$;
};

export default cyroModel;
