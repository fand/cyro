import { Rx } from '@cycle/core';
import cyroModel from './cyroModel';

export default function models (actions) {

  const cyroState$ = cyroModel(actions);

  return Rx.Observable.combineLatest(
    actions.changeBPM$.startWith(144),
    cyroState$,
    (bpm, cyro) => {
      return { bpm, cyro };
    }
  );
}
