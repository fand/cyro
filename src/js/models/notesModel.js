import { Rx } from '@cycle/core';
import { EventEmitter } from 'events';
import timerModel from './timerModel';

const TICK_PER_BAR = 64;

const notesModel = (actions) => {

  const { interval$, timestamp$ } = timerModel(actions);

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
        ((performance.now() - timestamp) / interval * TICK_PER_BAR) | 0,
      ];
    });

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

  const notes$ = Rx.Observable.fromEvent(notesEmitter, 'change').startWith(notes);

  return {
    notes$,
  };
};

export default notesModel;
