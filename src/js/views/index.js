/** @jsx hJSX */

import { hJSX } from '@cycle/dom';
import bpmSlider from './bpmSlider';
import speaker from './speaker';
import cyro from './cyro';

export default function views (state$) {
  return state$.map((state) =>
    <div>
      {cyro(state.cyro)}
      {speaker(state.cyro)}
      {bpmSlider(state.bpm)}
    </div>
  );
}
