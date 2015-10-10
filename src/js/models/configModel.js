import { Rx } from '@cycle/core';

const configModel = (actions) => {
  const bpm$       = actions.changeBPM$.startWith(144);
  const isVisible$ = actions.toggleSlider$.startWith(true).scan(p => !p);
  const loops$     = actions.setLoopCount$.startWith(1);

  return Rx.Observable.combineLatest(
    bpm$,
    isVisible$,
    loops$,
    (bpm, isVisible, loops) => ({ bpm, isVisible, loops })
  );
};

export default configModel;
