import Cycle from '@cycle/core';
import { makeDOMDriver } from '@cycle/dom';
import intents from './intents';
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

const main = function ({ DOM }) {
  const actions = intents(DOM);
  const state$  = model(actions);

  return {
    DOM : views(state$),
  };
};

const drivers = {
  DOM : makeDOMDriver('#app'),
};

Cycle.run(main, drivers);
