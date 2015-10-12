import { Rx } from '@cycle/core';
import timerModel from './timerModel';
import notesModel from './notesModel';

const cyroModel = (actions) => {

  const { interval$, timestamp$ } = timerModel(actions);
  const { notes$ } = notesModel(actions);

  const stateForLoop$ = Rx.Observable.combineLatest(
    timestamp$,
    interval$,
    notes$,
    actions.setLoopCount$,
    (startTime, interval, notes, loops) => ({
      notes, interval, startTime, loops,
    })
  );

  return stateForLoop$;
};

export default cyroModel;
