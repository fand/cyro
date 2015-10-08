import { Rx } from '@cycle/core';
import cyroModel from './cyroModel';
import sliderModel from './sliderModel';

export default function models (actions) {
  const cyroState$   = cyroModel(actions);
  const sliderState$ = sliderModel(actions);

  return Rx.Observable.combineLatest(
    sliderState$,
    cyroState$,
    (slider, cyro) => {
      return { slider, cyro };
    }
  );
}
