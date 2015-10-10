/** @jsx hJSX */

import { hJSX }  from '@cycle/dom';
import bpmSlider from './bpmSlider';

const config = (state) => {
  const suffix = state.slider.isVisible ? '' : '--hidden';
  return (
    <div className={`Config${suffix}`}>
      {bpmSlider(state.slider)}
    </div>
  );
};

export default config;
