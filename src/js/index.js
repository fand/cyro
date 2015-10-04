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
    DOM : view(state$),
  };
};

const drivers = {
  DOM : makeDOMDriver('#app'),
};

Cycle.run(main, drivers);
