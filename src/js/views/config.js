/** @jsx hJSX */

import { hJSX }  from '@cycle/dom';
import bpmSlider from './bpmSlider';
import loopCount from './loopCount';

/**
 * @param {boolean} isVisible
 * @param {number}  bpm
 * @param {number}  loops
 */
const config = ({ isVisible, bpm, loops }) => {
  const suffix = isVisible ? '' : '--hidden';

  return (
    <div className={`Config${suffix}`}>
      {bpmSlider(bpm)}
      {loopCount(loops)}
    </div>
  );
};

export default config;
