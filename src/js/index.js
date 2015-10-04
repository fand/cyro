import Cycle from '@cycle/core';
import CycleDOM from '@cycle/dom';

const main = function () {
  return {
    DOM: Cycle.Rx.Observable.interval(1000)
      .map(i => CycleDOM.h(
        'h1', `${i} seconds elapsed`,
      )),
  };
};

const drivers = {
  DOM : CycleDOM.makeDOMDriver('#app'),
};

Cycle.run(main, drivers);
