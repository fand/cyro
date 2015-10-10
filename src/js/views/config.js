/** @jsx hJSX */

import { hJSX }  from '@cycle/dom';
import bpmSlider from './bpmSlider';

const config = (state) => {
  return (
    <div className="Config">
      {bpmSlider(state.slider)}
    </div>
  );
};

export default config;
