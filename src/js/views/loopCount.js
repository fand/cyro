/** @jsx hJSX */

import { hJSX } from '@cycle/dom';

/**
 * @param {number} loops
 */
export default function renderLoopCount (loops) {

  return (
    <div className="LoopCount">
      <span
        className="LoopCount__Label">
        Loop length
      </span>
      <span className="LoopCount__Decrement">&lt;</span>
      <span className="LoopCount__Count">
        {loops}
      </span>
      <span className="LoopCount__Increment">&gt;</span>
    </div>
  );
}
