import { Rx } from '@cycle/core';

const configModel = (actions) => {
  const bpm$       = actions.changeBPM$.startWith(144);
  const isVisible$ = actions.toggleSlider$.startWith(true).scan(p => !p);

  const loops$ = actions.incrementLoops$.merge(actions.decrementLoops$).startWith(1)
    .scan((prev, next) => Math.min(Math.max(1, prev + next), 4));

  return Rx.Observable.combineLatest(
    bpm$,
    isVisible$,
    loops$,
    (bpm, isVisible, loops) => ({ bpm, isVisible, loops })
  );
};

export default configModel;
