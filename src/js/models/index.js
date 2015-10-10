import { Rx }      from '@cycle/core';
import cyroModel   from './cyroModel';
import configModel from './configModel';

export default function models (actions) {
  const cyroState$   = cyroModel(actions);
  const configState$ = configModel(actions);

  return Rx.Observable.combineLatest(
    sliderState$,
    configState$,
    (config, cyro) => {
      return { config, cyro };
    }
  );
}
