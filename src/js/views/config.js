/** @jsx hJSX */

import { hJSX }  from '@cycle/dom';
import bpmSlider from './bpmSlider';

/**
 * @param {boolean} isVisible
 * @param {number}  bpm
 */
const config = ({ isVisible, bpm }) => {
  const suffix = isVisible ? '' : '--hidden';

  return (
    <div className={`Config${suffix}`}>
      {bpmSlider(bpm)}
    </div>
  );
};

export default config;
