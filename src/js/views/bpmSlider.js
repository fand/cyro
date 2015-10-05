/** @jsx hJSX */

import { hJSX } from '@cycle/dom';

/**
 * @param {number} bpm
 */
export default function renderBPMSlider (bpm) {
  return (
    <div className="BPMSlider">
      <input
        className="BPMSlider__Input"
        id="bpm"
        type="range"
        min="100"
        max="250"
        value={bpm} />
      <p
        className="BPMSlider__Label">
        BPM {bpm}
      </p>
    </div>
  );
}
