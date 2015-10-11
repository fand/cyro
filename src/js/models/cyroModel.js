import { Rx } from '@cycle/core';
import { EventEmitter } from 'events';
import timerModel from './timerModel';

const TICK_PER_BAR = 64;

const cyroModel = (actions) => {

  const { interval$, loop$, timestamp$ } = timerModel(actions);

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

  actions.resetNote$.subscribe(x => console.log('>>reset : ', x));

  const notesAndLoop$ = Rx.Observable.combineLatest(notes$, loop$);

  const stateForLoop$ = notesAndLoop$.withLatestFrom(
    intervalAndTimestamp$,
    actions.setLoopCount$,
    ([notes], [interval, startTime], loops) => ({
      notes, interval, startTime, loops
    })
  );

  // stateForLoop$.subscribe(s => console.log(s.notes.length));

  return stateForLoop$;
};

export default cyroModel;
