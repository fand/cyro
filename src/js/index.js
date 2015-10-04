/** @jsx hJSX */

import Cycle from '@cycle/core';
import { makeDOMDriver, hJSX } from '@cycle/dom';

const renderBPMSlider = (bpm) => {
  return (
    <div>
      <input
        id="bpm"
        type="range"
        min="100"
        max="250"
        value={bpm} />
      <p>BPM : {bpm}</p>
    </div>
  );
};

const view = (state$) => {
  return state$.map(({ bpm }) =>
    renderBPMSlider(bpm)
  );
};

const main = function ({ DOM }) {
  const changeBPM$ = DOM.select('#bpm').events('input').map(ev => ev.target.value).startWith(144);
  const state$ = Cycle.Rx.Observable.combineLatest(
    changeBPM$.startWith(144),
    (bpm) => {
      return {
        bpm,
      };
    }
  );

  return {
    DOM : view(state$),
  };
};

const drivers = {
  DOM : makeDOMDriver('#app'),
};

Cycle.run(main, drivers);
