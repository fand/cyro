import { Rx } from '@cycle/core';
import { EventEmitter } from 'events';
import timerModel from './timerModel';
import notesModel from './notesModel';

const TICK_PER_BAR = 64;

const cyroModel = (actions) => {

  const { interval$, loop$, timestamp$ } = timerModel(actions);
  const { notes$ } = notesModel(actions);

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
