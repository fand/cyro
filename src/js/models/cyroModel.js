import { Rx } from '@cycle/core';
import { EventEmitter } from 'events';

const TICK_PER_BAR = 64;

const bpmToInterval = bpm => (60000 / bpm) * 4;

const cyroModel = (actions) => {

  const interval$ = actions.changeBPM$.map(bpmToInterval).startWith(bpmToInterval(144));

  const loop$ = (() => {
    let currentInterval;
    let loopIndex = 0;
    let loopCount = 1;

    const eventEmitter = new EventEmitter();
    const looper = () => {
      eventEmitter.emit('loop', loopIndex++ % loopCount);
      setTimeout(looper, currentInterval);
    };
    looper();

    interval$.subscribe((interval) => {
      currentInterval = interval;
    });
    actions.setLoopCount$.subscribe(l => {
      loopCount = l;
      loopIndex = 0;
    });

    return Rx.Observable.fromEvent(eventEmitter, 'loop').startWith(1);
  })();

  // Set timestamp only on loop start
  const timestamp$ = loop$.filter(x => x === 0).map(::performance.now);

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
