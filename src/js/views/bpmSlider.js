/** @jsx hJSX */

import { hJSX } from '@cycle/dom';

/**
 * @param {number} bpm
 */
export default function renderBPMSlider (bpm) {
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
}
