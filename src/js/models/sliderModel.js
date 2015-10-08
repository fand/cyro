import { Rx } from '@cycle/core';

const sliderModel = (actions) => {
  const bpm$       = actions.changeBPM$.startWith(144);
  const isVisible$ = actions.toggleSlider$.startWith(true).scan(p => !p);

  return Rx.Observable.combineLatest(
    bpm$,
    isVisible$,
    (bpm, isVisible) => ({ bpm, isVisible })
  );
};

export default sliderModel;
