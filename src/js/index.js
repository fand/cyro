/** @jsx hJSX */

import Cycle from '@cycle/core';
import { makeDOMDriver, hJSX } from '@cycle/dom';

const main = function (drivers) {
  const changeBPM$ = drivers.DOM.select('#bpm').events('input').map(ev => ev.target.value).startWith(144);

  return {
    DOM: changeBPM$
      .map(bpm =>
        <div>
          <input
            id="bpm"
            type="range"
            min="100"
            max="250"
            value={bpm} />
          <p>BPM : {bpm}</p>
        </div>
      ),
  };
};

const drivers = {
  DOM : makeDOMDriver('#app'),
};

Cycle.run(main, drivers);
