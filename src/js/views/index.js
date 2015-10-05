/** @jsx hJSX */

import { hJSX } from '@cycle/dom';
import bpmSlider from './bpmSlider';
import cyro from './cyro';

export default function views (state$) {
  return state$.map((state) =>
    <div>
      {cyro(state.css)}
      {bpmSlider(state.bpm)}
    </div>
  );
}
