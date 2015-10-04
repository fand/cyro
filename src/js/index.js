import Cycle from '@cycle/core';
import { makeDOMDriver } from '@cycle/dom';
import views from './views';

const model = (actions) => {
  return Cycle.Rx.Observable.combineLatest(
    actions.changeBPM$.startWith(144),
    (bpm) => {
      return {
        bpm,
      };
    }
  );
};

const intent = (DOM) => ({
  changeBPM$ : DOM.select('#bpm').events('input').map(ev => ev.target.value).startWith(144),
});

const main = function ({ DOM }) {
  const actions = intent(DOM);
  const state$  = model(actions);

  return {
    DOM : views(state$),
  };
};

const drivers = {
  DOM : makeDOMDriver('#app'),
};

Cycle.run(main, drivers);
