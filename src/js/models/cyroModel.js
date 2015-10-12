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

  let notes = {};

  const notesEmitter = new EventEmitter();

  const note$ = actions.addNote$
    .withLatestFrom(intervalAndTimestamp$, (key, [interval, timestamp]) => {
      return [
        key,
        ((performance.now() - timestamp) / interval * 64) | 0,
      ];
    }).startWith([]);

  note$.subscribe(([key, pos]) => {
    notes = {
      ...notes,
      [key] : notes[key] ? notes[key].concat(pos) : [pos],
    };
    notesEmitter.emit('change', notes);
  });

  actions.resetNote$.subscribe((key) => {
    notes[key] = [];
    notesEmitter.emit('change', notes);
  });

  timestamp$.subscribe(() => notesEmitter.emit('change', notes));

  const notes$ = Rx.Observable.fromEvent(notesEmitter, 'change');

  const stateForLoop$ = Rx.Observable.combineLatest(
    timestamp$,
    interval$,
    notes$,
    actions.setLoopCount$,
    (startTime, interval, notes, loops) => ({
      notes, interval, startTime, loops
    })
  );

  return stateForLoop$;
};

export default cyroModel;
