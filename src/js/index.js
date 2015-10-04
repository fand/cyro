import Cycle from '@cycle/core';
import { makeDOMDriver } from '@cycle/dom';
import intents from './intents';
import models from './models';
import views from './views';

const main = function ({ DOM }) {
  const actions = intents(DOM);
  const state$  = models(actions);

  state$.subscribe(s => console.log(s));

  return {
    DOM : views(state$),
  };
};

const drivers = {
  DOM : makeDOMDriver('#app'),
};

Cycle.run(main, drivers);
